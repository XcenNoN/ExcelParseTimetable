const { ipcRenderer } = require('electron')

document.addEventListener("DOMContentLoaded", () => {
    console.log("load")
    ipcRenderer.send('init');
})

ipcRenderer.on('get-table', (event, data) => {
    console.log(data)
})

function Calendar(year, month){
    this.year = year
    this.month = month
    this.data = (year, month) =>{
        res = [];
        let counDays = 32 - new Date(year, month, 32).getDate();
        let firstDay = new Date(`${year}-${++month>9?month:`0${month}`}-01`);
        firstDay = firstDay.getDay();
        firstDay = firstDay<1?6:--firstDay;
        let week = [];
        for (let i = 0; i < firstDay; i++)
            week.push(null)

        for(let i = 1; i <= counDays; i++){
            if (week.length % 7 === 0){
                res.push(week);
                week = [];
            }
            week.push(i);
        }
        if (week.length === 0 ){
            for(let i = 0, len = 6-week.length; i <= len; i++)
                week.push(null);
            res.push(week);  
        }
    }
}

//let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];