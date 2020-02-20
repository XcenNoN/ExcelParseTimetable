const { ipcRenderer} = require('electron')

document.getElementById('btnSelect').addEventListener('click', () => {
    ipcRenderer.send('init');
})
ipcRenderer.on('get-table', (event, data) => {
    processingExcel(data)
})
// test
const daysWeek = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
const reg = /[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{2}[г]{1}[.]{1}/
function processingExcel (data){
    
    let res = [];
    for (let i = 0, len = data.length; i < len; i++)
        res.push(processingSheet(data[i]))
    return res
}

function processingSheet (sheet){
    let res = {}, elm = [], curDay = 0;
    res.name = sheet.name
    res.data = []
    for(let i = 0, len = sheet.data.length; i < len; i++){
        if (typeof (sheet.data[i][0]) === "string"){
            if (sheet.data[i][0].trim() === daysWeek[curDay] || daysWeek.indexOf(sheet.data[i][0].trim()) === -1){
                if (elm.length > 0){
                    res.data.push(elm)
                    elm = []
                }
                curDay++;
            }  
        }
            elm.push(sheet.data[i]) 
    }
    formattingDays(res.data)
    return res
}

function formattingDays(data){
    let res = [], elm = [], str = '', classroom = '', frag, subj = {};
    console.log(data)
    for(let i = 0, len = data.length; i < len; i++){
        elm = []
        for(let j = 0, len = data[i].length; j < len; j++){
            if(data[i][j][2]){
                str = data[i][j][2].split("\n")
                classroom = data[i][j][3].split("\n")
                for(let k = 0, len = str.length; k < len; k++){
                    subj = {}
                    frag = str[k].slice(0,reg.exec(str[k]).index)
                    if (frag.indexOf(';') === -1)
                        subj.name = str[k].slice(0,str[k].indexOf(':'))
                    else
                        subj.name = str[k].slice(0,str[k].indexOf(';'))
                    subj.number = data[i][j][1];
                    subj.date = "временно пусто"
                    subj.classroom = classroom[k*2]?classroom[k*2]:classroom[0]
                    elm.push(subj)  
                }
            }   
        }
        res.push(elm)
    }
    console.log(res)
    // temp1[0][4][2].indexOf("\n")
    return res
}

function Calendar(year, month){
    this.year = year
    this.month = month
    this.data = () => {
        res = [];
        // Заполнение нулами
        for(let i = 0; i < 6; i++){
            let temp = [];
            for(let j = 0; j < 7; j++)
                temp.push(null);
            res.push(temp);
        }
        // количество дней в этом месяце
        let counDays = 32 - new Date(year, month - 1, 32).getDate();
        // количество дней в предыдущем месяце
        let counDaysPre;
        if ( month - 2 >= 0)
            counDaysPre = 32 - new Date(year, month - 2, 32).getDate();
        else 
            counDaysPre = 32 - new Date(year-1, 11, 32).getDate();
        // день недели первого дня
        let firstDay = new Date(`${year}-${month>9?month:`0${month}`}-01`);
        firstDay = firstDay.getDay() - 1;
        if (firstDay < 0)
            firstDay = 6
        for(let i = firstDay-1; i >= 0; i--)
            res[0][i] = counDaysPre--;
        let day = 1, endDay = 1;
        for(let i = 0, len = res.length; i < len; i++)
            for (let j = 0, len = res[i].length; j < len; j++)
                if (res[i][j] == null && day < counDays + 1)
                    res[i][j] = day++
                else if ( i > 0)
                    res[i][j] = endDay++;
        return res;
    }
}

//let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];