const now = new Date();

const showDay = document.querySelector(".show-day");
const showDate = document.querySelector(".show-date");
const showMonthYear = document.querySelector(".show-month-year");
const calendarBody = document.querySelector("tbody");
const calendarBody_Rows = calendarBody.children;
const calendarBtns = document.querySelectorAll("button");

const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
const MONTH_LIST = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

let currentDate = now.getDate();
let currentMonth = now.getMonth();
let currentDay = DAY_LIST[now.getDay()];
let currentYear = now.getFullYear();


function printSeperateDate(day, date, month, year) {
    showDay.textContent = day;
    showDate.textContent = date;
    showMonthYear.textContent = `${month} ${year}`;
}

function printCalendarBody(currentYear, currentMonth) {
    let dateNumber = 2;
    let firstDay = new Date(currentYear, currentMonth).getDay();
    for(let row = 0; row < calendarBody_Rows.length; row++){
        for (let col = 0; col < 7; col++) {
            calendarBody_Rows[0].children[firstDay].textContent = 1;
            if(row === 0 && col > firstDay) {
                calendarBody_Rows[row].children[col].textContent = dateNumber;
                dateNumber++;
            } else if( row > 0) {
                calendarBody_Rows[row].children[col].textContent = dateNumber;
                dateNumber++;
                if(dateNumber > calculateDateNumbers(currentMonth)) {
                    break;
                }
            }
        }
    }
}

function highlightToday (currentDate) {
    for(let row = 0; row < calendarBody_Rows.length; row++){
        for (let col = 0; col < 7; col++) {
            if(calendarBody_Rows[row].children[col].textContent === String(currentDate)){
                calendarBody_Rows[row].children[col].classList.add("today");
            }
        }
    }
}

function calculateDateNumbers(month) {
    switch (month) {
        case 0: case 2: case 4:
        case 6: case 7: case 9: case 1:
        dateNumber = 31;
        break;
        case 3: case 5:
        case 8: case 1:
        dateNumber = 30;
        break;
        case 1:
        dateNumber = 28;
        break;
    }
    return dateNumber;
}

function printNextCalenderBody() {
    const nextDates = new Date(currentYear, currentMonth += 1)
    const nextYear = nextDates.getFullYear();
    const nextFirstDay = DAY_LIST[nextDates.getDay()];
    const nextMonth = MONTH_LIST[nextDates.getMonth()];
    printCalendarBody(nextYear, nextDates.getMonth());
    printSeperateDate(nextFirstDay, nextDates.getDate(), nextMonth, nextYear);
}

function removecurrentCalenderBody() {
    for(let i = 0; i < calendarBody_Rows.length; i ++) {
        for(let j = 0; j < 7; j++) {
            calendarBody_Rows[i].children[j].textContent = '';
            calendarBody_Rows[i].children[j].classList.remove("today");
        }
    }
}

function printPreviousCalendarBody() {
    const previousDates = new Date(currentYear, currentMonth -= 1)
    const previousYear = previousDates.getFullYear();
    const previousFirstDay = DAY_LIST[previousDates.getDay()];
    const previousMonth = MONTH_LIST[previousDates.getMonth()];
    printCalendarBody(previousYear, previousDates.getMonth());
    printSeperateDate(previousFirstDay, previousDates.getDate(), previousMonth, previousYear);
}

function handleCalendarBtnsClick(e) {
    if(e.target.classList[0] === 'button-next') {
        removecurrentCalenderBody();
        printNextCalenderBody();
    } else if(e.target.classList[0] === 'button-prev') {
        removecurrentCalenderBody();
        printPreviousCalendarBody();
    }
}

function addEventListenerToCalendarBodyTexts() {
    for(let el of calendarBody_Rows) {
        for(let child of el.children) {
        child.addEventListener("click", handleCalendarBodyTextsClick);
        }
    }
}

function handleCalendarBodyTextsClick(e) {
    const date = e.target.textContent;
    const month = showMonthYear.textContent.split(" ")[0];
    const year = showMonthYear.textContent.split(" ")[1];
    const day = DAY_LIST[new Date(year, MONTH_LIST.indexOf(month), date).getDay()];
    printSeperateDate(day, date, month, year);
}

function init() {
    printSeperateDate(currentDay, currentDate, MONTH_LIST[now.getMonth()], currentYear);
    printCalendarBody(currentYear, currentMonth);
    highlightToday(currentDate);
    calendarBtns.forEach((btn) => btn.addEventListener("click", handleCalendarBtnsClick));
    addEventListenerToCalendarBodyTexts();
}

init();