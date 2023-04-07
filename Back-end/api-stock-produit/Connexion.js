const { Client } = require('pg')
function connected()
{
    let client = new Client(
        {
            user : 'postgres',
            host : 'localhost',
            database : "stockproduit",
            port : 5432,
            password : 'admin'
        })
    return client    
}
module.exports.connected=connected