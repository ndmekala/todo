import { makeToDo } from './maketodo.js'


function addToDo(todo) {
    let arr
    if (localStorage.taskArray) {
        arr = JSON.parse(localStorage.taskArray);
    } else {
        arr = [];
    }
    arr.push(todo);
    updateLocalStorage(arr)
}

function updateLocalStorage(a) {
    localStorage.taskArray = JSON.stringify(a)
}

addToDo(makeToDo('task', 'note1', 'date1', 'priority1', ['one', 'two']))
addToDo(makeToDo('task', 'note2', 'date2', 'priority2', ['anotherone', 'second']))
console.table(JSON.parse(localStorage.taskArray));