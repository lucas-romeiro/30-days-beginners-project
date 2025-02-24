"use strict";

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Ozone", correct: false },
      { text: "Oganesson", correct: false },
    ],
  },
  {
    question: "What is the largest continent by area?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "North America", correct: false },
      { text: "Europe", correct: false },
    ],
  },
];

class App {
  _questionTitle = document.getElementById("quiz-question");
  _answerButtons = document.querySelector(".quiz__answers");
  _btnNext = document.querySelector(".btn--next");
  _btnPlayAgain = document.querySelector(".btn--play-again");

  _currentQuestionIndex;
  _score;

  constructor() {
    this._startQuiz();

    // Event Listener para o botão "Próximo"
    this._btnNext.addEventListener("click", () => this._handleNext());

    // Event Listener para o botão "Play Again"
    this._btnPlayAgain.addEventListener("click", () => this._startQuiz());
  }

  _handleNext() {
    if (this._currentQuestionIndex < questions.length - 1) {
      this._nextQuestion();
    } else {
      this._endQuiz();
    }
  }

  _startQuiz() {
    this._score = 0;
    this._currentQuestionIndex = 0;
    this._btnNext.style.display = "none"; // Oculta o botão "Próximo"
    this._btnPlayAgain.style.display = "none"; // Oculta o botão "Play Again"
    this._showQuestion();
  }

  _showQuestion() {
    this._resetState();
    const currentQuestion = questions[this._currentQuestionIndex];
    this._questionTitle.textContent = `${this._currentQuestionIndex + 1}. ${
      currentQuestion.question
    }`;

    currentQuestion.answers.forEach((answer, index) => {
      const button = this._createAnswerButton(answer, index);
      this._answerButtons.appendChild(button);
    });
  }

  _createAnswerButton(answer, index) {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.ariaLabel = `Answer ${index + 1}: ${answer.text}`;
    button.ariaSelected = false;
    button.role = "option";

    button.addEventListener("click", () =>
      this._selectAnswer(button, answer.correct)
    );

    return button;
  }

  _resetState() {
    this._btnNext.style.display = "none";
    while (this._answerButtons.firstChild) {
      this._answerButtons.removeChild(this._answerButtons.firstChild);
    }
  }

  _selectAnswer(button, isCorrect) {
    if (isCorrect) {
      button.classList.add("correct");
      this._score++;
    } else {
      button.classList.add("incorrect");
    }

    button.ariaSelected = true;

    // Desabilita todos os botões após a seleção de uma resposta
    Array.from(this._answerButtons.children).forEach((btn) => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }

      btn.disabled = true;
    });

    // Exibe o botão "Próximo" após uma resposta ser selecionada
    this._btnNext.style.display = "block";
  }

  _nextQuestion() {
    this._currentQuestionIndex++;
    this._showQuestion();
  }

  _endQuiz() {
    this._questionTitle.innerText = `Quiz closed!\nYour score was ${
      this._score * 2
    }, you got ${this._score} out of ${questions.length} questions right!`;
    this._answerButtons.innerHTML = ""; // Limpa as opções de resposta
    this._btnNext.style.display = "none"; // Oculta o botão "Próximo"
    this._btnPlayAgain.style.display = "block"; // Exibe o botão "Play Again"
  }
}

const app = new App();
