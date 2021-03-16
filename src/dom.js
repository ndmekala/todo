import { toDo } from './todo.js'
import { format, isFuture, isToday, isThisYear, isTomorrow, startOfDay } from 'date-fns'
import { et } from 'date-fns/locale';

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
            const taskWrapper = document.createElement('div');
                taskWrapper.classList.add('taskWrapper')

                const taskBullet = document.createElement('div');
                    taskBullet.classList.add('taskBullet');
                    taskBullet.addEventListener(('click'), (e) => {
                        
                        if (!e.target.classList.contains('dontCheck')) {
                            // close taskDetails…
                            e.target.parentNode.querySelector('.taskDetails').style.display = 'none';
                            
                            // define and add ✓
                            const checkmark = document.createElement('span');
                            checkmark.classList.add('checkmark');
                            // (pre-lock checkmark itself)
                            checkmark.classList.add('dontCheck');
                            checkmark.textContent = '✓';
                            e.target.appendChild(checkmark);
                            // cross out, make uneditable, and gray task title
                            e.target.parentNode.querySelector('.taskTitle').style.color = 'lightgray';
                            e.target.parentNode.querySelector('.taskTitle').style.textDecoration = 'line-through';
                            e.target.parentNode.querySelector('.taskTitle').style.textDecorationThickness = '2px';
                            e.target.parentNode.querySelector('.taskTitle').style.cursor = 'default';
                            e.target.parentNode.querySelector('.taskTitle').contentEditable = "false";

                            // lock todo; delete from list
                            e.target.parentNode.querySelector('.taskTitle').classList.add('dontOpen');
                            toDo.delete(todo);

                            // lock checkbox
                            e.target.classList.add('dontCheck')
                        }
                    });
                    taskWrapper.appendChild(taskBullet);

                const taskModule = document.createElement('div');
                    taskModule.classList.add('taskModule');


                    const taskTitleAndControls = document.createElement('div');
                        taskTitleAndControls.classList.add('taskTitleAndControls');
                        const taskTitle = document.createElement('div');
                            taskTitle.classList.add('taskTitle');
                            taskTitle.textContent = todo.task;
                            taskTitle.addEventListener(('click'), (e) => {
                                if (!e.target.classList.contains('dontOpen')) {
                                    // close all others…
                                    e.target.style.cursor = "text";
                                    e.target.contentEditable = 'true';
                                    e.target.parentNode.parentNode.querySelector('.taskDetails').style.display = 'block';
                                    e.target.parentNode.parentNode.querySelector('.taskButtons').style.display = 'block';

                                }
                            });
                            taskTitleAndControls.appendChild(taskTitle);
                        const taskButtons = document.createElement('div');
                            taskButtons.classList.add('taskButtons');
                            const taskDelete = document.createElement('div');
                                taskDelete.textContent = "🗑";
                                taskDelete.classList.add('taskDelete')
                                taskDelete.addEventListener(('click'), () => {
                                    toDo.delete(todo);
                                    domLogic.clearDOM();
                                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                                })
                                taskButtons.appendChild(taskDelete);
                            const taskSubmit = document.createElement('div');
                                taskSubmit.textContent = "🆗";
                                taskSubmit.classList.add('taskSubmit')
                                taskSubmit.addEventListener(('click'), (e) => {
                                    let dat
                                    if (e.target.parentNode.parentNode.parentNode.querySelector('.dueDate').value) {
                                        let arr = e.target.parentNode.parentNode.parentNode.querySelector('.dueDate').value.split('-');
                                        dat = new Date(arr[0], arr[1]-1, arr[2]);
                                    } else {
                                        dat = todo.dueDate;
                                    }
                                    toDo.edit(todo,
                                        e.target.parentNode.parentNode.parentNode.querySelector('.taskTitle').textContent,
                                        e.target.parentNode.parentNode.parentNode.querySelector('.notes').textContent,
                                        dat,
                                        domLogic.ulToArray(e.target.parentNode.parentNode.parentNode.querySelector('.checklist')),
                                        todo.project)
                                    domLogic.clearDOM();
                                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                                })
                                taskButtons.appendChild(taskSubmit);
                            taskTitleAndControls.appendChild(taskButtons);

                        taskModule.appendChild(taskTitleAndControls);
                
                    const taskDetails = document.createElement('div');
                        taskDetails.classList.add('taskDetails')
                        taskModule.appendChild(taskDetails)

                        const notes = document.createElement('p');
                            notes.textContent = todo.notes;
                            notes.classList.add('notes')
                            notes.contentEditable = "true";
                            taskDetails.appendChild(notes);

                        const dueDate = document.createElement('input');
                            dueDate.type = 'date';
                            dueDate.setAttribute("data-date", domLogic.displayDate(Date.parse(todo.dueDate)))
                            dueDate.classList.add('dueDate')
                            dueDate.addEventListener('change', (e) => {
                                let arr = e.target.value.split('-')
                                let dat = new Date(arr[0], arr[1]-1, arr[2])
                                e.target.setAttribute("data-date", domLogic.displayDate(dat))
                            })
                        taskDetails.appendChild(dueDate)

                        const checklist = document.createElement('ul');
                            checklist.classList.add('checklist');
                            todo.checklist.forEach(element => {
                                const checklistItem = document.createElement('li');
                                checklistItem.textContent = element;
                                checklistItem.contentEditable = 'true';
                                checklist.appendChild(checklistItem)                    
                            })
                            const addChecklistItem = document.createElement('div');
                                addChecklistItem.classList.add('addChecklistItem');
                                addChecklistItem.textContent = '+';
                                addChecklistItem.classList.add('addChecklistItem');
                                addChecklistItem.addEventListener('click', () => {
                                    const checklistItem = document.createElement('li');
                                    checklistItem.textContent = '';
                                    checklistItem.contentEditable = 'true';
                                    checklist.insertBefore(checklistItem, checklist.lastChild)
                                })
                            checklist.appendChild(addChecklistItem);
                        taskDetails.appendChild(checklist)
                    taskWrapper.appendChild(taskModule);

            box.appendChild(taskWrapper);
        },
        pagePopulate: function(a) {
            const box = document.querySelector('#tasklist');
            const side = document.querySelector('#projlist')

            // main list
            const noProj = document.createElement('h2');
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

            const addProject = document.createElement('div');
                addProject.classList.add('addProject');
                addProject.textContent = '+';
                addProject.addEventListener(('click'), () => {
                    toDo.add(toDo.make('[ADD TASK]', '[ADD NOTES]', new Date(), ['[ADD CHECKLIST]'], prompt('What do you want to title your project?')))
                    domLogic.clearDOM();
                    domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
               })
                side.appendChild(addProject);
            // add project…
        }
    }
})();

export {domLogic}
