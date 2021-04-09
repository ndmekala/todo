import { toDo } from './todo.js'
import { domLogic } from './dom.js'

// IMPROVEMENT:
// * Work w things API!
// * export to things via mail or other options with buttons at the bottom

let arr = [];
let taskobj1 = {task: 'Buy a Mac.', notes: 'Now!', dueDate: new Date(), project: 'Shopping'};
let taskobj2 = {task: 'Buy an iPhone.', notes: 'Now!', dueDate: new Date(), project: 'Shopping'};
arr.push(taskobj1);
arr.push(taskobj2);
localStorage.taskArray = JSON.stringify(arr)

if (localStorage.taskArray) {
    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
}