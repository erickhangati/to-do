export let state = {
  tasks: [],
  itemsLeft: 0,
  page: "all",
};

export const persistLocal = function () {
  // Save data to local storage
  localStorage.setItem("todos", JSON.stringify(state));
};

export const createTaskObject = function (task) {
  return {
    description: task,
    status: "active",
  };
};

export const updateItemsLeft = function () {
  // Reset items left for recounting
  state.itemsLeft = 0;

  // Count active tasks and update.
  state.tasks.forEach((task) => {
    if (task.status === "active") state.itemsLeft += 1;
  });
};

export const markComplete = function (description) {
  // Loop the tasks and match task to mark complete
  state.tasks.forEach((task) => {
    if (task.description === description && task.status === "active") {
      // Mark status completed
      task.status = "completed";

      // Update the itemsLeft
      updateItemsLeft();
    }
  });
};

export const getActive = function () {
  return state.tasks.filter((task) => task.status === "active");
};

export const getComplete = function () {
  return state.tasks.filter((task) => task.status === "completed");
};

export const deleteItem = function (description) {
  state.tasks.forEach((item, index) => {
    if (item.description === description) {
      state.tasks.splice(index, 1);
    }

    // Update items left
    updateItemsLeft();
  });
};

export const deleteAllCompleted = function () {
  // Get not complete tasks
  const notComplete = state.tasks.filter((task) => task.status === "active");

  // Reassign the filtered tasks
  state.tasks = notComplete;
};

const init = function () {
  // Get tasks from local storage.
  const tasks = JSON.parse(localStorage.getItem("todos"));

  // Restore tasks.
  if (tasks) state = tasks;
};

init();
