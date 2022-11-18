import { deleteItem } from "./model";

class View {
  _app = document.querySelector(".app");
  _switchThemeIcon = document.querySelector(".header__icon");
  _todoForm = document.querySelector(".input-form");
  _todoInput = document.querySelector(".input-form__input");
  _todo = document.querySelector(".todo");
  _footerItemsLeft = document.querySelector(".footer-item--left");
  _footerItemsCompleted = document.querySelector(".footer-item--completed");
  _footerItemsAll = document.querySelectorAll(".footer-options__item--all");
  _footerItemsActive = document.querySelectorAll(
    ".footer-options__item--active"
  );
  _footerItemsComplete = document.querySelectorAll(
    ".footer-options__item--completed"
  );
  _footerText = document.querySelector(".footer-text");

  switchTheme() {
    const switchTheme = function () {
      // Change dark theme mode
      document.body.classList.toggle("dark-theme");

      // Get icon path
      const iconPath = this._switchThemeIcon.src;

      // Change theme to dark mode and background image
      if (iconPath.includes("moon")) {
        this._switchThemeIcon.src = require("/src/images/icon-sun.svg");
        this._app.style.background = `url(${require("/src/images/bg-desktop-dark.jpg")}), var(--very-light-gray)`;
        this._app.style.backgroundRepeat = "no-repeat";
      }

      // Change theme to light mode and background image
      if (iconPath.includes("sun")) {
        this._switchThemeIcon.src = require("/src/images/icon-moon.svg");
        this._app.style.background = `url(${require("/src/images/bg-desktop-light.jpg")}), var(--very-light-gray)`;
        this._app.style.backgroundRepeat = "no-repeat";
      }
    };

    this._switchThemeIcon.addEventListener("click", switchTheme.bind(this));
  }

  addHandlerSubmit(handler) {
    // Focus on input
    this._todoInput.focus();

    // Listen to todo form submission
    const formSubmission = function (e) {
      e.preventDefault();

      // Pass data to handler function
      handler(this._todoInput.value);
    };

    this._todoForm.addEventListener("submit", formSubmission.bind(this));
  }

  renderItemsLeft(numitems) {
    this._footerItemsLeft.innerHTML = `${numitems} ${
      numitems === 1 ? "Item" : "Items"
    } Left`;
  }

  _generateMarkup(tasks) {
    let html;

    if (tasks.length == 0) {
      // Generate markup for no list
      html = `
      <div class="todo__empty">
       Sorry, there are no tasks for now.
      </div>
     `;

      // Hide footer text
      this._footerText.classList.add("hidden");
    } else {
      // Generate markup from todo list if exists
      html = tasks
        .map((task) => {
          return `
      <div class="todo-item">
        <div class="todo-item__icon ${
          task.status === "completed" ? "mark-complete" : ""
        }"></div>
        <div class="todo-item__description ${
          task.status === "completed" ? "description-complete" : ""
        }">${task.description}</div>
        <div class="todo-item__delete"></div>
      </div>
      `;
        })
        .join("");

      // Show footer text
      if (tasks.length > 1) this._footerText.classList.remove("hidden");
    }

    return html;
  }

  renderTodo(data) {
    // Get data
    const { tasks } = data;
    const { itemsLeft } = data;

    // Clear todo container
    this._todo.innerHTML = "";

    const html = this._generateMarkup(tasks);

    // Insert the html to page
    this._todo.insertAdjacentHTML("afterbegin", html);

    // Clear input
    this._todoInput.value = "";

    // Update Items lefts
    this.renderItemsLeft(itemsLeft);
  }

  dragItems() {
    new Sortable(this._todo, {
      animation: 350,
    });
  }

  addHandlerMarkComplete(handler) {
    this._todo.addEventListener("click", function (e) {
      // Get target icon
      const icon = e.target.closest(".todo-item__icon");

      if (!icon) return;

      // Get task description
      const description = icon.nextElementSibling;

      // Cross the task description as marked
      description.classList.add("description-complete");

      // Pass description text to handler
      const descriptionText = description.textContent;
      handler(descriptionText);

      // Display complete icon
      icon.classList.add("mark-complete");
    });
  }

  _clearOptionHighlights() {
    // Clear all link
    this._footerItemsAll.forEach((link) =>
      link.classList.remove("all-selected")
    );

    // Clear active link
    this._footerItemsActive.forEach((link) =>
      link.classList.remove("active-selected")
    );

    // Clear completed link
    this._footerItemsComplete.forEach((link) =>
      link.classList.remove("complete-selected")
    );
  }

  renderFilter(tasks) {
    // Clear todo container
    this._todo.innerHTML = "";

    // Generate markup for active tasks
    const html = this._generateMarkup(tasks);

    // Insert the html to page
    this._todo.insertAdjacentHTML("afterbegin", html);
  }

  addHandlerActive(handler) {
    this._footerItemsActive.forEach((link) => {
      // Listen to active link click
      const activeLink = function () {
        // Remove option highlights
        this._clearOptionHighlights();

        // Add highlight to active link
        this._footerItemsActive.forEach((link) =>
          link.classList.add("active-selected")
        );

        // Call handler function
        handler();
      };

      link.addEventListener("click", activeLink.bind(this));
    });
  }

  addHandlerAll(handler) {
    this._footerItemsAll.forEach((link) => {
      // Listen to all link click
      const allLink = function () {
        // Remove option highlights
        this._clearOptionHighlights();

        // Add highlight to active link
        this._footerItemsAll.forEach((link) =>
          link.classList.add("all-selected")
        );

        // Call handler function
        handler();
      };

      link.addEventListener("click", allLink.bind(this));
    });
  }

  addHandlerComplete(handler) {
    this._footerItemsComplete.forEach((link) => {
      // Listen to active link click
      const completeLink = function () {
        // Remove option highlights
        this._clearOptionHighlights();

        // Add highlight to active link
        this._footerItemsComplete.forEach((link) =>
          link.classList.add("complete-selected")
        );

        // Call handler function
        handler();
      };
      link.addEventListener("click", completeLink.bind(this));
    });
  }

  addHandlerDeleteItem(handler) {
    const deleteItem = function (e) {
      // Get target icon
      const icon = e.target.closest(".todo-item__delete");

      if (!icon) return;

      // Remove option highlights
      this._clearOptionHighlights();

      // Add highlight to active link
      this._footerItemsAll.forEach((link) =>
        link.classList.add("all-selected")
      );

      // Get task description
      const description = icon.previousElementSibling;

      // Pass description text to handler
      const descriptionText = description.textContent;

      handler(descriptionText);
    };

    this._todo.addEventListener("click", deleteItem.bind(this));
  }

  addHandlerAllCompleteDelete(handler) {
    const footerClearComplete = function () {
      // Remove option highlights
      this._clearOptionHighlights();

      // Add highlight to active link
      this._footerItemsAll.forEach((link) =>
        link.classList.add("all-selected")
      );

      // Call handler function
      handler();
    };

    this._footerItemsCompleted.addEventListener(
      "click",
      footerClearComplete.bind(this)
    );
  }
}

export default new View();
