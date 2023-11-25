//----------------カレンダー----------------//
const today = new Date();

let showDate = new Date(today.getFullYear(),today.getMonth(),1);

const prev = () => {
    showDate.setMonth(showDate.getMonth() - 1);
    createCalendar(showDate);                           
}

const next = () => {
    showDate.setMonth(showDate.getMonth() + 1);
    createCalendar(showDate);                          
}






const month_english_list = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.']
const createCalendar = (date) => {
    let year = date.getFullYear();
    var month = date.getMonth()
    let  month_english =  month_english_list[month];
    document.querySelector('#header').innerHTML = month_english  + year;
   
    let calendar = createTable(year,month);
    document.querySelector('#calendar').innerHTML = calendar;
}

window.onload = () => {
    createCalendar(today);
}




const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const createTable  = (year,month) =>{
    let calendar = "<table><tr class='dayOfWeek'>";
    for(let i = 0;i < week.length;i++){
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    let count = 0;
    let startDayOfWeek = new Date(year,month,1).getDay();
    let endDate = new Date(year,month + 1,0).getDate();
    let lastMonthEndDate = new Date(year,month,0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate)/week.length);
   
     

    for(let i = 0;i < row;i++){
        calendar += " <tr>";
        for(let j = 0;j < week.length;j++){
            if(i == 0 && j < startDayOfWeek){
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1)+" </td>";
            }else if(count >= endDate){
                count ++;
                calendar += "<td class='disabled'>" + (count - endDate)+"</td>";
            }else{
                count ++;
                if(year == today.getFullYear() && month == (today.getMonth()) && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                }else{
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += " </tr>";
    }
    return calendar;
}







//-----------------todoリスト-----------------//
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    li.classList.add('list-group-item')

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }


    //右クリックしたとき
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });


    //左クリックしたとき（完了したので線を引く）
    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();


      //------メッセージ-------//
      rand = Math.floor(Math.random()*5);
	if (rand == 0) msg = "お疲れ様😊";
	if (rand == 1) msg = "頑張ってるね✌️";
	if (rand == 2) msg = "すごい😗";
	if (rand == 3) msg = "その調子😳";
	if (rand == 4) msg = "休憩もしよう😌";
	alert(msg);
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}



//-----------------名言-------------------//
const hour = new Date().getHours();
//朝4時〜10時59分まで
if(hour >= 4　&& hour < 11){
document.getElementById('greeting').textContent ="朝寝は時間の出費である。しかも、これほど高価な出費は他にない （by カーネギー）";
//昼１１時〜1６時59分まで
}else if(hour >=11 && hour <17){
document.getElementById('greeting').textContent ="今から数年後、あなたはやったことよりも、やらなかったことに失望する。 (by マーク・トウェイン)";
//夜18時〜3時59分まで
}else{
document.getElementById('greeting').textContent ="同じ時間に寝て、同じ時間に起きることは、良い睡眠を得るために必要不可欠である。(byハワード・バネス)";
}




//---------------現在時刻--------------//
function showClock() {
  let nowTime = new Date();
  let nowHour = nowTime.getHours();
  let nowMin  = nowTime.getMinutes();
  let nowSec  = nowTime.getSeconds();
  let msg = "Current time：" + nowHour + ":" + nowMin + ":" + nowSec;
  document.getElementById("realtime").innerHTML = msg;
}
setInterval('showClock()',1000);



