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
    // “You should separate your application logic (i.e. creating new todos, setting todos
    // as complete, changing todo priority etc.) from the DOM -related stuff
    // so keep all of those things in sepearate modules”
    // Heheh 😅
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
                // build this without .innerHTML… use appendChild or something
                // will need this for the nuanced styling each to-do will need…
                for (let key in currentValue) {
                    // and may need to do this without “in” because different keys
                    // have different needs
                    box.innerHTML += key + ': ' + currentValue[key] + '<br>';
                }
                box.innerHTML += '<br>'
            }
            let projectArray = domLogic.buildProjectArray(a);
            projectArray.forEach(element => {
                box.innerHTML += `<h2>${element}</h2><br>`
                const subset = a.filter(e => e.project === element)
                subset.forEach(todo => displayElement(todo))
            })



            // make sub-arrays for each different project with sort or filter or something
            // a.forEach(element => displayElement(element))
        }
    }
})();

export {domLogic}