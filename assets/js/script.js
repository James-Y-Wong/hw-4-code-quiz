var timeRemaining = document.querySelector("#time-remaining");
var screen0El = document.querySelector("#screen0");
var screen1El = document.querySelector("#screen1");
var screen2El = document.querySelector("#screen2");
var screen3El = document.querySelector("#screen3");
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


var hideState = "hide";

var questions = [
    {
        question: "_______ is the process of finding errors and fixing them within a program.",
        answers: ["Compiling", "Executing", "Debugging", "Scanning"],
        answer: 2
    },
    {
        question: "A loop that never ends is referred to as a(n) _______",
        answers: ["While loop", "Infinite loop", "Recursive loop", "For loop"],
        answer: 1
    },
    {
        question: "Which of the following is an assignment operator?",
        answers: ["=", "&&", "+", "%"],
        answer: 0
    },
    {
        question: "Which type has two literal values?",
        answers: ["String", "Numeric", "Array", "Boolean"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        answers: ["HyperText Markup Language", "Hit The Mother Load", "Hey That's My Lunch", "Hello To My Love"],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        answers: ["Combat Service Support", "Cascading Style Sheet", "Central Support System", "Custom Style Sheet"],
        answer: 1
    },
    {
        question: "Which of the following is a comparison operator?",
        answers: ["=", "+", "===", "%"],
        answer: 2
    },
    {
        question: "Which of the following prints text the console?",
        answers: ["window.alert", "window.confirm", "window.prompt", "console.log"],
        answer: 3
    },
    {
        question: "What does Math.random() do?",
        answers: ["Creates random math problems", "Creates a random word problem", "It doesn't do anything", "Returns a random number between 0 and 1"],
        answer: 3
    },
    {
        question: "What does Math.floor() do?",
        answers: ["Returns a random number between 0 and 1", "Puts the math on the floor", "Returns the largest integer less than or equal to a number", "It doesn't do anything"],
        answer: 2
    }
];

var currentQuestion = 0;

