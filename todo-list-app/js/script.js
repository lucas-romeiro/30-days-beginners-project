"use strict";

class App {
  _parentElement = document.querySelector(".todo-app__list");
  _form = document.querySelector(".todo-app__form");
  _errorMessage = document.querySelector(".error-message");

  constructor() {
    this._tasks = this._loadData(); // Carregar as tarefas salvas
    this._render(); // Renderizar todas as tarefas no carregamento
    this._parentElement.addEventListener(
      "click",
      this._handleTaskClick.bind(this)
    );
    this._form.addEventListener("submit", this._addTask.bind(this));
  }

  // Exibe mensagem de erro
  _displayError(message) {
    this._errorMessage.innerText = message;
    this._errorMessage.classList.remove("hidden");

    setTimeout(() => {
      this._errorMessage.classList.add("hidden");
    }, 2000);
  }

  // Renderiza as tarefas no DOM
  _render(task = null) {
    if (task) {
      // Se foi passada uma tarefa, renderiza apenas essa tarefa
      this._parentElement.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(task)
      );
    } else {
      // Caso contrário, renderiza todas as tarefas de uma vez
      this._parentElement.innerHTML = ""; // Limpa a lista antes de renderizar
      this._tasks.forEach((task) => {
        this._parentElement.insertAdjacentHTML(
          "beforeend",
          this._generateMarkup(task)
        );
      });
    }
  }

  // Gera o HTML de cada tarefa
  _generateMarkup(task) {
    return `
      <li class="todo-app__task ${task.completed ? "checked" : ""}">
        ${task.text}
        <button class="btn--delete">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </li>
    `;
  }

  // Manipula os cliques na lista de tarefas
  _handleTaskClick(e) {
    const taskElement = e.target.closest(".todo-app__task");
    if (!taskElement) return;

    // Marca a tarefa como completa/incompleta
    if (e.target.closest(".todo-app__task")) {
      const taskIndex = Array.from(this._parentElement.children).indexOf(
        taskElement
      );
      this._tasks[taskIndex].completed = !this._tasks[taskIndex].completed;
      taskElement.classList.toggle("checked");
      this._saveData(); // Atualiza o localStorage
    }

    // Exclui a tarefa
    if (e.target.closest(".btn--delete")) {
      const taskIndex = Array.from(this._parentElement.children).indexOf(
        taskElement
      );
      this._tasks.splice(taskIndex, 1); // Remove a tarefa do array
      taskElement.remove(); // Remove a tarefa do DOM
      this._saveData(); // Atualiza o localStorage
    }
  }

  // Adiciona uma nova tarefa
  _addTask(e) {
    e.preventDefault();
    const text = this._form.querySelector(".todo-app__input").value.trim();

    if (!text) {
      this._displayError("Você deve digitar alguma coisa!");
      return;
    }

    const newTask = { text, completed: false };
    this._tasks.push(newTask);
    this._render(newTask); // Renderiza a nova tarefa
    this._form.querySelector(".todo-app__input").value = "";
    this._saveData(); // Atualiza o localStorage
  }

  // Salva as tarefas no localStorage
  _saveData() {
    localStorage.setItem("tasks", JSON.stringify(this._tasks));
  }

  // Carrega as tarefas do localStorage
  _loadData() {
    const savedData = localStorage.getItem("tasks");
    return savedData ? JSON.parse(savedData) : [];
  }
}

const app = new App();
