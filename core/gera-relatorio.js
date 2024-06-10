const exceljs = require('exceljs')
const Database = require('./database')
const Email = require('./email')

module.exports = class GeraRelatorio extends Database {
    constructor(filename, wsheetName, nomeRemetente, subjectMail, header, sql = 'select sysdate from dual'){
        super()
        this.filename = filename
        this.wsheetName = wsheetName
        this.nomeRemetente = nomeRemetente
        this.subjectMail = subjectMail
        this.sql = sql   
        this.buffer = null  
        this.header = header   

        this.gerarExtracao()
    }

    async gerarExtracao(){  
        const filename = `${this.filename}.xlsx`;
        let workbook = new exceljs.Workbook();
        let worksheet = workbook.addWorksheet(this.wsheetName);  
        const header = this.header 
        const nomeRemetente = this.nomeRemetente 
        const subjectMail = this.subjectMail

        const rows = this.getData(this.sql)

        rows.then( async function(resp){ 
            
            // console.log('>>>>>>>>>>>>',header)

            // var header = "["
            // resp.metaData.forEach(resp =>{ 
            //     header += `{header: '${resp.name}', key: '${resp.name}'},` 
            //     // console.log(resp.name)
            // }) 
            // header += "]"

            worksheet.columns = header

            const data = resp.rows   
            
            data.forEach((e) => {                
                worksheet.addRow(e);
            });

            const buffer = await workbook.xlsx.writeBuffer()
            
            const objEmail = new Email()
            
            objEmail.Enviar(nomeRemetente, subjectMail, filename, buffer)

        }).catch(function(erro){
            console.log(`Erro ao Gerar Excel!`, erro)
        })

    }
}

// console.log(
//     obj.gerarExtracao()
//         .then(function(resp){
//         console.log('>>>',resp)
//     })
// )