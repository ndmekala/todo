import { toDo } from './todo.js'
import { domLogic } from './dom.js'

let arr = []
let taskobj1 = {task: 'Buy a Mac.', notes: 'Now!', dueDate: new Date(), priority: 'Low', checklist: ['Select', 'Purchase'], project: 'Shopping'}
let taskobj2 = {task: 'Buy an iPhone.', notes: 'Now!', dueDate: new Date(), priority: 'High', checklist: ['Select', 'Purchase'], project: 'Shopping'}
arr.push(taskobj1)
arr.push(taskobj2)
localStorage.taskArray = JSON.stringify(arr)

if (localStorage.taskArray) {
    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
}