const GeraRelatorio = require('../core/gera-relatorio')

const run = () => {

    const sql =  `select 
        tx_os, nb_id, dt_activity, tx_state, tx_resourceexternalid, tx_status 
        from tb_ofsc_activities_rt
        where tx_status  in ('pending','started','en route')
        and  dt_activity < to_char(to_date(sysdate,'dd/mm/yyyy'))
        and  dt_activity > to_char(to_date(sysdate-2,'dd/mm/yyyy'))`
    
    const header = [
        {header: 'OS', key: 'tx_os'},
        {header: 'ID', key: 'nb_id'},
        {header: 'DATA ROTA', key:'dt_activity'},
        {header: 'UF', key: 'tx_state'},
        {header: 'RECURSO', key: 'tx_resourceexternalid'},
        {header: 'STATUS', key: 'tx_status'},        
        ]

    new GeraRelatorio(
        'Notas_Limbo',
        'Notas no Limbo', 
        'Script - Notas no Limbo',
        'Notas no Limbo', 
        header, 
        sql)
}

run()