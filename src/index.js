import { makeToDo } from './maketodo.js'
import { pagePopulate } from './dom.js'

function addToDo(todo) {
    let arr
    if (localStorage.taskArray) {
        arr = storageArray()
    } else {
        arr = [];
    }
    arr.push(todo);
    localStorage.taskArray = JSON.stringify(arr);
}

function createProject() {

}

function storageArray() {
    return JSON.parse(localStorage.taskArray)
}

delete localStorage.taskArray
addToDo(makeToDo('Buy coffee.', 'Preferably light roast.', '2/28/21', 'High', ['Pick out coffee.', 'Purchase.'], 'Home'))
addToDo(makeToDo('Buy eggs.', 'Cage free.', '2/28/21', 'High', ['Pick out eggs.', 'Purchase.'], 'Home'))
console.table(storageArray());
pagePopulate(storageArray())