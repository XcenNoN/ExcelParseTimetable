const xlsx = require('node-xlsx').default;
const workbook = xlsx.parse(`${__dirname}/test.xlsx`);

let excel = {};
excel.test = function(){
    console.log(workbook[0].data[0])
}

module.exports = excel;
