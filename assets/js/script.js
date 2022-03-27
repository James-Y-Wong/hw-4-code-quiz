var timeRemaining = document.querySelector("#time-remaining");
var screen0El = document.querySelector("#screen0");
var screen1El = document.querySelector("#screen1");
var screen2El = document.querySelector("#screen2");
var screen3El = document.querySelector("#screen3");
var screen4El = document.querySelector("#screen4");
var scoreboardBtn = document.querySelector("#scoreboard");
var startQuizBtn = document.querySelector("#start-quiz");
var submitHighscoreBtn = document.querySelector("#submit-hs");
var returnBtn = document.querySelector("#return-to-main");
var clearHighscore = document.querySelector("#clear-highscores");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#possible-answers");
var answerResult = document.querySelector("#answer-result");
var finalScore = document.querySelector("#final-score");
var scoreboardLeader = document.querySelector("#scoreboard-leader");
var timer = document.querySelector("#timer");


var hideState = "hide";

var questions = [
    {
        question: "_______ is the process of finding errors and fixing them within a program.",
        answers: ["1) Compiling", "2) Executing", "3) Debugging", "4) Scanning"],
        answer: 2
    },
    {
        question: "A loop that never ends is referred to as a(n) _______",
        answers: ["1) While loop", "2) Infinite loop", "3) Recursive loop", "4) For loop"],
        answer: 1
    },
    {
        question: "Which of the following is an assignment operator?",
        answers: ["1) =", "2) &&", "3) +", "4) %"],
        answer: 0
    },
    {
        question: "Which type has two literal values?",
        answers: ["1) String", "2) Numeric", "3) Array", "4) Boolean"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        answers: ["1) HyperText Markup Language", "2) Hit The Mother Load", "3) Hey That's My Lunch", "4) Hello To My Love"],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        answers: ["1) Combat Service Support", "2) Cascading Style Sheet", "3) Central Support System", "4) Custom Style Sheet"],
        answer: 1
    },
    {
        question: "Which of the following is a comparison operator?",
        answers: ["1) =", "2) +", "3) ===", "4) %"],
        answer: 2
    },
    {
        question: "Which of the following prints text the console?",
        answers: ["1) window.alert", "2) window.confirm", "3) window.prompt", "4) console.log"],
        answer: 3
    },
    {
        question: "What does Math.random() do?",
        answers: ["1) Creates random math problems", "2) Creates a random word problem", "3) It doesn't do anything", "4) Returns a random number between 0 and 1"],
        answer: 3
    },
    {
        question: "What does Math.floor() do?",
        answers: ["1) Returns a random number between 0 and 1", "2) Puts the math on the floor", "3) Returns the largest integer less than or equal to a number", "4) It doesn't do anything"],
        answer: 2
    }
];

var currentQuestion = 0;

var dynamicElements = [
    screen0El,
    screen1El,
    screen2El,
    screen3El,
    screen4El,
    scoreboardBtn,
    timer
  ];

function init() {
    setEventListeners();
    // setState(0);
}

function setState(state) {
    switch (state) {
      case 1:
        populateQuestion();
        break;
      default:
        break;
    }
  
    dynamicElements.forEach(function (ele) {
      var possibleStatesAttr = ele.getAttribute("data-states");
      var possibleStates = JSON.parse(possibleStatesAttr);
      if (possibleStates.includes(state)) {
        ele.classList.remove(hideState);
      } else {
        ele.classList.add(hideState);
      }
    });
  }

function populateQuestion() {
    var questionObj = questions[currentQuestion];
    // Remove the current list items
    answerEl.innerHTML = "";
    questionEl.textContent = questionObj.question;
    questionObj.answers.forEach(function (question) {
      var li = document.createElement("li");
      li.textContent = question;
      answerEl.appendChild(li);
    });
    if (currentQuestion === questions.length - 1) {
      currentQuestion = 0;
    } else {
      currentQuestion++;
    }
}

function setEventListeners() {
    scoreboardBtn.addEventListener("click", function () {
      setState(3);
    });
    startQuizBtn.addEventListener("click", function () {
      setState(1);
    });
    returnBtn.addEventListener("click", function () {
      setState(0);
    });
}

init();