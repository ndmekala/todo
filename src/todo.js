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
  };
})();

export { toDo };
