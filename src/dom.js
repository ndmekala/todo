import { toDo } from './todo.js'
import { format, isFuture, isToday, isThisYear, isTomorrow, startOfDay } from 'date-fns'

var domLogic = (function () {
    // let newtaskopen = false
    // const add = document.querySelector('#add')
    // add.addEventListener(('click'), () => {
    //     if (!newtaskopen) {
    //         document.querySelector('#my-form').style.display = 'block';
    //         add.textContent = '–'
    //     }
    //     else {
    //         document.querySelector('#my-form').style.display = 'none';
    //         add.textContent = '+'
    //     }
    //     newtaskopen = !newtaskopen
    // })
    // const newtodo = document.querySelector('#newtodo')
    // newtodo.addEventListener(('click'), () => {
    //     let task = document.getElementById('task').value;
    //     let notes = document.getElementById('notes').value;
    //     let duedate = new Date();//document.getElementById('duedate').value;
    //     let priority = document.getElementById('priority').value;
    //     let checklist = document.getElementById('checklist').value;
    //     let project = document.getElementById('project').value;
    //     toDo.add(toDo.make(task, notes, duedate, priority, checklist, project));
    //     domLogic.clearDOM();
    //     domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
    //     document.querySelector('#my-form').style.display = 'none';
    // })
    return {
        clearDOM: function () {
            const box = document.querySelector('#tasklist')
            const side = document.querySelector('#projlist')
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }

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
                if (!b.includes(element.project) && element.project !== '') {
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
                    // lol can’t in javascript dummy
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
        ulToArray: function (ul) {
            let arr = [];
            let nodeList = ul.childNodes;
            nodeList.forEach(e => {
                if (e.textContent !== '' && !e.classList.contains('addChecklistItem')) {
                    arr.push(e.textContent)
                    }
            })
            return arr
        },
        displayElement: function (todo) {
            const box = document.querySelector('#tasklist');
            const taskBox = document.createElement('div');
                taskBox.classList.add('taskBox')

                const taskComplete = document.createElement('div');
                    taskComplete.classList.add('taskComplete');
                    taskComplete.addEventListener(('click'), (e) => {
                        
                        if (!e.target.classList.contains('dontCheck')) {
                            // define and add ✓
                            const checkmark = document.createElement('span');
                            checkmark.classList.add('checkmark');
                            // (pre-lock checkmark itself)
                            checkmark.classList.add('dontCheck');
                            checkmark.textContent = '✓'
                            e.target.appendChild(checkmark);
                            // cross out and gray task title
                            e.target.parentNode.querySelector('.task').style.color = 'lightgray';
                            e.target.parentNode.querySelector('.task').style.textDecoration = 'line-through';
                            e.target.parentNode.querySelector('.task').style.textDecorationThickness = '2px';

                            // lock todo; delete from list
                            e.target.parentNode.querySelector('.task').classList.add('dontOpen');
                            toDo.delete(todo);

                            // lock checkbox
                            e.target.classList.add('dontCheck')
                        }
                    });
                    taskBox.appendChild(taskComplete);

                const taskText = document.createElement('div');
                    taskText.classList.add('taskText');
                    const task = document.createElement('h4');
                        task.textContent = todo.task;
                        task.classList.add('task');
                        task.addEventListener(('click'), (e) => {
                            if (!e.target.classList.contains('dontOpen')) {
                                e.target.contentEditable = "true";
                                e.target.parentNode.querySelector('.taskDetails').style.display = 'block';
                            }
                        })
                        taskText.appendChild(task);
                
                    const details = document.createElement('div');
                        details.classList.add('taskDetails')
                        taskText.appendChild(details)

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

                        const checklist = document.createElement('ul');
                            checklist.classList.add('checklist');
                            todo.checklist.forEach(element => {
                                const checklistItem = document.createElement('li');
                                checklistItem.textContent = element;
                                checklistItem.contentEditable = 'true';
                                checklist.appendChild(checklistItem)                    
                            })
                            const addChecklistItem = document.createElement('div');
                                addChecklistItem.textContent = '+';
                                addChecklistItem.classList.add('addChecklistItem');
                                addChecklistItem.addEventListener('click', () => {
                                    const checklistItem = document.createElement('li');
                                    checklistItem.textContent = '';
                                    checklistItem.contentEditable = 'true';
                                    checklist.insertBefore(checklistItem, checklist.lastChild)
                                })
                            checklist.appendChild(addChecklistItem);
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
                                            domLogic.ulToArray(e.target.parentNode.querySelector('.checklist')),
                                            todo.project)
                                domLogic.clearDOM();
                                domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                            })
                        details.appendChild(submit);
                    taskBox.appendChild(taskText);

            box.appendChild(taskBox);
        },
        pagePopulate: function(a) {
            const box = document.querySelector('#tasklist');
            const side = document.querySelector('#projlist')

            // main list
            const noProj = document.createElement('h2');
                noProj.style.color = "lightgray"
                noProj.textContent = "Unassigned"
                box.appendChild(noProj)
            // something that generates every to do not on a project…
            // the new todos are not gray, which is confusing…
            const projectlessToDos = a.filter (e => e.project === '')
                projectlessToDos.forEach(todo => domLogic.displayElement(todo))
            // plus button to add to no particular project
                const addProjectlessToDo = document.createElement('div');
                addProjectlessToDo.classList.add('addToDo');
                addProjectlessToDo.textContent = '+';
                addProjectlessToDo.style.color = "lightgray"
                addProjectlessToDo.addEventListener(('click'), (event) => {
                    toDo.add(toDo.make('(new todo)', '(notes)', new Date(), ['(checklist item)'], ''))
                    domLogic.clearDOM();
                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                })
                box.appendChild(addProjectlessToDo)

            // generate todos on projects
            let projectArray = domLogic.buildProjectArray(a);
            projectArray.forEach(element => {
                const proj = document.createElement('h2');
                    proj.textContent = element;
                    box.appendChild(proj);
                const projToDos = a.filter(e => e.project === element)
                    projToDos.forEach(todo => domLogic.displayElement(todo))
                const addTask = document.createElement('div');
                    addTask.textContent = '+'
                    addTask.classList.add('addToDo');
                    addTask.addEventListener(('click'), (event) => {
                        toDo.add(toDo.make('(new todo)', '(notes)', new Date(), ['(checklist item)'], element))
                        domLogic.clearDOM();
                        domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                    })
                    box.appendChild(addTask)

            })
            // sidebar
            projectArray.forEach(element => {
                const sideBarProj = document.createElement('h4');
                sideBarProj.textContent = element;
                side.appendChild(sideBarProj);
                // add event listeners
            })
            // add project…
        }
    }
})();

export {domLogic}
