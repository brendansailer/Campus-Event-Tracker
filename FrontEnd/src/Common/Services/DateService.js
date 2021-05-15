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