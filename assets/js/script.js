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

// sets display to hide when called
var hideState = "hide";

// array of questions to be displayed
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
var currentTime = 100;
var submittedInput = [];

// elements that needs to be hidden at certain times
var dynamicElements = [
    screen0El,
    screen1El,
    screen2El,
    screen3El,
    screen4El,
    scoreboardBtn,
    timer
  ];

// fires necessary functions at page load
function init() {
    setEventListeners();
    setState(0);
    getHighScore();
    renderHighscores();
}

// function allowing us to hide and show states
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

// function to populate the first question from our questions array and append to page with possible answers
function populateQuestion() {
    var questionObj = questions[currentQuestion];
    answerEl.innerHTML = "";
    questionEl.textContent = questionObj.question;
    questionObj.answers.forEach(function (question) {
      var li = document.createElement("li");
      li.textContent = question;
      answerEl.appendChild(li);
    });
}

// when it gets to the last question, it moves to state[2]; if not, go to the next question in questions array
function populateNextQuestion() {
    if (currentQuestion === questions.length - 1) {
        setState(2);
        finalScore.textContent = currentTime;
    } else {
        currentQuestion++;
        populateQuestion();
    }
}

// starts timer function
function startTimer () {
   var timeInterval = setInterval(function() {
        timeRemaining.textContent = currentTime;
        currentTime--;
        // when timer gets to 0, will go to state[2] with no option to enter intials for highscore, replaced with button to go back to state[0]
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

// if questions is answered incorrectly, timer will subtract 10 seconds
function wrongTimer () {
    if (currentTime > 0) {
        currentTime = currentTime - 10;
    }
    if (currentTime <= 0) {
        currentTime = currentTime;
    }
}

// renders highscores store in local storage to state[3]
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

// function to save high score to local storage
function storeHighscore() {
    localStorage.setItem("rankings", JSON.stringify(submittedInput));
}

// submits high score to high scores array and sorts it by highest score
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

// function called by init() to get high score from local stoarge
function getHighScore() {
    var storedHighscore = JSON.parse(localStorage.getItem("rankings"));
    if (storedHighscore !== null) {
        submittedInput = storedHighscore;
    }   
}

// function called by init() to fire all event listeners
function setEventListeners() {
    scoreboardBtn.addEventListener("click", function () {
      setState(3);
    });
    // starts quiz, and also resets quiz when play again
    startQuizBtn.addEventListener("click", function () {
      setState(1);
      currentQuestion = 0;
      populateQuestion();
      currentTime = 100;
      startTimer();
      submitHighscoreBtn.setAttribute("style", "display:center");
      enterInitials.setAttribute("style", "display:center");
      scoreboardLeader.setAttribute("style", "display:center;");
      screen2El.removeChild(returnBtn);
    });
    returnBtn.addEventListener("click", function () {
      setState(0);
    });

    // when user selects answers during the quiz
    answerEl.addEventListener("click", function(event) {
        var target = event.target;
        var correctAnswer = questions[currentQuestion].answer;
        var userAnswer = target.textContent;
        if (currentTime > 0) {
                // goes to next question with correct validation
                if (correctAnswer == userAnswer) {
                    answerResult.textContent = "✅ Correct!";
                    populateNextQuestion();
            }
                if (correctAnswer != userAnswer) {
                    // goes to next question with wrong validation, and -10 seconds from timer
                    answerResult.textContent = "❌ Wrong!";
                    wrongTimer();
                    populateNextQuestion();
                }
        }
    });
}


// clears local storage and hides previous <li> created
function resetHighscores () {
    localStorage.clear();
    scoreboardLeader.setAttribute("style", "display:none;");

}

clearHighscore.addEventListener("click", resetHighscores);

init();