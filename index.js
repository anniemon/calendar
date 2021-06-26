const now = new Date();

const showDay = document.querySelector(".show-day");
const showDate = document.querySelector(".show-date");
const showMonthYear = document.querySelector(".show-month-year");
const calendarBody = document.querySelector("tbody");
const calendarBody_Rows = calendarBody.children;

const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
const MONTH_LIST = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const currentDate = now.getDate();
const currentMonth = now.getMonth();
const currentDay = DAY_LIST[now.getDay()];
const currentYear = now.getFullYear();


function printCurrentDate() {
    showDay.textContent = currentDay;
    showDate.textContent = currentDate;
    showMonthYear.textContent = `${MONTH_LIST[now.getMonth()]} ${currentYear}`;
}


function printCurrentDatesOfMonth() {
    let dateNumber = 2;
    let firstDay = now.getDay() + 1 - currentDate % 7 
    firstDay < 0 ? firstDay += 7 : firstDay;
    for(let row = 0; row < calendarBody_Rows.length; row++){
        for (let col = 0; col < 7; col++) {
            calendarBody_Rows[0].children[firstDay].textContent = 1;
            if(row === 0 && col > firstDay) {
                calendarBody_Rows[row].children[col].textContent = dateNumber;
                dateNumber++;
                if(calendarBody_Rows[row].children[col].textContent === String(currentDate)){
                    calendarBody_Rows[row].children[col].classList.add("today");
                }
            } else if( row > 0) {
                calendarBody_Rows[row].children[col].textContent = dateNumber;
                dateNumber++;
                if(dateNumber > calculateDateNumbers(currentMonth)) {
                    break;
                }
                if(calendarBody_Rows[row].children[col].textContent === String(currentDate)){
                    calendarBody_Rows[row].children[col].classList.add("today");
                }
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

function init() {
    printCurrentDate();
    printCurrentDatesOfMonth();
}

init();