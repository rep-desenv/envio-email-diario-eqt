const GeraRelatorio = require('../core/gera-relatorio')

const run = () => {

    const sql =  `select  
        nb_id, tx_os, dt_slawinend, tx_status, tx_resourceexternalid,TX_EQ_TIPONOTA, dt_activity
        from tb_ofsc_activities_rt
        where TX_EQ_DATACONCLUSAOLIMITE < to_char(sysdate,'dd/mm/yyyy')
        and tx_status = 'pending'
        and to_date(dt_activity,'dd/mm/yyyy') > to_date('01/01/24','dd/mm/yyyy')
        --and dt_activity is null
        and TX_EQ_TIPONOTA= 'CT'
        order by dt_activity asc`

    const header = [
        {header: 'ID', key: 'nb_id'},
        {header: 'OS', key: 'tx_os'},
        {header: 'DATA LIMITE', key: 'dt_slawinend'},
        {header: 'STATUS', key: 'tx_status'},
        {header: 'RECURSO', key: 'tx_resourceexternalid'},
        {header: 'TIPO NOTA', key: 'TX_EQ_TIPONOTA'},
        {header: 'DATA ROTA', key: 'dt_activity'},]

    new GeraRelatorio(
        'Falha_Rotina_Sobra',
        'Falha Rotina de Sobra', 
        'Script - Falha Rotina de Sobra',
        'Falha Rotina de Sobra', 
        header, 
        sql)
}

run()