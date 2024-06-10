require('dotenv').configDotenv({ path: '../.env' })
const nodemailer = require('nodemailer')
const Excel = require('./gera-relatorio')

module.exports = class Email {
    constructor(){        
        this.senhaRemetente = process.env.PASS_EMAIL_REMETENTE
        this.emailRemetente = process.env.EMAIL_REMETENTE
        this.emailDestinatario = process.env.EMAIL_DESTINO
    }

    async Enviar(nomeRemetente, 
                subjectEmail,
                filename,
                buffer,
                emailRemetente = this.emailRemetente, 
                emailDestinatario = this.emailDestinatario,
                senhaRemetente = this.senhaRemetente){


        // console.log('1')

        const transport = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, //true para 465, false para outras
            auth: {
                user: emailRemetente,
                pass: senhaRemetente,
            }
        })

        // console.log('2')

        await transport.sendMail({
            from: nomeRemetente + '<' + emailRemetente + '>',
            to: emailDestinatario,
            subject: subjectEmail,
            html: `<p>Script automático de envio de e-mail. Extração disponível <strong>em anexo</strong>.</p>`,
            // html: textoEmail,
            //text: numeroLinhasCorpo,
            attachments: [
                {
                    filename,
                    content: buffer,
                    contentType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            ],
        })
        .then((response) => {
            console.log(`Email ${subjectEmail} enviado com sucesso!`, new Date().toLocaleString());
        })
        .catch((err) => console.log(`Error ao enviar o email ${subjectEmail}: ${err}`))

        // console.log('3')
    }
    
    
}



// const email = new Email()
// email.Enviar('1','2','3','4','5')