import { toDo } from "./todo.js";
import { domLogic } from "./dom.js";

domLogic.addPopupListeners();

if (localStorage.taskArray) {
  domLogic.pagePopulate(
    domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
  );
} else {
  toDo.add(
    toDo.make(
      "Open this task by clicking on it.",
      "See the notes and controls? Now you can check it off by clicking its bullet.",
      new Date(),
      "Get Oriented"
    )
  );
  toDo.add(
    toDo.make(
      "Edit this todo by clicking on its notes.",
      "Click on this text to edit it. Then click the save icon to store everything.",
      new Date(),
      "Get Oriented"
    )
  );
  toDo.add(
    toDo.make(
      "Create a new todo with the plus buttons.",
      "It’s pretty straightforward!",
      new Date(),
      "Get Oriented"
    )
  );
  domLogic.pagePopulate(
    domLogic.sortTaskArray(JSON.parse(localStorage.taskArray))
  );
}
