export function FormatedPrice(n) {
    n = n.toString();
    return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

export function FormatedDate(unix, dispay_time = true) {
    var date = new Date(Number(unix) * 1000);
    var formated_date = date.getDate()+'.'+('0' + (date.getMonth() + 1)).slice(-2)+'.'+date.getFullYear();

    if(dispay_time) {
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formated_time = hours + ':' + minutes.substr(-2);

        formated_date += ' в '+formated_time;
    }
    return formated_date;
}

export function getWeekDay(num) {
    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    return days[num];
}

export function getMonthLabel(num, type = 1) {
    var months = [];
    if(type === 1) {
        months = ["Январь", "Фераль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    } else if(type === 2) {
        months = ["января", "фераля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    }
    
    return months[num];
}

export function CountPages(count, per_page) {

    return Math.ceil(count / per_page);
}

export function unique(arr) {
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return result;
}

export function GenerateArt() {
    let now = new Date();
    let result = 'ART_'+now.getFullYear()+(now.getMonth() + 1)+now.getDate()+'_'+now.getHours()+now.getMinutes()+now.getSeconds()+'_';
	let possible = "0123456789";

    for (var i = 0; i < 5; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
} 


export function trim(str, charlist) {
    charlist = !charlist ? ' \\s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}

export function TimestampToDate(date, sep = "") {
    var d = date;
    if(typeof date === "number") {
        d = new Date();
        d.setTime(date*1000);
    }

    return d.getFullYear() +sep+ ('0' + (d.getMonth() + 1)).slice(-2) +sep+ ('0' + d.getDate()).slice(-2);
}

export function persentColor(value, colors) {
    var result = '';

    colors.forEach(elem => {
        if(elem.range[0] <= value && elem.range[1] > value) {
            result = elem.color;
        }
    });

    return result;
}

export function StatusIcon(status) { 
    var result = {};

    switch(Number(status)) {
        case 0:
            result = {className: 'not-com', icon: ''}
            break;
        case 1:
            result = {className: 'ok', icon: 'icon_check'}
            break;
        case 2:
            result = {className: 'error', icon: ''}
            break;
        case 5:
            result = {className: 'deleted', icon: 'icon_busket'}
            break;
    }

    return result;
}

export function getDiagramMaxValue(data, types, status) {
    var result = 0;

    if(types.length === 1) {
        status = "p";
    }

    data.forEach(elem => {
        types.forEach(type => {
            if(result < Number(elem[type+"_"+status])) {
                result = Number(elem[type+"_"+status]);
            }
        });
    });

    // Округление

    var nullsCount = String(result).length - 2;
    var divisor = Math.pow(10,nullsCount);
 
    return Math.ceil(result / divisor) * divisor;
}

export function buildGETString(action, params) {
    var result = global.queryAddress+"?action="+action;

    for (const [key, value] of Object.entries(params)) {
        result += "&"+key+"="+value;
    }

    return result;
}