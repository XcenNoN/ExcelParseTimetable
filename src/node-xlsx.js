const xlsx = require('node-xlsx').default;
const workbook = xlsx.parse(`${__dirname}/test.xlsx`);

let excel = {};

excel.test = function(){
    return workbook;
}

excel.getData = path => {
    let wb = [];
    if (!path.canceled){
        if (path.filePaths.lenght > 0)
            for (let i = 0; i < path.filePaths.lenght; i++)
                wb.push(xlsx.parse(path.filePaths[i]))
        else 
            wb.push(xlsx.parse(path.filePaths[0]))
    }
    return wb
}

module.exports = excel;
