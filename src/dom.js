import { toDo } from "./todo.js";
import { format, isFuture, isToday, isThisYear, startOfDay } from "date-fns";

var domLogic = (function () {
  return {
    clearDOM: function () {
      const box = document.querySelector("#tasklist");
      const side = document.querySelector("#projlist");
      document.querySelector("#project-wrapper").style.visibility = "hidden";
      while (box.firstChild) {
        box.removeChild(box.firstChild);
      }
      while (side.firstChild) {
        side.removeChild(side.firstChild);
      }
    },
    sortTaskArray: function (a) {
      const b = a.sort(function (first, next) {
        return first.dueDate < next.dueDate ? 1 : -1;
      });
      const c = b.sort(function (first, next) {
        return first.project.toUpperCase() > next.project.toUpperCase()
          ? 1
          : -1;
      });
      return c;
    },
    displayDate: function (d) {
      let now = new Date();
      if (isToday(d)) {
        return "Today";
      } else if (
        parseInt((d - startOfDay(now)) / (3600 * 1000 * 24)) <= 6 &&
        (d - startOfDay(now)) / (3600 * 1000 * 24) > 1
      ) {
        return format(d, "eee");
      } else if (isThisYear(d)) {
        if (isFuture(d)) {
          return format(d, "MMM d");
        } else {
          return format(d, "MMM d");
          // option to make red somehow
        }
      } else {
        if (isFuture(d)) {
          return format(d, "MMM yyyy");
        } else {
          return format(d, "MMM yyyy");
          // option to make red somehow
        }
      }
    },
    save: function (item, wrapper) {
      let dat;
      if (wrapper.querySelector(".dueDate").value) {
        let arr = wrapper.querySelector(".dueDate").value.split("-");
        dat = new Date(arr[0], arr[1] - 1, arr[2]);
      } else {
        dat = item.dueDate;
      }
      toDo.edit(
        item,
        wrapper.querySelector(".taskTitle").textContent,
        wrapper.querySelector(".notes").textContent,
        dat,
        item.project
      );
    },
    displayElement: function (todo) {
      const box = document.querySelector("#tasklist");
      // Generate task wrapper
      const taskWrapper = document.createElement("div");
      taskWrapper.classList.add("taskWrapper");
      // Generate clickable bullet point
      const taskBullet = document.createElement("div");
      taskBullet.classList.add("taskBullet");
      taskBullet.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dontCheck")) {
          e.target.parentNode.querySelector(".taskDetails").style.display =
            "none";
          e.target.parentNode.querySelector(".taskControls").style.display =
            "none";
          e.target.parentNode.classList.remove("selected");
          const checkmark = document.createElement("span");
          checkmark.classList.add("checkmark");
          checkmark.classList.add("dontCheck");
          checkmark.textContent = "✓";
          e.target.appendChild(checkmark);
          e.target.style.borderColor = "hsl(287, 27%, 90%)";
          e.target.parentNode.querySelector(".taskTitle").style.color =
            "hsl(287, 27%, 90%)";
          e.target.parentNode.querySelector(
            ".taskTitle"
          ).style.textDecorationThickness = "2px";
          e.target.parentNode.querySelector(".taskTitle").style.cursor =
            "default";
          e.target.parentNode.querySelector(".taskTitle").contentEditable =
            "false";
          e.target.parentNode
            .querySelector(".taskTitle")
            .classList.add("dontOpen");
          toDo.delete(todo);
          e.target.classList.add("dontCheck");
        }
      });
      taskWrapper.appendChild(taskBullet);

      // Generate Task Module
      const taskModule = document.createElement("div");
      taskModule.classList.add("taskModule");

      // Generate task title and controls (delete, save, change date)
      const taskTitleAndControls = document.createElement("div");
      taskTitleAndControls.classList.add("taskTitleAndControls");
      const taskTitle = document.createElement("div");
      taskTitle.classList.add("taskTitle");
      taskTitle.textContent = todo.task;
      taskTitle.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dontOpen")) {
          const everyTaskWrapper = document.querySelectorAll(".taskWrapper");
          everyTaskWrapper.forEach((el) => {
            if (e.target !== el.querySelector(".taskTitle")) {
              el.classList.remove("selected");
              el.querySelector(".taskTitle").contentEditable = "false";
              el.querySelector(".taskDetails").style.display = "none";
              el.querySelector(".taskDelete").style.display = "none";
              el.querySelector(".taskSubmit").style.display = "none";
            }
          });
          e.target.contentEditable = "true";
          e.target.parentNode.parentNode.querySelector(
            ".taskDetails"
          ).style.display = "block";
          e.target.parentNode.parentNode.querySelector(
            ".taskDelete"
          ).style.display = "inline-block"; // Here
          e.target.parentNode.parentNode.querySelector(
            ".taskSubmit"
          ).style.display = "inline-block"; // Here
          e.target.parentNode.parentNode.parentNode.classList.add("selected");
        }
      });
      taskTitleAndControls.appendChild(taskTitle);
      const taskControls = document.createElement("div");
      taskControls.classList.add("taskControls");
      const taskDelete = document.createElement("div");
      taskDelete.innerHTML =
        "<img src='./assets/trash-svgrepo-com.svg' width='20px' height='20px'>";
      taskDelete.classList.add("taskDelete");
      taskDelete.addEventListener("click", () => {
        toDo.delete(todo);
        domLogic.clearDOM();
        domLogic.pagePopulate(
          domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
        );
      });
      taskControls.appendChild(taskDelete);
      const taskSubmit = document.createElement("div");
      taskSubmit.innerHTML =
        "<img src='./assets/save-svgrepo-com.svg' width='20px' height='20px'>";
      taskSubmit.classList.add("taskSubmit");
      taskSubmit.addEventListener("click", (e) => {
        domLogic.save(
          todo,
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
        );
        domLogic.clearDOM();
        domLogic.pagePopulate(
          domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
        );
      });
      taskControls.appendChild(taskSubmit);
      taskTitleAndControls.appendChild(taskControls);
      const taskDate = document.createElement("div");
      taskDate.classList.add("taskDate");
      const dueDate = document.createElement("input");
      dueDate.type = "date";
      dueDate.setAttribute(
        "data-date",
        domLogic.displayDate(Date.parse(todo.dueDate))
      );
      dueDate.classList.add("dueDate");
      dueDate.addEventListener("change", (e) => {
        let arr = e.target.value.split("-");
        let dat = new Date(arr[0], arr[1] - 1, arr[2]);
        e.target.setAttribute("data-date", domLogic.displayDate(dat));
        domLogic.save(
          todo,
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
        );
        domLogic.clearDOM();
        domLogic.pagePopulate(
          domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
        );
      });
      taskDate.appendChild(dueDate);
      taskControls.appendChild(taskDate);

      taskModule.appendChild(taskTitleAndControls);
      
      // Generate Task Details (that display when selected)
      const taskDetails = document.createElement("div");
      taskDetails.classList.add("taskDetails");
      taskModule.appendChild(taskDetails);

      // Generate task notes
      const notes = document.createElement("p");
      notes.textContent = todo.notes;
      notes.classList.add("notes");
      notes.contentEditable = "true";
      taskDetails.appendChild(notes);
      taskWrapper.appendChild(taskModule);

      box.appendChild(taskWrapper);
    },
    createProject: function () {
      if (document.querySelector("#project-text").value) {
        toDo.add(
          toDo.make(
            "(new todo)",
            "notes",
            new Date(),
            document.querySelector("#project-text").value
          )
        );
      }
    },
    addPopupListeners: function () {
      const projectForm = document.querySelector("#project-form");
      projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        domLogic.createProject();
        domLogic.clearDOM();
        domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
      });
      document
        .querySelector(".project-cancel")
        .addEventListener("click", () => {
          document.querySelector("#project-wrapper").style.visibility =
            "hidden";
        });
    },
    pagePopulate: function (a, project) {
      const box = document.querySelector("#tasklist");
      const side = document.querySelector("#projlist");
      let projectArray = toDo.buildProjectArray(a);
      // List todos from all projects if nothing specified
      if (project === undefined) {
        // Display Todos
        const projectlessToDos = a.filter((e) => e.project === "");
        projectlessToDos.forEach((todo) => domLogic.displayElement(todo));
        // Generate a button for adding todos
        const addProjectlessToDo = document.createElement("div");
        addProjectlessToDo.classList.add("addToDo");
        addProjectlessToDo.textContent = "+";
        addProjectlessToDo.addEventListener("click", (event) => {
          toDo.add(toDo.make("(new todo)", "(notes)", new Date(), ""));
          domLogic.clearDOM();
          domLogic.pagePopulate(
            domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
          );
        });
        box.appendChild(addProjectlessToDo);
        
        // display todos with projects
        projectArray.forEach((element) => {
          const proj = document.createElement("h2");
          proj.textContent = element;
          box.appendChild(proj);
          const projToDos = a.filter((e) => e.project === element);
          projToDos.forEach((todo) => domLogic.displayElement(todo));
          // create a button that adds tasks to a project
          const addTask = document.createElement("div");
          addTask.textContent = "+";
          addTask.classList.add("addToDo");
          addTask.addEventListener("click", (event) => {
            toDo.add(toDo.make("(new todo)", "(notes)", new Date(), element));
            domLogic.clearDOM();
            domLogic.pagePopulate(
              domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
            );
          });
          box.appendChild(addTask);
        });
      } else {
        // list todos from given project if specified
        const proj = document.createElement("h2");
        proj.textContent = project;
        box.appendChild(proj);
        const projToDos = a.filter((e) => e.project === project);
        projToDos.forEach((todo) => domLogic.displayElement(todo));
        // generate a button for adding todos to project
        const addTask = document.createElement("div");
        addTask.textContent = "+";
        addTask.classList.add("addToDo");
        addTask.addEventListener("click", (event) => {
          toDo.add(toDo.make("(new todo)", "(notes)", new Date(), project));
          domLogic.clearDOM();
          domLogic.pagePopulate(
            domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
          );
        });
        box.appendChild(addTask);
        // generate a button that loads all projects
        const viewAll = document.createElement("button");
        viewAll.textContent = "View All Projects";
        viewAll.addEventListener("click", () => {
          domLogic.clearDOM();
          domLogic.pagePopulate(JSON.parse(localStorage.taskArray));
        });
        box.appendChild(viewAll);
      }
      // generate a button that adds project
      const addProjectButton = document.createElement("button");
      addProjectButton.textContent = "Add Project";
      addProjectButton.addEventListener("click", () => {
        document.querySelector("#project-wrapper").style.visibility = "visible";
      });
      box.appendChild(addProjectButton);
      // generate a button that exports to things 3
      const exportToThings = document.createElement('button');
      exportToThings.textContent = 'Export to Things 3';
      exportToThings.addEventListener('click', () => {
        let json = toDo.convertToThingsJSON(JSON.parse(localStorage.taskArray));
        window.location.href=toDo.thingsJSONtoURL(json);
      })
      box.appendChild(exportToThings);
      // generate repository link
      const repositoryLink = document.createElement('button');
      repositoryLink.textContent = 'Repository';
      repositoryLink.addEventListener('click', () => {
        window.location.href='https://www.github.com/ndmekala/todo';
      })
      box.appendChild(repositoryLink);

      // generate portfolio link
      const portfolioLink = document.createElement('button');
      portfolioLink.textContent = 'Portfolio';
      portfolioLink.addEventListener('click', () => {
        window.location.href='https://www.meka.la/';
      })
      box.appendChild(portfolioLink);

      // generate sidebar content (project list)
      projectArray.forEach((element) => {
        const sideBarProj = document.createElement("h4");
        sideBarProj.textContent = element;
        sideBarProj.style.cursor = "pointer";
        sideBarProj.addEventListener("click", () => {
          domLogic.clearDOM();
          domLogic.pagePopulate(
            domLogic.sortTaskArray(JSON.parse(localStorage.taskArray)),
            element
          );
        });
        side.appendChild(sideBarProj);
      });
      // generate button for adding projects
      const addProject = document.createElement("div");
      addProject.classList.add("addProject");
      addProject.textContent = "+";
      addProject.addEventListener("click", () => {
        document.querySelector("#project-wrapper").style.visibility = "visible";
      });
      side.appendChild(addProject);
    },
  };
})();

export { domLogic };
