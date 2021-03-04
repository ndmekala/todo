import { toDo } from './todo.js'
import { format, isFuture, isToday, isThisYear, isTomorrow, startOfDay } from 'date-fns'

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
        displayDate: function(d) {
            let now = new Date();
            if (isToday(d)) {
                return "Today";
            } else if (isTomorrow(d)) {
                return "Tomorrow"
            } else if (parseInt((d-startOfDay(now))/(3600*1000*24)) <= 6 && (d-startOfDay(now))/(3600*1000*24) > 1) {
                return format(d, 'eee')
            } else if (isThisYear(d)) {
                if (isFuture(d)) {
                    return format(d, 'MMM d')
                } else {
                    return format(d, 'MMM d')
                    //make red
                }
            } else {
                if (isFuture(d)) {
                    return format(d, 'MMM yyyy')
                } else {
                    return format(d, 'MMM yyyy')
                    //make red
                }
            };
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
                task.classList.add('task');
                // keyboard event listener to merely select
                
                task.addEventListener(('click'), (e) => {
                    if (document.querySelector('.selected')) {
                        document.querySelector('.selected').classList.remove('selected')
                    };
                    e.target.classList.add('selected');
                    e.target.contentEditable = "true";
                    e.target.parentNode.querySelector('.taskDetails').style.display = 'block'
                })


                //enter event listener… can find the task you’re in by queryselectoring selected…
                // more specifically opened/ not opened

                
                // task.addEventListener(('blur'), (e) => {
                //     toDo.edit(  todo,
                //         e.target.textContent,
                //         e.target.parentNode.querySelector('.notes').textContent,
                //         // NO LONGER WORKS e.target.parentNode.querySelector('.dueDate').textContent,
                //         e.target.parentNode.querySelector('.priority').textContent,
                //         e.target.parentNode.querySelector('.checklist').textContent,
                //         todo.project)
                //     domLogic.clearDOM();
                //     domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                // })
                taskBox.appendChild(task);

                const details = document.createElement('div');
                details.classList.add('taskDetails')
                taskBox.appendChild(details)

                const notes = document.createElement('p');
                notes.textContent = todo.notes;
                notes.classList.add('notes')
                notes.contentEditable = "true";
                details.appendChild(notes);

                const dueDate = document.createElement('input');
                dueDate.type = 'date';
                dueDate.setAttribute("data-date", domLogic.displayDate(Date.parse(todo.dueDate)))
                dueDate.classList.add('dueDate')
                dueDate.addEventListener('change', (e) => {
                    let arr = e.target.value.split('-')
                    let dat = new Date(arr[0], arr[1]-1, arr[2])
                    e.target.setAttribute("data-date", domLogic.displayDate(dat))
                })
                details.appendChild(dueDate)


                const priority = document.createElement('p');
                priority.textContent = todo.priority;
                priority.classList.add('priority')
                priority.contentEditable = "true";
                details.appendChild(priority)

                // idea: make an unordered list for each *array*
                // and then each *item* is a new list item
                // forEach over it
                const checklist = document.createElement('p');
                checklist.textContent = todo.checklist;
                checklist.classList.add('checklist')
                checklist.contentEditable = "true";
                details.appendChild(checklist)

                const deleteToDo = document.createElement('button');
                deleteToDo.textContent = "Delete";
                deleteToDo.addEventListener(('click'), () => {
                    toDo.delete(todo);
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                details.appendChild(deleteToDo);

                const submit = document.createElement('button');
                submit.textContent = 'Submit';
                submit.addEventListener(('click'), (e) => {
                    let dat
                    if (e.target.parentNode.querySelector('.dueDate').value) {
                        let arr = e.target.parentNode.querySelector('.dueDate').value.split('-')
                        dat = new Date(arr[0], arr[1]-1, arr[2])
                    } else {
                        dat = todo.dueDate;
                    }
                    toDo.edit(  todo,
                                e.target.parentNode.parentNode.querySelector('.task').textContent,
                                e.target.parentNode.querySelector('.notes').textContent,
                                dat,
                                e.target.parentNode.querySelector('.priority').textContent,
                                e.target.parentNode.querySelector('.checklist').textContent,
                                todo.project)
                            domLogic.clearDOM();
                            domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                    //deselecting and content editable taken care of by refresh
                })
                details.appendChild(submit)


                // i feel like it would simplify the app logic to make “expand” something that was
                // only one to do at a time


                // const expand = document.createElement('button');
                // expand.textContent = 'Expand';
                // let taskopen = false
                // expand.addEventListener(('click'), (e) => {
                //     if (!taskopen) {
                //         e.target.parentNode.querySelector('.taskDetails').style.display = 'block'
                //         expand.textContent = 'Collapse';
                //     } else {
                //         e.target.parentNode.querySelector('.taskDetails').style.display = 'none'
                //         expand.textContent = 'Expand';
                //     }
                //     taskopen = !taskopen
                // })
                // taskBox.appendChild(expand);

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
