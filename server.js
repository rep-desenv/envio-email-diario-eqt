// import oracledb from 'oracledb'
// import dotenv from 'dotenv'
// dotenv.config();
// import ExcelJS from 'exceljs'
// import email from './email.js'

// oracledb.initOracleClient({ libDir: 'C:\\oracle2\\instantclient_21_14' })

// const run = async () => {

//     let connection

//     try {
//         connection = await oracledb.getConnection({
//             user: process.env.USER_ADW,
//             password: process.env.PASS_ADW,
//             connectionString: process.env.CONNECTIONSTRING
//         })   
        
//         console.log("Conexão realizada com sucesso!")

//         // const data = await connection.execute(
//         //     `select  
//         //     nb_id, tx_os, dt_slawinend, tx_status, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
//         //     from tb_ofsc_activities_rt
//         //     where TX_EQ_DATACONCLUSAOLIMITE < to_char(sysdate,'dd/mm/yyyy')
//         //     and tx_status ='pending'
//         //     and dt_activity >'01/01/24 00:00:00'
//         //     and dt_activity is null
//         //     and TX_EQ_TIPONOTA='CT'`,
//         // );

//         // const data = await connection.execute(
//         //     `select  
//         //     nb_id, tx_os, dt_slawinend, tx_status, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
//         //     from tb_ofsc_activities_rt
//         //     where tx_status ='pending'
//         //     and rownum<=1000`,
//         // );

//         // const data = await connection.execute(
//         //     `select  
//         //     nb_id, tx_os, dt_slawinend, tx_status, tx_state, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
//         //     from tb_ofsc_activities_rt
//         //     where TX_EQ_DATACONCLUSAOLIMITE < to_char(sysdate,'dd/mm/yyyy')
//         //     and tx_status = 'pending'
//         //     and to_date(dt_activity,'dd/mm/yyyy') > to_date('01/01/24','dd/mm/yyyy')
//         //     --and dt_activity is null
//         //     and TX_EQ_TIPONOTA= 'CT'
//         //     order by dt_activity asc`,
//         // );

//         const data = await connection.execute(
//             `select 
//             tx_os, nb_id, dt_activity, tx_state, tx_resourceexternalid, tx_status 
//             from tb_ofsc_activities_rt
//             where tx_status  in ('pending','started','en route')
//             and  dt_activity < to_char(to_date(sysdate,'dd/mm/yyyy'))
//             and  dt_activity > to_char(to_date(sysdate-2,'dd/mm/yyyy'),'dd/mm/yyyy')`,
//         );


//         //console.log(data.rows)
        
//         await email(data.rows, 'Script - Falha Rotina de Sobra', process.env.EMAIL_REMETENTE, process.env.PASS_EMAIL_REMETENTE, process.env.EMAIL_DESTINO, `Falha Rotina de Sobra`)

//     } catch (err) {
//         console.log(`Erro ao Conectar no BD - ${err}`)
//     } finally {
//         if (connection){
//             try {
//                 await connection.close()
//             } catch (err) {
//                 console.error(err)
//             }
//         }
//     }

// }

// run()


import notasLimbo from './notas-limbo/notas-limbo.js'
import falhaRotinaSobra from './falha-rotina-sobra/falha-rotina-sobra.js'

await falhaRotinaSobra.run()
await notasLimbo.run()
