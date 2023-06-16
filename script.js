//нажатие на кнопку
const dom={
  new: document.getElementById('new'),
  add: document.getElementById('add'),
  count: document.getElementById('count'),
  taskList: document.getElementById('tasks'),
  currentDate: document.getElementById('current_date'),
  calendar:document.getElementById('calendar'),
  setToday:document.getElementById('set_today')
}
//опреленим класс note
class Note {
    constructor(id, text, isCompleded,createddDate) {
      this.id=id;
      this.text = text;
      this.isCompleded=isCompleded;
      this.createddDate=createddDate;
    }
  }
//массив куда создаются заметки пользователя
let tasks=[];
let selectedDate=new Date();
selectedDate.setHours(0,0,0,0);

//функция, котрая выполняется при загрузке страницы 
window.onload = function(){
    displayDate()
    const raw=localStorage.getItem('notes')
    tasks=JSON.parse(raw)
    counts()
    displayNotes()
    //добавить то что мы сохранили в local storage в массив tasks
    //отобразить все текущие заметки (tasks) 
    
}

//пользователь нажимает на кнопку и срабатывет функция 
dom.add.addEventListener('click', addTasks)

//добавляем задачи 
function addTasks(){
 if(dom.new.value==''){
    return 
 }
const note=new Note( Date.now(),dom.new.value,false,selectedDate)
tasks.push(note)
localStorage.setItem('notes', JSON.stringify(tasks))//сохранить все заметки в локал сторедж(перезаписать все что было)

displayNotes()
dom.new.value=null;//сбрасывает задачу
counts()
console.log(tasks)
}

//изменяем счетчик 
function counts(){
    dom.count.innerHTML =tasks.filter(elementTask=>new Date(elementTask.createddDate).getTime()==selectedDate.getTime()).length; 
}

//добавить список задач на экран ,отразить их списком последовательно один за другим 
function displayNotes(){
    var noteDivs=''
   for (var i = 0; i < tasks.length;i++) {
   if (selectedDate.getTime()==new Date(tasks[i].createddDate).getTime()){
     const targetTextClass= tasks[i].isCompleded ?'todo_task_complete':'todo_task-text';
     noteDivs+=`<div class='todo_task'>
     <input id=${tasks[i].id} type="checkbox" class='todo_checkbox' onclick=' changeNoteStatus(${tasks[i].id})'> </input>
     <div class=${targetTextClass}>${tasks[i].text}</div>
     <div class='todo_task-del'  onclick=' delateTask(${tasks[i].id})'></div>
     <div class='todo_task-edit'  onclick='editTask(${tasks[i].id})'></div>
     </div>`; 
   }
   } 
dom.taskList.innerHTML=noteDivs;
}
//отследить выполнеия задачи 
function changeNoteStatus(id){
const clickedNote=tasks.find(e=>e.id==id)
clickedNote.isCompleded=!clickedNote.isCompleded;
displayNotes()
}

function delateTask(id){
   const task1= tasks.find(note=>note.id==id)
    var index = tasks.indexOf(task1);
if (index !== -1) {       //если заметка найденна удаляем ее из массива
  tasks.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(tasks))
}
displayNotes()
counts()
}

function editTask(id){
var a=prompt('Enter a note')
if(a===''){
return
}
const edit1=tasks.find(notes=>notes.id==id)
edit1.text=a
localStorage.setItem('notes', JSON.stringify(tasks))
displayNotes()
}
//отображаем текущюю или выбронную дату
function displayDate(){
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
 const date = selectedDate.toLocaleDateString('en-us', { year:"numeric", month:"short",day: 'numeric'})
 dom.currentDate.innerHTML='Date: '+ date;
}
//обработка даты котрую выбрал пользователь в календаре 
dom.calendar.addEventListener("change", handelCalendarDate);
 
function handelCalendarDate(){
 const calendarDate = new Date(dom.calendar.value)
 calendarDate.setHours(0,0,0,0);
 selectedDate = calendarDate;
 displayDate()
 displayNotes()
 counts()
}
dom.setToday.addEventListener('click', setToday)// вешаем на конку ивент листенера
 
function setToday(){
 selectedDate=new Date();
 selectedDate.setHours(0,0,0,0);
counts()
displayNotes()
displayDate()
}