
window.onload = function () {
    modal.style.display = "block";
    $("#submit").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
};
var modal = document.getElementById('myModal');

var span = document.getElementById("start");
span.onclick = function () {
    modal.style.display = "none";
}
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "What is the Arizona State Flower?",
        answers: {
            a: "Desert Rose",
            b: "Saguaro Cactus Blossom",
            c: "Lilly",
            d: "Golden Poppy",
        },
        correctAnswer: 'b'
    },
    {
        question: "What is the state capital of Arizona?",
        answers: {
            a: "Tucson",
            b: "Flagstaff",
            c: "Phoenix",
            d: "Scottsdale",
        },
        correctAnswer: "c",
    },
    {
        question: "In what year did Arizona become a state?",
        answers: {
            a: "1887",
            b: "1776",
            c: "1801",
            d: "1912",
        },
        correctAnswer: "d",
    },
    {
        question: "Which of the following states does not share a border with Arizona?",
        answers: {
            a: "Texas",
            b: "Utah",
            c: "New Mexico",
            d: "California",
        },
        correctAnswer: "a",
    },
];

function buildQuiz() {
    const output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}"
                        value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                        </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question}</div>
                <div class="answers"> ${answers.join('')}</div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        const userAnswer = (answerContainer.querySelector(selector) ||
            {}).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else {
            answerContainers[questionNumber].style.color = "red";
        }
    });
    resultsContainer.innerHTML = numCorrect + 'out of' + myQuestions.length;
}

buildQuiz();
submitButton.addEventListener('click', showResults);



var intervalId;
var clockRunning = false;

var stopwatch = {

    time: 0,


    reset: function () {
        stopwatch.time = 0;
        $("#display").text("00:00");

    },
    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {
        //end of quiz nonsense
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        console.log(intervalId);
        clearInterval(intervalId);
        clockRunning = false;
    },
    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time++;


        if (stopwatch.time > 3) {
            stopwatch.stop();
            stopwatch.reset();
            //alert("time is up");
            //$("#display").text("00:00");
        }

        else {
            var converted = stopwatch.timeConverter(stopwatch.time);
            $("#display").text(converted);
        }
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};