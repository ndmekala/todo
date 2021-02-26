import { toDo } from './todo.js'
import { domLogic } from './dom.js'

if (localStorage.taskArray) {
    domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
}