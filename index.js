const now = new Date();

const showDay = document.querySelector(".show-day");
const showDate = document.querySelector(".show-date");
const showMonthYear = document.querySelector(".show-month-year");
const calendarBody = document.querySelector(".calendar-body");

const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
const MONTH_LIST = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const currentDate = now.getDate();
const currentMonth = MONTH_LIST[now.getMonth()];
const currentDay = DAY_LIST[now.getDay()];
const currentYear = now.getFullYear();


function printCurrentDate() {
    showDay.textContent = currentDay;
    showDate.textContent = currentDate;
    showMonthYear.textContent = `${currentMonth} ${currentYear}`;
}

function printDay() {
    calendarBody.textContent = DAY_LIST[0]
    for (let i = 1; i < DAY_LIST.length; i++) {
        calendarBody.textContent += ` ${DAY_LIST[i]}`;
    }
}
// TODO: switch문으로 달력 출력하기~!~!

function printCalendarBody() {
    let dateNumber;

    switch (month) {
        case MONTH_LIST[0]: case MONTH_LIST[2]: case MONTH_LIST[4]:
        case MONTH_LIST[6]: case MONTH_LIST[7]: case MONTH_LIST[9]: case MONTH_LIST[11]:
            dateNumber = 31;
            break;
        case MONTH_LIST[3]: case MONTH_LIST[5]:
        case MONTH_LIST[8]: case MONTH_LIST[10]:
            dateNumber = 30;
            break;
        case MONTH_LIST[1]:
            dateNumber = 28;
    }

    for (let i = 1; i <= dateNumber; i++) {
        )
    }
}






function init() {
    printCurrentDate();
    printDay();
}

init();