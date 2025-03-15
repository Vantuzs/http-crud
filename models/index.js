const { Client } = require('pg');
const config = require('../configs/postgres.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env] // dbConfig = config.development

const client = new Client(dbConfig);

client.connect();


process.on('beforeExit', ()=>{
    client.end();
});

module.exports = {
    client
}

// beforeExit