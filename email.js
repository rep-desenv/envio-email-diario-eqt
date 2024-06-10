import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
import exceljs from 'exceljs'

const enviaEmail = async (data, nomeRemetente, emailRemetente, senhaRemetente, emailDestinatario, subjectEmail ) => {
       
    const filename = 'Falha_Rotina_Sobra.xlsx';
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet('Falha Rotina de Sobra');

    // emailDestinatario += ',' + 'stephanie.m.silva@accenture.com' + ',' + 'diego.p.pereira@accenture.com'
    emailDestinatario += ',' + 'diego.p.pereira@accenture.com'
    
    // worksheet.columns = [
    //     {header: 'ID', key: 'nb_id'},
    //     {header: 'OS', key: 'tx_os'},
    //     {header: 'DATA LIMITE', key: 'dt_slawinend'},
    //     {header: 'STATUS', key: 'tx_status'},
    //     {header: 'RECURSO', key: 'tx_resourceexternalid'},
    //     {header: 'TIPO NOTA', key: 'TX_EQ_TIPONOTA'},
    //     {header: 'DATA ROTA', key: 'dt_activity'},      
    // ];
    
    //nb_id, tx_os, dt_slawinend, tx_status, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
    //tx_os, nb_id, dt_activity, tx_state, tx_resourceexternalid, tx_status 
    worksheet.columns = [
        {header: 'OS', key: 'tx_os'},
        {header: 'ID', key: 'nb_id'},
        {header: 'DATA ROTA', key:'dt_activity'},
        {header: 'UF', key: 'tx_state'},
        {header: 'RECURSO', key: 'tx_resourceexternalid'},
        {header: 'STATUS', key: 'tx_status'},        
    ];

    // let data = [
    //     {
    //         firstName: 'John',
    //         lastName: 'Bailey',
    //         purchasePrice: 1000,
    //         paymentsMade: 100,
    //     },
    //     {
    //         firstName: 'Leonard',
    //         lastName: 'Clark',
    //         purchasePrice: 1000,
    //         paymentsMade: 150,
    //     },
    // ];


    data.forEach((e) => {
        worksheet.addRow(e);
    });

    const buffer = await workbook.xlsx.writeBuffer();    
    
    const transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, //true para 465, false para outras
        auth: {
            user: emailRemetente,
            pass: senhaRemetente,
        }
    })

    transport.sendMail({
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
        console.log('Email enviado com sucesso!', new Date().toLocaleString());
    })
    .catch((err) => console.log(`Error ao enviar o email: ${err}`))

}

export default enviaEmail

// await enviaEmail('Script - Rastreamento Duplicação', process.env.EMAIL_REMETENTE, process.env.PASS_EMAIL_REMETENTE, process.env.EMAIL_DESTINO, `Rastreamento Duplicação Indevida`)
//atualizando