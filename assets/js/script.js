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
var enterInitials = document.querySelector("#enter-initials");
var loserReturnBtn = document.querySelector("#loser-return");


var hideState = "hide";

var questions = [
    {
        question: "_______ is the process of finding errors and fixing them within a program.",
        answers: ["1) Compiling", "2) Executing", "3) Debugging", "4) Scanning"],
        answer: "3) Debugging"
    },
    {
        question: "A loop that never ends is referred to as a(n) _______",
        answers: ["1) While loop", "2) Infinite loop", "3) Recursive loop", "4) For loop"],
        answer: "2) Infinite loop"
    },
    {
        question: "Which of the following is an assignment operator?",
        answers: ["1) =", "2) &&", "3) +", "4) %"],
        answer: "1) ="
    },
    {
        question: "Which type has two literal values?",
        answers: ["1) String", "2) Numeric", "3) Array", "4) Boolean"],
        answer: "4) Boolean"
    },
    {
        question: "What does HTML stand for?",
        answers: ["1) HyperText Markup Language", "2) Hit The Mother Load", "3) Hey That's My Lunch", "4) Hello To My Love"],
        answer: "1) HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        answers: ["1) Combat Service Support", "2) Cascading Style Sheet", "3) Central Support System", "4) Custom Style Sheet"],
        answer: "2) Cascading Style Sheet"
    },
    {
        question: "Which of the following is a comparison operator?",
        answers: ["1) =", "2) +", "3) ===", "4) %"],
        answer: "3) ==="
    },
    {
        question: "Which of the following prints text the console?",
        answers: ["1) window.alert", "2) window.confirm", "3) window.prompt", "4) console.log"],
        answer: "4) console.log"
    },
    {
        question: "What does Math.random() do?",
        answers: ["1) Creates random math problems", "2) Creates a random word problem", "3) It doesn't do anything", "4) Returns a random number between 0 and 1"],
        answer: "4) Returns a random number between 0 and 1"
    },
    {
        question: "What does Math.floor() do?",
        answers: ["1) Returns a random number between 0 and 1", "2) Puts the math on the floor", "3) Returns the largest integer less than or equal to a number", "4) It doesn't do anything"],
        answer: "3) Returns the largest integer less than or equal to a number"
    }
];

var currentQuestion = 0;
var currentAnswer;
var currentTime = 100;
var submittedInput = [];


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
    getHighScore();
    renderHighscores();
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
}

function populateNextQuestion() {
    if (currentQuestion === questions.length - 1) {
        setState(2);
        finalScore.textContent = currentTime;
    } else {
        currentQuestion++;
        populateQuestion();
    }
}

function startTimer () {
   var timeInterval = setInterval(function() {
        timeRemaining.textContent = currentTime;
        currentTime--;
        if (currentTime <= 0) {
            clearInterval(timeInterval);
            setState(2);
            answerResult.textContent = "Game Over!";
            submitHighscoreBtn.setAttribute("style", "display:none");
            enterInitials.setAttribute("style", "display:none")
            screen2El.append(returnBtn);
        }    
   }, 1000); 
}

function wrongTimer () {
    if (currentTime > 0) {
        currentTime = currentTime - 10;
    }
    if (currentTime <= 0) {
        currentTime = currentTime;
    }
}


function renderHighscores() {
    scoreboardLeader.innerHTML = "";
    var savedHighscore = JSON.parse(localStorage.getItem("rankings"));
    var highscores = document.getElementById("scoreboard-leader");

    highscores.innerHTML = savedHighscore
        .map(score => {
            return `<li>${score.score} - ${score.player}</li>`;
        })
        .join("");
    
}

function storeHighscore() {
    localStorage.setItem("rankings", JSON.stringify(submittedInput));
}

submitHighscoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var player = enterInitials.value.trim()
    var score = finalScore.textContent.trim()
    var submittedInputText = {score, player}
    submittedInput.push(submittedInputText);
    submittedInput.sort((a,b) => b.score - a.score);
    storeHighscore();
    renderHighscores();
    setState(3);
})

function getHighScore() {
    var storedHighscore = JSON.parse(localStorage.getItem("rankings"));
    if (storedHighscore !== null) {
        submittedInput = storedHighscore;
    }   
}

function resetHighscores () {
    localStorage.clear("rankings");
}

function setEventListeners() {
    scoreboardBtn.addEventListener("click", function () {
      setState(3);
    });
    startQuizBtn.addEventListener("click", function () {
      setState(1);
      currentQuestion = 0;
      populateQuestion();
      currentTime = 100;
      startTimer();
      submitHighscoreBtn.setAttribute("style", "display:center");
      enterInitials.setAttribute("style", "display:center");
      screen2El.removeChild(returnBtn);
    });
    returnBtn.addEventListener("click", function () {
      setState(0);
    });

    answerEl.addEventListener("click", function(event) {
        var target = event.target;
        var correctAnswer = questions[currentQuestion].answer;
        var userAnswer = target.textContent;
        if (currentTime > 0) {
                if (correctAnswer == userAnswer) {
                    answerResult.textContent = "✅ Correct!";
                    populateNextQuestion();
            }
                if (correctAnswer != userAnswer) {
                    answerResult.textContent = "❌ Wrong!";
                    wrongTimer();
                    populateNextQuestion();
                }
        }
    });
}
init();


function resetHighscores () {
    localStorage.clear();
}

clearHighscore.addEventListener("click", resetHighscores);
