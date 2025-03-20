const fs = require('fs');
const path = require('path');

// __dirname - константа ноди, яка зберігає абсолютну адресу поточної папки
// __filename - контанта ноди, яка зберігає абсолютну адресу поточного файлу

const currentFileName = path.basename(__filename); // index.js

const db = {};

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