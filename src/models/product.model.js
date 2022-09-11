const path = require("path");
const {readFileSync} = require('fs');

const model = {
    file: path.join(__dirname, "../database/products.json"),
    findall: () => JSON.parse(readFileSync(model.file)),
    find: id => model.findall().find( prod => prod.id == id ),
}

module.exports = model;
