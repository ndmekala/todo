import { toDo } from './todo.js'

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
        let duedate = document.getElementById('duedate').value;
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
        pagePopulate: function(a) {
            const box = document.querySelector('#tasklist');
            const side = document.querySelector('#projlist')


            // consider how to make this work with *no* project…
            const displayElement = (todo) => {


                const taskBox = document.createElement('div');
                taskBox.classList.add('taskBox')
                const task = document.createElement('h4');
                task.textContent = todo.task;
                taskBox.appendChild(task);

                const details = document.createElement('div');
                details.classList.add('taskDetails')
                taskBox.appendChild(details)

                const notes = document.createElement('p');
                notes.textContent = todo.notes;
                notes.classList.add('notes')
                details.appendChild(notes);
                notes.addEventListener(('click'), () => {
                    var editable = document.createElement('textarea')
                    editable.textContent = notes.textContent
                    notes.replaceWith(editable);
                    editable.focus();
                    editable.addEventListener(('blur'), (e) => {
                        console.log('tis blurred!!')
                        // don’t work rn
                        // need to “save” edited text…
                        // (then export to toDo.edit()…)
                        console.log(e.target)
                        // editable.replaceWith(notes);
                    });
                    // notes.blur(console.log('blur!!'));
                })

                const dueDate = document.createElement('p');
                dueDate.textContent = todo.dueDate;
                dueDate.classList.add('dueDate')
                details.appendChild(dueDate);

                const priority = document.createElement('p');
                priority.textContent = todo.priority;
                priority.classList.add('priority')
                details.appendChild(priority)

                // idea: make an unordered list for each *array*
                // and then each *item* is a new list item
                // forEach over it
                const checklist = document.createElement('p');
                checklist.textContent = todo.checklist;
                checklist.classList.add('checklist')
                details.appendChild(checklist)

                const deleteToDo = document.createElement('button');
                deleteToDo.textContent = "Delete";
                deleteToDo.addEventListener(('click'), () => {
                    toDo.delete(todo);
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                taskBox.appendChild(deleteToDo);

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

                const edit = document.createElement('button');
                edit.textContent = 'Edit';
                edit.addEventListener(('click'), () => {
                    toDo.edit(todo);
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                taskBox.appendChild(edit)

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