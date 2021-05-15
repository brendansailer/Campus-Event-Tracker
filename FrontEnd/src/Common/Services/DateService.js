// Turns a javascript Date() into a string as required by Oracle
export const getDateString = (d) => {
    const month = d.toLocaleString('default', { month: 'short' });
    let day = "" + d.getDate();
    if(day.length === 1) {
        day = "0" + day;
    }
    const year = "" + d.getFullYear();
    const hour = "" + d.getHours();
    let minute = "" + d.getMinutes();
    if(minute.length === 1) {
        minute = "0" + minute;
    }
    return day + "-" + month + "-" + year + " " + hour + ":" + minute + ":00";
} 

export const getPrettyDateString = (d) => {
    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let month = d.toLocaleString('default', { month: 'short' });
    month = month.toUpperCase();
    const day = d.getDate();
    let hour = + d.getHours();
    let period = "AM";
    if(hour > 12) {
        period = "PM";
        hour = hour % 12;
    }
    let minute = "" + d.getMinutes();
    if(minute.length === 1) {
        minute = "0" + minute;
    }
    return hour + ":" + minute  + " " + period + " " + dayOfWeek[d.getDay()] + " "+ month + " " + day;
} 