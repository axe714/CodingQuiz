//global scope variables DOM elements

//timeLeft global scope needed to be able to decrease the timeLeft variable
var timeLeft = questions.length * 15;
var timerElement = document.querySelector("#time-left");
var startButton = document.querySelector("#start");
var questionsElement = document.querySelector("#questions");
var endScreenElement = document.querySelector("#end-screen");
var startScreenElement = document.querySelector("#start-screen");
var feedBackElement = document.querySelector("#feedback");
var choicesBodyElement = document.querySelector("#choices");
var currentQuestionIndex = 0;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    //hides the start screen
    startScreenElement.setAttribute("class", "hide");
    questionsElement.removeAttribute("class", "hide");
    startTimer();
    showQuestions();
}

//GOOD TO GO - WORKING AS INTENDED
function startTimer() {
    //set the timer to 15 seconds per question

    var timer = setInterval(function () {
        //decreases timer each second
        timeLeft--;
        //display the time remaining on HTML page
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
        }
        //decreases timer at a 1 second interval
    }, 1000);
}


//showQuestions function 
function showQuestions() {
    choicesBodyElement.innerHTML = "";
    //sets the current question to the first question in the array
    var currentQuestion = questions[currentQuestionIndex];
    var titleElement = document.querySelector("#question-title");
    titleElement.textContent = currentQuestion.title;

    //for loop to iterate through the choices array in the current question object
    var currentChoices = currentQuestion.choices;
    for (var i = 0; i < currentChoices.length; i++) {
        var choice = currentChoices[i];
        //creates a button for each choice in the current question
        var choiceElementButton = document.createElement("button");
        choiceElementButton.setAttribute("class", "choice");
        choiceElementButton.setAttribute("value", choice);
        choiceElementButton.textContent = i + 1 + ". " + choice;
        choicesBodyElement.appendChild(choiceElementButton);
        checkAnswer();

        function checkAnswer() {
            choiceElementButton.onclick = function () {
                if (this.value === currentQuestion.answer) {
                    currentQuestionIndex++;
                    correctFeedback();
                    showQuestions();
                } else {
                    timeLeft = timeLeft - 15;
                    incorrectFeedback();

                }
            }
        }
    }

    function correctFeedback() {
        feedBackElement.textContent = "Correct!";
        feedBackElement.setAttribute("class", "feedback");
        setTimeout(function() {
          feedBackElement.setAttribute("class", "feedback hide");
        }, 1000);

    }

    function incorrectFeedback() {
        feedBackElement.textContent = "Incorrect!";
        feedBackElement.setAttribute("class", "feedback");
        setTimeout(function() {
          feedBackElement.setAttribute("class", "feedback hide");
        }, 1000);
    }

    if (currentQuestionIndex === questions.length) {
        alert("You have completed the quiz!");
        // quizEnd();

    }

    //incomplete
    function quizEnd() {
        var finalScoreElement = document.querySelector("#final-score");
        titleElement.innerHTML = "";
        finalScoreElement.textContent = timeLeft;
        questionsElement.setAttribute("class", "hide");
        endScreenElement.removeAttribute("class", "hide");


    }
}


