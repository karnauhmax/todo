window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".todo__form");
  const input = form.querySelector("input[type=text]");
  const textArea = document.getElementById("form-textarea");
  const todoList = document.querySelector(".todo__list");
  // const modal = document.querySelector(".modal");
  // const modalWrapper = document.querySelector(".modal__wrapper");
  const editForm = document.querySelector(".edit__form");
  console.log(editForm);
  const placeholder = `<p class="todo__placeholder">Список задач пуст ꒰ ᵕ༚ᵕ꒱</p>`;
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = input.value;
    const areaValue = textArea.value;

    if (inputValue) {
      let task = {
        title: inputValue,
        description: areaValue,
        date: new Date().toLocaleDateString(),
      };

      taskList.push(task);

      renderItem(taskList);

      form.reset();
      window.localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = editForm.querySelector("input[type=text]").value;
    console.log(inputValue);
  });

  renderItem(taskList);

  function renderItem(arr) {
    for (let task of arr) {
      console.log(task);
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
    }

    if (todoList.querySelector(".todo__placeholder")) {
      todoList.querySelector(".todo__placeholder").remove();
    }
  }

  function removeTodoItem() {
    this.closest(".todo__item").remove();
    if (todoList.childElementCount === 0) {
      todoList.innerHTML = placeholder;
    }

    const index = taskList.findIndex(
      (el) =>
        el.title ===
        this.closest(".todo__item").querySelector(".todo__title").textContent
    );
    taskList.splice(index, 1);
    window.localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  class Modal {
    constructor(modalContainer, modalOpen) {
      this.modalContainer = document.querySelector(modalContainer);
      this.modalOpen = document.querySelectorAll(modalOpen);
      this.modalClose = document.querySelectorAll("[data-modal-close]");
      this.modalWrapper = this.modalContainer.querySelector(".modal__wrapper");
    }

    renderModal() {
      const openModal = () => {
        this.modalContainer.classList.add("modal__active");
        document.body.classList.add("locked");
        console.log(this);
      };

      const closeModal = () => {
        this.modalContainer.classList.remove("modal__active");
        document.body.classList.remove("locked");
      };

      this.modalOpen.forEach((e) => {
        e.addEventListener("click", openModal);
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
