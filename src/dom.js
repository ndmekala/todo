import { toDo } from './todo.js'

var domLogic = (function () {
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
        let task = document.getElementById('task').value;
        let notes = document.getElementById('notes').value;
        let duedate = document.getElementById('duedate').value;
        let priority = document.getElementById('priority').value;
        let checklist = document.getElementById('checklist').value;
        let project = document.getElementById('project').value;
        toDo.add(toDo.make(task, notes, duedate, priority, checklist, project));
        domLogic.clearDOM();
        domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
        domLogic.buildProjectArray(JSON.parse(localStorage.taskArray))
        document.querySelector('#my-form').style.display = 'none';
    })
    return {
        clearDOM: function () {
            const box = document.querySelector('#testdiv')
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
            box.innerHTML += "<h1>Checklist ✅</h1>"
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
        pagePopulate: function(a) {
            const box = document.querySelector('#testdiv');
            // consider how to make this work with *no* project…
            const displayElement = (currentValue) => {
                const task = document.createElement('h4');
                task.textContent = currentValue.task;
                box.appendChild(task);

                const notes = document.createElement('p');
                notes.textContent = currentValue.notes;
                box.appendChild(notes);

                const dueDate = document.createElement('p');
                dueDate.textContent = currentValue.dueDate;
                box.appendChild(dueDate);

                const priority = document.createElement('p');
                priority.textContent = currentValue.priority;
                box.appendChild(priority)

                // idea: make an unordered list for each *array*
                // and then each *item* is a new list item
                // forEach over it
                const checklist = document.createElement('p');
                checklist.textContent = currentValue.checklist;
                box.appendChild(checklist)

                // add button here
                // give it event listeners

            }
            let projectArray = domLogic.buildProjectArray(a);
            projectArray.forEach(element => {
                const proj = document.createElement('h2');
                proj.textContent = element;
                box.appendChild(proj);
                const projToDos = a.filter(e => e.project === element)
                projToDos.forEach(todo => displayElement(todo))
            })
        }
    }
})();

export {domLogic}