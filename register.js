const infonext = document.getElementById("infonext");
const datenext = document.getElementById("datenext");
const timenext = document.getElementById("timenext");

const infocont = document.getElementById("infocont");
const datecont = document.getElementById("datecont");
const timecont = document.getElementById("timecont");

const timeButtons = Array.from(document.getElementsByClassName("timebutton"));


infonext.onclick = ()=>{
    infocont.style.display = "none";
    datecont.style.display = "block";
}

datenext.onclick = ()=>{ if(!datenext.classList.contains("disablednextbutton")){
    datecont.style.display = "none";
    timecont.style.display = "block";
}}

timenext.onclick = ()=>{ if(!timenext.classList.contains("disablednextbutton")){
    let confirmation = confirm(`You want to attend Yoga Class On ${monthIndex[currentmonth]} ${selectedDateNumber}, ${currentyear} at ${selectedTimeText}.
Are you sure?`)
}}



// calendar stuff

const currMonthElem = document.getElementById("currmonth");
const calendarPrevMonthButton = document.getElementById("prevmonth");
const calendarNextMonthButton = document.getElementById("nextmonth");


const monthIndex = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let selectedDate = "00";
let selectedDateNumber = 0;

let selectedTime = "0";
let selectedTimeText = "0:00";

const monthLimit = 3;

const actualMonth = (new Date()).getMonth();
let currentmonth = actualMonth;
let currentyear = (new Date()).getFullYear();
currMonthElem.innerText = monthIndex[currentmonth]+", "+String(currentyear);

function correctCalendarTable(){
    let endDate = 31;
    for(var i=29; i<=31; i++){
        if((new Date(currentyear, currentmonth, i,0,0,0,0)).getDate()!=i){
            endDate = i-1;
        }
    }

    let cc = (new Date(currentyear, currentmonth, 1,0,0,0,0)).getDay();
    let cr = 1;
    
    for(var cd=1; cd<=endDate; cd++){
        document.getElementById(`calanderrc${cr}${cc}`).innerText = String(cd);
        cc++;
        if(cc>=7){
            cc=0; cr++;
            if(cr>5) cr=1;
        }
    }
    
    cr = 1;
    for(
        cc=(new Date(currentyear, currentmonth, 1,0,0,0,0)).getDay();
        cc>=0; cc--){
            let cel = document.getElementById(`calanderrc${cr}${cc}`);
            if(cel.innerText==""){
                cel.classList.add("disableddate");
            }
        }
    for(var r=1; i<=5; i++){
        for(var c=0; c<7; c++){
            var el = document.getElementById(`calanderrc${r}${c}`);
            var date = Number(el.innerText);
            var actualDate = (new Date()).getDate();
            if(date-actualDate<0){
                el.classList.add("disableddate");
            }
        }
    }

    if(actualMonth==currentmonth){
        calendarPrevMonthButton.onclick = null;
        calendarPrevMonthButton.style.opacity = ".5";
    } else {
        calendarPrevMonthButton.onclick = prevMonthButtonClick;
        calendarPrevMonthButton.style.opacity = "1";
    }
    if(actualMonth+monthLimit-1==currentmonth){
        calendarNextMonthButton.onclick = null;
        calendarNextMonthButton.style.opacity = ".5";
    } else {
        calendarNextMonthButton.onclick = nextMonthButtonClick;
        calendarNextMonthButton.style.opacity = "1";
    }
    
}

correctCalendarTable();

function clearCalendar(){
    for(var cr=1; cr<=5; cr++){
        for(var cc=0; cc<7; cc++){
            document.getElementById(`calanderrc${cr}${cc}`).innerText="";
        }
    }
}

function nextMonthButtonClick(){
    clearCalendar();
    currentmonth++;
    if(currentmonth>11){
        currentmonth = 0;
        currentyear++;
    }
    currMonthElem.innerText = monthIndex[currentmonth]+", "+String(currentyear);
    correctCalendarTable();
    let r = selectedDate[0], c = selectedDate[1];
    selectedDateNumber = document.getElementById(`calanderrc${r}${c}`).innerText;
}

function prevMonthButtonClick(){
    clearCalendar();
    currentmonth--;
    if(currentmonth<0){
        currentmonth = 11;
        currentyear--;
    }
    currMonthElem.innerText = monthIndex[currentmonth]+", "+String(currentyear);
    correctCalendarTable();
    let r = selectedDate[0], c = selectedDate[1];
    selectedDateNumber = document.getElementById(`calanderrc${r}${c}`).innerText;
}

for(var r=1; r<=5; r++){
    for(var c=0; c<7; c++){
        document.getElementById(`calanderrc${r}${c}`).onclick = e => {
            if(!e.target.classList.contains("disableddate")){
                if(selectedDate!="00"){
                    let pr = selectedDate[0], pc = selectedDate[1];
                    document.getElementById(`calanderrc${pr}${pc}`)
                            .classList.remove("selecteddate");
                }
                var r = e.target.id[10], c = e.target.id[11];
                selectedDate = `${r}${c}`;
                e.target.classList.add("selecteddate");
                selectedDateNumber = e.target.innerText;

                if(datenext.classList.contains("disablednextbutton")){
                    datenext.classList.remove("disablednextbutton");
                }
            }
        }
    }
}

for (var b of timeButtons){
    b.onclick = e => {
        if(!e.target.classList.contains("disabledtime")){
            if(selectedTime!="0"){
                document.getElementById(`timebutton${selectedTime}`)
                        .classList.remove("selectedtime");
            }
            var t = e.target.id[10];
            selectedTime = `${t}`;
            e.target.classList.add("selectedtime");
            selectedTimeText = e.target.innerText;

            if(timenext.classList.contains("disablednextbutton")){
                timenext.classList.remove("disablednextbutton");
            }
        }
    }
}
