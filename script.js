window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".todo__form");
  const textArea = document.getElementById("form-textarea");
  const todoList = document.querySelector(".todo__list");
  const editForm = document.querySelector(".edit__form");
  const placeholder = `<p class="todo__placeholder">Список задач пуст ꒰ ᵕ༚ᵕ꒱</p>`;
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  function renderItem(task) {
    const item = `
      <div class="todo__item">
        <div class="todo__item-head">
          <a href="#" class="todo__title">${task.title}</a>
            <div class="todo__item-btns">
                <button class="btn todo__btn edit-btn" data-edit></button>
                <button class="btn todo__btn" data-remove>X</button>
            </div>
          </div>
          <div class="todo__item-body">
            <p class="todo__descr">
              ${task.description}
            </p>
              <p class="todo__date"> ${task.date} </p>
            </div>
        </div>
      `;

    todoList.innerHTML += item;

    if (todoList.querySelector(".todo__placeholder")) {
      todoList.querySelector(".todo__placeholder").remove();
    }
  }

  (function initSingleTask() {
    for (task of taskList) {
      renderItem(task);
    }
  })();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".form__input");
    const inputValue = input.value;
    const area = document.getElementById("form-textarea");
    const areaValue = area.value;

    if (inputValue) {
      let task = {
        id: Date.now(),
        title: inputValue,
        description: areaValue,
        date: new Date().toLocaleDateString(),
      };

      taskList.push(task);
      renderItem(task);

      form.reset();
      window.localStorage.setItem("taskList", JSON.stringify(taskList));
      input.classList.remove("error__input");
    } else {
      input.classList.add("error__input");
    }
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = editForm.querySelector("input[type=text]");
    const inputValue = input.value;
    const area = document.getElementById("edit-textarea");
    const areaValue = area.value;
    if ((inputValue, areaValue)) {
      saveTask(inputValue, areaValue);
    }
  });

  function saveTask(title, description) {
    const item = document.querySelector(".todo__item");
    task = {
      id: Date.now(),
      title,
      description,
      date: new Date().toLocaleDateString(),
    };

    renderItem(task);
    taskList.push(task);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  function removeTodoItem() {
    this.closest(".todo__item").remove();
    if (todoList.childElementCount === 0) {
      todoList.innerHTML = placeholder;
    }

    const index = taskList.findIndex(
      (task) => task.id === +this.closest(".todo__item").dataset.id
    );
    taskList.splice(index, 1);
    window.localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  class Modal {
    constructor(modalContainer, modalOpen) {
      this.modalContainer = document.querySelector(modalContainer);
      this.modalOpen = modalOpen;
      this.modalClose = document.querySelectorAll("[data-modal-close]");
      this.globalContainer = document.querySelector(".todo__list");
      this.modalWrapper = this.modalContainer.querySelector(".modal__wrapper");
    }

    renderModal() {
      const openModal = () => {
        this.modalContainer.classList.add("modal__active");
        document.body.classList.add("locked");
      };

      const closeModal = () => {
        this.modalContainer.classList.remove("modal__active");
        document.body.classList.remove("locked");
      };

      this.globalContainer.addEventListener("click", (e) => {
        const target = e.target;

        if (target.closest(this.modalOpen)) {
          openModal();
        }
      });

      this.modalClose.forEach((e) => {
        e.addEventListener("click", closeModal);
      });

      this.modalContainer.addEventListener("click", (e) => {
        if (e.target == this.modalWrapper) {
          closeModal();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
          closeModal();
        }
      });
    }
  }

  new Modal(".edit-modal", "[data-edit]").renderModal();

  todoList.addEventListener("click", (e) => {
    if (e.target.closest("[data-remove]")) {
      removeTodoItem.call(e.target);
    }
  });

  if (todoList.childElementCount === 0) {
    todoList.innerHTML = placeholder;
  }
});
