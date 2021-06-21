const now = new Date();

const showDay = document.querySelector(".show-day");
const showDate = document.querySelector(".show-date");
const showMonthYear = document.querySelector(".show-month-year");

const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
const MONTH_LIST = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const currentDate = now.getDate();
const currentMonth = MONTH_LIST[now.getMonth()];
const currentDay = DAY_LIST[now.getDay()];
const currentYear = now.getFullYear();


console.dir(now.toDateString())
showDay.textContent = currentDay;
showDate.textContent = currentDate;
showMonthYear.textContent = `${currentMonth} ${currentYear}`;