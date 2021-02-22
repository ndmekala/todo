var toDo = (function () {
    return {
        make: function (task, notes, dueDate, priority, checklist, project) {
            return {task, notes, dueDate, priority, checklist, project}
        },
        add: function(a) {
            let arr
            if (localStorage.taskArray) {
                arr = JSON.parse(localStorage.taskArray)
            } else {
                arr = [];
            }
            arr.push(a);
            localStorage.taskArray = JSON.stringify(arr);
        }
    }
})();

export { toDo }