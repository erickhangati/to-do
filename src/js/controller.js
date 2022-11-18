import view from "./view";
import * as model from "./model";

import "core-js";
import "regenerator-runtime/runtime";

const controlTodoSubmision = function (data) {
  // Creating task object
  const task = model.createTaskObject(data);

  // Adding task to state
  model.state.tasks.push(task);

  // Update items left
  model.updateItemsLeft();

  // Persist to local storage
  model.persistLocal();

  // Render tasks
  view.renderTodo(model.state);
};

const controlMarkComplete = function (description) {
  // Pass description to function to mark complete
  model.markComplete(description);

  // Persist to local storage
  model.persistLocal();

  // Render items left
  view.renderItemsLeft(model.state.itemsLeft);
};

const controlItemDelete = function (description) {
  // Pass description to function to delete
  model.deleteItem(description);

  // Persist to local storage
  model.persistLocal();

  // Update items left
  model.updateItemsLeft();

  // Render tasks
  view.renderTodo(model.state);

  // Render items left
  view.renderItemsLeft(model.state.itemsLeft);
};

const controlDeleteAllCompleted = function () {
  // Call Delete function from model
  model.deleteAllCompleted();

  // Update items left
  model.updateItemsLeft();

  // Persist to local storage
  model.persistLocal();

  // Render tasks
  view.renderTodo(model.state);

  // Render items left
  view.renderItemsLeft(model.state.itemsLeft);
};

const controlAll = function () {
  // Render all tasks
  view.renderTodo(model.state);
};

const controlActive = function () {
  // Get active tasks
  const activeTasks = model.getActive();

  // Render active
  view.renderFilter(activeTasks);
};

const controlComplete = function () {
  // Get active tasks
  const completeTasks = model.getComplete();

  // Render active
  view.renderFilter(completeTasks);
};

const init = function () {
  // Render todos on page load
  view.renderTodo(model.state);

  // Render items left
  view.renderItemsLeft(model.state.itemsLeft);

  // Listen for dark theme switch
  view.switchTheme();

  // Listen to todo form submission
  view.addHandlerSubmit(controlTodoSubmision);

  // Listen to drag and drop
  view.dragItems();

  // Listen for todo list mark complete
  view.addHandlerMarkComplete(controlMarkComplete);

  // Listen to all link
  view.addHandlerAll(controlAll);

  // Listen to active link
  view.addHandlerActive(controlActive);

  // Listen to completed link
  view.addHandlerComplete(controlComplete);

  // Listening to todo item delete
  view.addHandlerDeleteItem(controlItemDelete);

  // Listen to all complete items delete
  view.addHandlerAllCompleteDelete(controlDeleteAllCompleted);
};

init();
