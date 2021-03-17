import { toDo } from './todo.js'
import { domLogic } from './dom.js'

// ISSUES:
// * Needs a mobile layout
// * clicking projects in pane should do something…
// * checklist items should be check-off-able
// * should move away from emojis… maybe svg
// * (right now it loads the array below by default [👇🏽])
// * right now it does not sort by date
// * or display date: that would be nice next to the buttons. And maybe not just when you open it either.
// * The date looks bad…
// * more things should have cursor hand hover states…
// * the new todo stylng should match for a new project and new to do
// * using prompt for the new project name is a little ratchet…
// * todos should save be default when their thing goes to display: "none".
//   (e.g., when you close a todo by opening another one)
// * there should be some more thought put into sizing. min widths… should side pane really grow to fit 1/5… etc

// IMPROVEMENT:
// * Work w things API!
// * export to things via mail or other options with buttons at the bottom

let arr = [];
let taskobj1 = {task: 'Buy a Mac.', notes: 'Now!', dueDate: new Date(), checklist: ['Select', 'Purchase'], project: 'Shopping'};
let taskobj2 = {task: 'Buy an iPhone.', notes: 'Now!', dueDate: new Date(), checklist: ['Select', 'Purchase'], project: 'Shopping'};
arr.push(taskobj1);
arr.push(taskobj2);
localStorage.taskArray = JSON.stringify(arr)

if (localStorage.taskArray) {
    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
}