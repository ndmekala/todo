import { toDo } from './todo.js'

var domLogic = (function () {
    // make to do
    const add = document.querySelector('#add')
    add.addEventListener(('click'), () => {
        document.querySelector('#my-form').style.display = 'block';
    })
    const closebox = document.querySelector('#closebox')
    closebox.addEventListener(('click'), () => {
        document.querySelector('#my-form').style.display = 'none';
    })
    const newtodo = document.querySelector('#newtodo')
    newtodo.addEventListener(('click'), () => {
        // let task = document.querySelector('input[name=task"]');
        // console.log(task);
        // var notes = document.querySelector('input[name="notes"]');
        // var duedate = document.querySelector('input[name="duedate"]');
        // // var priority = document.querySelector('select[name="priority"]');
        // var checklist = document.querySelector('input[name="checklist"]');
        // var project = document.querySelector('input[name="project"]');
        toDo.add(toDo.make('pink', 'elephants', 'roam', 'in', 'our', 'midst'))
        // toDo.add(toDo.make(task, task, task, task, task, task, task))
        // console.table(JSON.parse(localStorage.taskArray));
        document.querySelector('#my-form').style.display = 'none';
    })
    return {
        pagePopulate: function(a) {
            const box = document.querySelector('#testdiv')
            // make sub-arrays for each different project with sort or filter or something
            const displayElement = (currentValue) => {
                for (let key in currentValue) {
                    box.innerHTML += key + ': ' + currentValue[key] + '<br>';
                }
                box.innerHTML += '<br>'
            }
            a.forEach(element => displayElement(element))
        }
    }
})();

export {domLogic}