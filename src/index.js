import { toDo } from './todo.js'
import { domLogic } from './dom.js'


function createProject() {

}


delete localStorage.taskArray
toDo.add(toDo.make('Buy coffee.', 'Preferably light roast.', '2/28/21', 'High', ['Pick out coffee.', 'Purchase.'], 'Home'))
toDo.add(toDo.make('Buy eggs.', 'Cage free.', '2/28/21', 'High', ['Pick out eggs.', 'Purchase.'], 'Home'))
console.table(JSON.parse(localStorage.taskArray));
domLogic.pagePopulate(JSON.parse(localStorage.taskArray));