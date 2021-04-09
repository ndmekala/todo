import { toDo } from './todo.js'
import { format, isFuture, isToday, isThisYear, startOfDay } from 'date-fns'

var domLogic = (function () {
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
            } else if (parseInt((d-startOfDay(now))/(3600*1000*24)) <= 6 && (d-startOfDay(now))/(3600*1000*24) > 1) {
                return format(d, 'eee')
            } else if (isThisYear(d)) {
                if (isFuture(d)) {
                    return format(d, 'MMM d')
                } else {
                    return format(d, 'MMM d')
                    // option to make red somehow
                }
            } else {
                if (isFuture(d)) {
                    return format(d, 'MMM yyyy')
                } else {
                    return format(d, 'MMM yyyy')
                    // option to make red somehow
                }
            };
        },
        displayElement: function (todo) {
            const box = document.querySelector('#tasklist');
            const taskWrapper = document.createElement('div');
                taskWrapper.classList.add('taskWrapper')

                const taskBullet = document.createElement('div');
                    taskBullet.classList.add('taskBullet');
                    taskBullet.addEventListener(('click'), (e) => {
                        
                        if (!e.target.classList.contains('dontCheck')) {
                            // close taskDetails and buttons, remove selected class
                            e.target.parentNode.querySelector('.taskDetails').style.display = 'none';
                            e.target.parentNode.querySelector('.taskButtons').style.display = 'none';
                            e.target.parentNode.classList.remove('selected')
                            
                            // define and add ✓
                            const checkmark = document.createElement('span');
                            checkmark.classList.add('checkmark');
                            // (pre-lock checkmark itself)
                            checkmark.classList.add('dontCheck');
                            checkmark.textContent = '✓';
                            e.target.appendChild(checkmark);
                            // cross out, make uneditable, and gray task title
                            e.target.style.borderColor = 'lightgray';
                            e.target.parentNode.querySelector('.taskTitle').style.color = 'lightgray';
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
                                    const everyTaskWrapper = document.querySelectorAll('.taskWrapper');
                                    // only issue with this is that it won’t save something that’s open if you don’t hit OK
                                    everyTaskWrapper.forEach((el) => {
                                        if (e.target !== el.querySelector('.taskTitle')) {
                                            el.classList.remove('selected')
                                            el.querySelector('.taskTitle').contentEditable = 'false';
                                            el.querySelector('.taskDetails').style.display = 'none';
                                            el.querySelector('.taskDelete').style.display = 'none'; 
                                            el.querySelector('.taskSubmit').style.display = 'none'; 
                                        }
                                    });
                                    e.target.contentEditable = 'true';
                                    e.target.parentNode.parentNode.querySelector('.taskDetails').style.display = 'block';
                                    e.target.parentNode.parentNode.querySelector('.taskDelete').style.display = 'inline-block'; // Here
                                    e.target.parentNode.parentNode.querySelector('.taskSubmit').style.display = 'inline-block'; // Here
                                    e.target.parentNode.parentNode.parentNode.classList.add('selected');
                                }
                            });
                            taskTitleAndControls.appendChild(taskTitle);
                        const taskControls = document.createElement('div');
                            taskControls.classList.add('taskControls');
                            const taskDelete = document.createElement('div');
                                taskDelete.innerHTML = "<img src='../assets/trash-svgrepo-com.svg' width='20px' height='20px'>";
                                taskDelete.classList.add('taskDelete')
                                taskDelete.addEventListener(('click'), () => {
                                    toDo.delete(todo);
                                    domLogic.clearDOM();
                                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                                })
                                taskControls.appendChild(taskDelete);
                            const taskSubmit = document.createElement('div');
                                taskSubmit.innerHTML = "<img src='../assets/save-svgrepo-com.svg' width='20px' height='20px'>";
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
                                        todo.project)
                                    domLogic.clearDOM();
                                    domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                                })
                                taskControls.appendChild(taskSubmit);
                            taskTitleAndControls.appendChild(taskControls);
                            const taskDate = document.createElement('div');
                                taskDate.classList.add('taskDate');
                                const dueDate = document.createElement('input');
                                    dueDate.type = 'date';
                                    dueDate.setAttribute("data-date", domLogic.displayDate(Date.parse(todo.dueDate)))
                                    dueDate.classList.add('dueDate')
                                    dueDate.addEventListener('change', (e) => {
                                        let arr = e.target.value.split('-')
                                        let dat = new Date(arr[0], arr[1]-1, arr[2])
                                        e.target.setAttribute("data-date", domLogic.displayDate(dat))
                                    })
                                    taskDate.appendChild(dueDate)
                                taskControls.appendChild(taskDate)

                        taskModule.appendChild(taskTitleAndControls);
                
                    const taskDetails = document.createElement('div');
                        taskDetails.classList.add('taskDetails')
                        taskModule.appendChild(taskDetails)

                        const notes = document.createElement('p');
                            notes.textContent = todo.notes;
                            notes.classList.add('notes')
                            notes.contentEditable = "true";
                            taskDetails.appendChild(notes);
                    taskWrapper.appendChild(taskModule);

            box.appendChild(taskWrapper);
        },
        pagePopulate: function(a) {
            const box = document.querySelector('#tasklist');
            const side = document.querySelector('#projlist')
            const projectlessToDos = a.filter (e => e.project === '')
                projectlessToDos.forEach(todo => domLogic.displayElement(todo))
            // plus button to add to no particular project
                const addProjectlessToDo = document.createElement('div');
                addProjectlessToDo.classList.add('addToDo');
                addProjectlessToDo.textContent = '+';
                addProjectlessToDo.addEventListener(('click'), (event) => {
                    toDo.add(toDo.make('(new todo)', '(notes)', new Date(), ''))
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
                        toDo.add(toDo.make('(new todo)', '(notes)', new Date(), element))
                        domLogic.clearDOM();
                        domLogic.pagePopulate(domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)));
                    })
                    box.appendChild(addTask)

            })

            const addProjectButton = document.createElement('button');
                addProjectButton.classList.add('addProjectButton');
                addProjectButton.textContent = 'Add Project';
                addProjectButton.addEventListener(('click'), () => {
                    toDo.add(toDo.make('(new todo)', '(notes)', new Date(), prompt('What do you want to title your project?')))
                    domLogic.clearDOM();
                    domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
                })
                box.appendChild(addProjectButton);

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
                    toDo.add(toDo.make('(new todo)', '(notes)', new Date(), prompt('What do you want to title your project?')))
                    domLogic.clearDOM();
                    domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
               })
                side.appendChild(addProject);
        }
    }
})();

export {domLogic}
