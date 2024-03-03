const {Pool}=require('pg')
const { POSTGRES_USER,
    POSTGRES_HOST, 
    POSTGRES_DB,
    POSTGRES_ROOT_PASSWORD,
    POSTGRES_LOCAL_PORT }=require('../constants')

const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_ROOT_PASSWORD,
    port:POSTGRES_LOCAL_PORT,
})

module.exports={
    query:(text,params)=>pool.query(text,params),
}