import { toDo } from './todo.js'
import { format, formatDistance } from 'date-fns'

var domLogic = (function () {
    let newtaskopen = false
    const add = document.querySelector('#add')
    add.addEventListener(('click'), () => {
        if (!newtaskopen) {
            document.querySelector('#my-form').style.display = 'block';
            add.textContent = '–'
        }
        else {
            document.querySelector('#my-form').style.display = 'none';
            add.textContent = '+'
        }
        newtaskopen = !newtaskopen
    })
    const newtodo = document.querySelector('#newtodo')
    newtodo.addEventListener(('click'), () => {
        let task = document.getElementById('task').value;
        let notes = document.getElementById('notes').value;
        let duedate = new Date();//document.getElementById('duedate').value;
        let priority = document.getElementById('priority').value;
        let checklist = document.getElementById('checklist').value;
        let project = document.getElementById('project').value;
        toDo.add(toDo.make(task, notes, duedate, priority, checklist, project));
        domLogic.clearDOM();
        domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
        document.querySelector('#my-form').style.display = 'none';
    })
    return {
        clearDOM: function () {
            const box = document.querySelector('#tasklist')
            const side = document.querySelector('#projlist')
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
            box.innerHTML += "<h1>Checklist ✅</h1>"

            while (side.firstChild) {
                side.removeChild(side.firstChild);
            }
        },
        sortTaskArray: function (a) {
            const b = a.sort(function(first, next) {
                return first.project > next.project ? 1 : -1
            });
            // okay maybe first sort by date then by project and print??
            // add date sorting once date format regulated
            return b
        },
        buildProjectArray: function (a) {
            let b = []
            a.forEach(element => {
                if (!b.includes(element.project)) {
                    b.push(element.project)
                }
            })
            const projectArray = b.sort(function(first, next) {
                return first > next ? 1 : -1
            })
            return projectArray
        },
        displayDate: function() {
            let now = new Date();
            let then = new Date(1995, 11, 10)
            return formatDistance(now, then)
        },
        pagePopulate: function(a) {
            const box = document.querySelector('#tasklist');
            const side = document.querySelector('#projlist')

            // TESTING DATE STUFF RIGHT HERE!!
            // formatDistance…
            console.log('Kiran is ' + domLogic.displayDate()); //format(new Date(), 'eee'));

            // consider how to make this work with *no* project…
            const displayElement = (todo) => {

                const taskBox = document.createElement('div');
                taskBox.classList.add('taskBox')
                const task = document.createElement('h4');
                task.textContent = todo.task;
                task.classList.add('task');
                task.contentEditable = "true";
                task.addEventListener(('blur'), (e) => {
                    toDo.edit(  todo,
                        e.target.textContent,
                        e.target.parentNode.querySelector('.notes').textContent,
                        e.target.parentNode.querySelector('.dueDate').textContent,
                        e.target.parentNode.querySelector('.priority').textContent,
                        e.target.parentNode.querySelector('.checklist').textContent,
                        todo.project)
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                taskBox.appendChild(task);

                const details = document.createElement('div');
                details.classList.add('taskDetails')
                taskBox.appendChild(details)

                const notes = document.createElement('p');
                notes.textContent = todo.notes;
                notes.classList.add('notes')
                notes.contentEditable = "true";
                notes.addEventListener(('blur'), (e) => {
                    toDo.edit(  todo, 
                        e.target.parentNode.parentNode.querySelector('.task').textContent,
                        e.target.parentNode.querySelector('.notes').textContent,
                        e.target.parentNode.querySelector('.dueDate').textContent,
                        e.target.parentNode.querySelector('.priority').textContent,
                        e.target.parentNode.querySelector('.checklist').textContent,
                        todo.project)
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                details.appendChild(notes);

                const dueDate = document.createElement('p');
                // make this so that if it’s within a week it date-fns and displays “Fri” format… eee
                // if it’s within the year: “Mar 20” … MMM d
                // if it’s more than a year: “Mar 2021” MMM yyyy
                // if it’s passed and within the year “Mar 20” in RED
                // if it’s passed and a previous year “Mar 2019” in RED
                dueDate.textContent = todo.dueDate;
                dueDate.classList.add('dueDate')
                dueDate.contentEditable = "true";
                dueDate.addEventListener(('blur'), (e) => {

                    toDo.edit(  todo, 
                        e.target.parentNode.parentNode.querySelector('.task').textContent,
                        e.target.parentNode.querySelector('.notes').textContent,
                        e.target.parentNode.querySelector('.dueDate').textContent,
                        e.target.parentNode.querySelector('.priority').textContent,
                        e.target.parentNode.querySelector('.checklist').textContent,
                        todo.project)
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                // only weird behavior is that it closes the edit screen once you lose focus because
                // its totally rebuilding the screen…
                // solutions… save on blur… rebuild DOM on… clicking “collapse”?
                details.appendChild(dueDate);

                const priority = document.createElement('p');
                priority.textContent = todo.priority;
                priority.classList.add('priority')
                priority.contentEditable = "true";
                priority.addEventListener(('blur'), (e) => {
                    toDo.edit(  todo, 
                        e.target.parentNode.parentNode.querySelector('.task').textContent,
                        e.target.parentNode.querySelector('.notes').textContent,
                        e.target.parentNode.querySelector('.dueDate').textContent,
                        e.target.parentNode.querySelector('.priority').textContent,
                        e.target.parentNode.querySelector('.checklist').textContent,
                        todo.project)
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                details.appendChild(priority)

                // idea: make an unordered list for each *array*
                // and then each *item* is a new list item
                // forEach over it
                const checklist = document.createElement('p');
                checklist.textContent = todo.checklist;
                checklist.classList.add('checklist')
                checklist.contentEditable = "true";
                checklist.addEventListener(('blur'), (e) => {
                    toDo.edit(  todo, 
                        e.target.parentNode.parentNode.querySelector('.task').textContent,
                        e.target.parentNode.querySelector('.notes').textContent,
                        e.target.parentNode.querySelector('.dueDate').textContent,
                        e.target.parentNode.querySelector('.priority').textContent,
                        e.target.parentNode.querySelector('.checklist').textContent,
                        todo.project)
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                details.appendChild(checklist)

                const deleteToDo = document.createElement('button');
                deleteToDo.textContent = "Delete";
                deleteToDo.addEventListener(('click'), () => {
                    toDo.delete(todo);
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                taskBox.appendChild(deleteToDo);

                // i feel like it would simplify the app logic to make “expand” somethign that was
                // only one to do at a time
                const expand = document.createElement('button');
                expand.textContent = 'Expand';
                let taskopen = false
                expand.addEventListener(('click'), (e) => {
                    if (!taskopen) {
                        e.target.parentNode.querySelector('.taskDetails').style.display = 'block'
                        expand.textContent = 'Collapse';
                    } else {
                        e.target.parentNode.querySelector('.taskDetails').style.display = 'none'
                        expand.textContent = 'Expand';
                    }
                    taskopen = !taskopen
                })
                taskBox.appendChild(expand);

                // deleted the edit button because it’s built into the way the items are displayed
                // I am still considering a “submit” button or something… because that could help you
                // from refocusing the whole damn dom… unless… changing focus out of parentNode refreshes dom…

                box.appendChild(taskBox);

            }
            let projectArray = domLogic.buildProjectArray(a);
            // main list
            projectArray.forEach(element => {
                const proj = document.createElement('h2');
                proj.textContent = element;
                box.appendChild(proj);
                const projToDos = a.filter(e => e.project === element)
                projToDos.forEach(todo => displayElement(todo))
            })
            // sidebar
            projectArray.forEach(element => {
                const sideBarProj = document.createElement('h4');
                sideBarProj.textContent = element;
                side.appendChild(sideBarProj);
                // add event listeners
            })
        }
    }
})();

export {domLogic}