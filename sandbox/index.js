const fs = require('fs');
const path = require('path');
const { client } = require('../models');

//__dirname - константа ноды, которая созраянет абсолютный атдрес текущей папки
// __filename - константа ноды, которая сохраняет аьсолютный адрес текущего файла

const currentFileName = path.basename(__filename); // index.js

const db = {

};

const filleNames = fs.readdirSync(__dirname)
const filtredArray = filleNames.filter((a)=> /.js/.test(a) && a !== currentFileName);

filtredArray.forEach(currentFile => {
    const absPathToFile = path.resolve(__dirname,currentFile);
    
    const Model = require(absPathToFile);
    Model._client = client;
    db[Model._tableName] = Model;
})