const oracledb = require('oracledb')
// require('dotenv').configDotenv({ path: '../.env' }) // Quando for executado de dentro de uma pasta para um nível acima do raiz
require('dotenv').config() //Quando for executado a partir de nível raiz

module.exports = class Database {
    
    constructor(){
        oracledb.initOracleClient({ libDir: 'C:\\oracle2\\instantclient_21_14' })

        this.connection = null
        this.user = process.env.USER_ADW
        this.password = process.env.PASS_ADW
        this.connectionString = process.env.CONNECTIONSTRING 
               
        // console.log('#######',process.env.USER_ADW)
        //this.connect()
    }

    async getData(sql){           
        try {
            this.connection =  await oracledb.getConnection({
                user: this.user,
                password: this.password,
                connectionString: this.connectionString
            })   
            
            console.log("Conexão estabelecida com sucesso!")
            
            this.data = await this.connection.execute(sql,);
    
            return this.data

        } catch (err) {
            console.log(`Erro ao Conectar no BD - ${err}`)
        } finally {
            if (this.connection){
                try {
                     await this.connection.close()
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}

// const sql = `select  
// nb_id, tx_os, dt_slawinend, tx_status, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
// from tb_ofsc_activities_rt
// where TX_EQ_DATACONCLUSAOLIMITE < to_char(sysdate,'dd/mm/yyyy')
// and tx_status = 'pending'
// and to_date(dt_activity,'dd/mm/yyyy') > to_date('01/01/24','dd/mm/yyyy')
// --and dt_activity is null
// and TX_EQ_TIPONOTA= 'CT'
// and rownum <= 1
// order by dt_activity asc`


// const database = new Database()

// database.getData(sql)
//     .then(function(resp){
//         console.log('Dados:',resp)    
//     })



// rows.then(function(resp){
//     console.log('Dados:',resp)
// })


// const rows = database.connect(sql)

// rows.then(function (resp){
//     console.log('Dados:',resp)
// })

// console.log('dados',rows)




