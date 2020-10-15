var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthAndYear = document.getElementById("monthAndYear");
var startYear = 1994;
var endYear = 2024;
var weeks = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"]
for (var x = startYear; x < endYear; x++) {
  var yearList = document.createElement("option");
  var yearName = document.createTextNode(x);
  yearList.appendChild(yearName);
  var element = document.getElementById("year");
  element.appendChild(yearList);
}

for (var x = 0; x<weeks.length; x++ ) {
  var weekList = document.createElement("th");
  var weekName = document.createTextNode(weeks[x]);
  weekList.appendChild(weekName);
  var element = document.getElementById("week");
  element.appendChild(weekList);
}
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function setDate() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function daysinMonth(countMonth, countYear) {
  return new Date(countYear, countMonth+1, 0).getDate();
}

function disPrevious(prevYear,prevMonth) {
  prevYear = (prevMonth === 0) ? prevYear - 1 : prevYear;
  prevMonth = (prevMonth === 0) ? 11 : prevMonth - 1;
  var lastMonthdate = (new Date(prevYear, prevMonth+1, 0)).getDate();
  var lastday = (new Date(prevYear, prevMonth, lastMonthdate)).getDay();
  var temp = lastMonthdate - lastday;
  return temp;
}

function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  var disPrev = disPrevious(year, month)
  var disNext = 1;
  var date = 1;
  var tbl = document.getElementById("calendar-body"); 
  tbl.innerHTML = "";
  monthAndYear.innerHTML =  months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      var col = document.createElement("td");
      if (i == 0 && j < firstDay) {
        col.setAttribute("id", "disableField");
        colText = document.createTextNode(disPrev);
        disPrev += 1;
      } else if (date > daysinMonth(month, year) ) {
          col.setAttribute("id", "disableField");
          colText = document.createTextNode(disNext);
          disNext +=1;
      } else {
          colText = document.createTextNode(date);
          col.style.fontWeight = "Semi-bold,";
          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            col.classList.add("bg-info");
          } else if (j == 0) {
            col.style.color = "red";
          } 
          date++;
      }
      col.appendChild(colText);
      row.appendChild(col);
    }
    tbl.appendChild(row); 
    if (date > daysinMonth(month, year)){
      break;
    }
  }
}
