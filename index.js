const now = new Date();

const showDay = document.querySelector(".show-day");
const showDate = document.querySelector(".show-date");
const showMonthYear = document.querySelector(".show-month-year");
const calendarBody = document.querySelector("tbody");
const calendarBody_Rows = calendarBody.rows;
const calendarBtns = document.querySelectorAll("button");

const DAY_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_LIST = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const currentDate = now.getDate();
const currentDay = DAY_LIST[now.getDay()];
const currentYear = now.getFullYear();
let currentMonth = now.getMonth();
const firstDay = new Date(currentYear, currentMonth).getDay();

function printSeperateDate(day, date, month, year) {
  showDay.textContent = day;
  showDate.textContent = date;
  showMonthYear.textContent = `${month} ${year}`;
}

function printCalendarBody(currentYear, currentMonth, firstDay) {
  // firstDay는 해당 row의 몇 번째 요소에 1을 넣는가임.

  const calendarBodyTds = [];
  calendarBodyTds[0] = calendarBody_Rows[0].children[firstDay];

  for (let row = 0; row < calendarBody_Rows.length; row++) {
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col > firstDay) {
        calendarBodyTds.push(calendarBody_Rows[row].children[col]);
      } else if (row > 0) {
        calendarBodyTds.push(calendarBody_Rows[row].children[col]);
        if (calendarBodyTds.length >= calculateDateNumbers(currentMonth)) {
          break;
        }
      }
    }
  }

  for (let i = 0; i < calendarBodyTds.length; i++) {
    calendarBodyTds[i].textContent = i + 1;
  }
}

function highlightToday(currentDate) {
  for (let row = 0; row < calendarBody_Rows.length; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        calendarBody_Rows[row].children[col].textContent === String(currentDate)
      ) {
        calendarBody_Rows[row].children[col].classList.add("today");
      }
    }
  }
}

function highlightFirstDay(firstDay) {
  if (now.getMonth() === currentMonth) {
    highlightToday(currentDate);
    return;
  }
  for (let row = 0; row < calendarBody_Rows.length; row++) {
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col === firstDay) {
        calendarBody_Rows[row].children[col].classList.add("today");
      }
    }
  }
}

function calculateDateNumbers(month) {
  month = month + 1;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      dateNumber = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      dateNumber = 30;
      break;
    case 2:
      dateNumber = 28;
      break;
  }
  return dateNumber;
}

function printNextCalenderBody() {
  const nextDates = new Date(currentYear, currentMonth + 1);
  const nextFirstDayNum = new Date(currentYear, currentMonth + 1).getDay();
  currentMonth += 1;
  const nextYear = nextDates.getFullYear();
  const nextFirstDayStr = DAY_LIST[nextDates.getDay()];
  const nextMonth = MONTH_LIST[nextDates.getMonth()];
  printCalendarBody(nextYear, nextDates.getMonth(), nextFirstDayNum);
  highlightFirstDay(nextFirstDayNum);
  printSeperateDate(nextFirstDayStr, nextDates.getDate(), nextMonth, nextYear);
}

function removecurrentCalenderBody() {
  for (let i = 0; i < calendarBody_Rows.length; i++) {
    for (let j = 0; j < 7; j++) {
      calendarBody_Rows[i].children[j].textContent = "";
      calendarBody_Rows[i].children[j].classList.remove("today");
    }
  }
}

function printPreviousCalendarBody() {
  const previousDates = new Date(currentYear, currentMonth - 1);
  const previousFirstDayNum = new Date(currentYear, currentMonth - 1).getDay();
  currentMonth -= 1;
  const previousYear = previousDates.getFullYear();
  const previousFirstDayStr = DAY_LIST[previousDates.getDay()];
  const previousMonth = MONTH_LIST[previousDates.getMonth()];
  printCalendarBody(
    previousYear,
    previousDates.getMonth(),
    previousFirstDayNum
  );
  highlightFirstDay(previousFirstDayNum);
  printSeperateDate(
    previousFirstDayStr,
    previousDates.getDate(),
    previousMonth,
    previousYear
  );
}

function handleCalendarBtnsClick(e) {
  if (e.target.classList[0] === "button-next") {
    removecurrentCalenderBody();
    printNextCalenderBody();
    addEventListenerToCalendarBodyTexts();
  } else if (e.target.classList[0] === "button-prev") {
    removecurrentCalenderBody();
    printPreviousCalendarBody();
    addEventListenerToCalendarBodyTexts();
  }
}

function addEventListenerToCalendarBodyTexts() {
  for (let el of calendarBody_Rows) {
    for (let child of el.children) {
      if (child.textContent !== "") {
        child.addEventListener("click", handleCalendarBodyTextsClick);
      }
    }
  }
}

function handleCalendarBodyTextsClick(e) {
  if (e.target.textContent !== "") {
    const date = e.target.textContent;
    const month = showMonthYear.textContent.split(" ")[0];
    const year = showMonthYear.textContent.split(" ")[1];
    const day =
      DAY_LIST[new Date(year, MONTH_LIST.indexOf(month), date).getDay()];
    printSeperateDate(day, date, month, year);
  }
}

function init() {
  printSeperateDate(
    currentDay,
    currentDate,
    MONTH_LIST[now.getMonth()],
    currentYear
  );
  printCalendarBody(currentYear, currentMonth, firstDay);
  highlightToday(currentDate);
  calendarBtns.forEach((btn) =>
    btn.addEventListener("click", handleCalendarBtnsClick)
  );
  addEventListenerToCalendarBodyTexts();
}

init();
