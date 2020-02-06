const xlsx = require('node-xlsx').default;
const workbook = xlsx.parse(`${__dirname}/test.xlsx`);

let excel = {};

excel.test = function(){
    return workbook;
}

excel.getData = path => {
    let wb = xlsx.parse(path);
    return wb
}

module.exports = excel;
