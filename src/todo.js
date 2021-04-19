import { format } from 'date-fns';
var toDo = (function () {
  return {
    make: function (task, notes, dueDate, project) {
      return { task, notes, dueDate, project };
    },
    add: function (a) {
      let arr;
      if (localStorage.taskArray) {
        arr = JSON.parse(localStorage.taskArray);
      } else {
        arr = [];
      }
      arr.push(a);
      localStorage.taskArray = JSON.stringify(arr);
    },
    delete: function (obj) {
      let arr = JSON.parse(localStorage.taskArray);
      let pos = arr.findIndex(
        (x) =>
          x.task === obj.task &&
          x.notes === obj.notes &&
          x.dueDate === obj.dueDate &&
          x.project === obj.project
      );
      arr.splice(pos, 1);
      localStorage.taskArray = JSON.stringify(arr);
    },
    edit: function (obj, t, n, d, pro) {
      let arr = JSON.parse(localStorage.taskArray);
      let pos = arr.findIndex(
        (x) =>
          x.task === obj.task &&
          x.notes === obj.notes &&
          x.dueDate === obj.dueDate &&
          x.project === obj.project
      );
      arr[pos].task = t;
      arr[pos].notes = n;
      arr[pos].dueDate = d;
      arr[pos].project = pro;
      localStorage.taskArray = JSON.stringify(arr);
    },
    taskObjectToThingsObject: function(obj) {
      let thingsObject = {
        'type': 'to-do',
        'attributes': {
          'title': obj.task,
          'notes': obj.notes,
          'when': obj.dueDate,
        }
      }
      return thingsObject
    },
    convertToThingsJSON: function(a) {
      let b = []
      const projectLessToDos = a.filter((e) => e.project === '');
      projectLessToDos.forEach((todo) => {
        b.push(toDo.taskObjectToThingsObject(todo))
      })
      let projArray = toDo.buildProjectArray(a);
      projArray.forEach((element) => {
        let projectToDos = a.filter((e) => e.project === element)
        let projectToDosThings = []
        projectToDos.forEach((todo) => {
          projectToDosThings.push(toDo.taskObjectToThingsObject(todo))
        });
        let projectObj = {
          'type': 'project',
          'attributes': {
            'title': element,
            'items': projectToDosThings,
          }
        }
        b.push(projectObj)
      })
      console.table(b);
      return JSON.stringify(b);
    },
    thingsJSONtoURL: function(json) {
      return 'things:///json?data=' + encodeURI(json); 
    },
    buildProjectArray: function (a) {
      let b = [];
      a.forEach((element) => {
        if (!b.includes(element.project) && element.project !== "") {
          b.push(element.project);
        }
      });
      const projectArray = b.sort(function (first, next) {
        return first.toUpperCase() > next.toUpperCase() ? 1 : -1;
      });
      return projectArray;
    },
  };
})();

export { toDo };
