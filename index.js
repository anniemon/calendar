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
    // if(calendarBody_Rows[row].children[col].textContent === String(currentDate)){
    //     calendarBody_Rows[row].children[col].classList.add("today");
    // }
    // if(calendarBody_Rows[row].children[col].textContent === String(currentDate)){
    //     calendarBody_Rows[row].children[col].classList.add("today");
    // }
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
    printCalendarBody(currentYear, currentMonth++);
}

function removecurrentCalenderBody() {
    for(let i = 0; i < calendarBody_Rows.length; i ++) {
        for(let j = 0; j < 7; j++) {
            calendarBody_Rows[i].children[j].textContent = '';
        }
    }
}

function handleClick(e) {
    if(e.target.classList[0] === 'button-next') {
        removecurrentCalenderBody();
        printNextCalenderBody();
    } else if(e.target.classList[0] === 'button-prev') {
        
    }
}

function init() {
    printSeperateDate(currentDay, currentDate, MONTH_LIST[now.getMonth()], currentYear);
    printCalendarBody(currentYear, currentMonth);
    calendarBtns.forEach((btn) => btn.addEventListener("click", handleClick));
}

init();