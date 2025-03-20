const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const config = require('../configs/postgres.json');

const currentFileName = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();

const db = {
    client
};

fs.readdirSync(__dirname)
    .filter(
        (currentFile) =>
            /.js$/.test(currentFile) && currentFile !== currentFileName
    )
    .forEach((currentFile) => {
        const absPathToFile = path.resolve(__dirname, currentFile);

        const Model = require(absPathToFile);
        Model._client = client;
        db[Model.name] = Model;
    });

process.on('beforeExit', () => {
    client.end();
});

module.exports = db;