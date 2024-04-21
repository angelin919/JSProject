
//Форматирование даты

export function dateFormater(date){
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let dateNow = day+'.' + month+'.' + year+' ' + '<span>' + hours+':' +minutes + '</span>'
    return dateNow
}
