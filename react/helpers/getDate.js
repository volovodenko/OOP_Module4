export const getDate = (date) => {
    const d = new Date(date);
    const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    return `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()} | ${d.getHours()}:${minutes}`;
};