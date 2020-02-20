const xlsx = require('node-xlsx').default;
const workbook = xlsx.parse(`${__dirname}/test.xlsx`);

let excel = {
    path: ""
};


excel.test = function(){
    res = workbook
    for (let i = 0; i < res.lenght; i++)
        res[i].data.slice(8,44)
    return res;
}

excel.getData = path => {
    let wb;
    if (!path.canceled)
        wb = xlsx.parse(path.filePaths[0])

    for (let i = 0; i < wb.length; i++)
            wb[i].data = wb[i].data.slice(8,44)
    return wb
}

module.exports = excel;
