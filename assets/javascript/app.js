const questionInfo = [{
    question: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "2 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "4 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "5 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "6 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "7 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"},
    {
    question: "8 Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    possibleAnswers: ["answer 1","answer 2","answer 3","answer 4"],
    answer: "answer 3",
    gifUrl: "../images/taco.gif"}
]

let timer = 30;
let timerInterval;
let index = 0;
let isCorrect;
let correctCount = 0;
let incorrectCount = 0;
let unanswered = 0;

function initializeGame(){
    $("#time-remaining").css("visibility","hidden");
    $("#time-remaining").text("Time remaining: 30");
    $("#question").css("visibility","hidden");
    $("#question").text(".");
    $("#answer-1").css("visibility","hidden");
    $("#answer-1").text(".");
    $("#answer-2").css("visibility","hidden");
    $("#answer-2").text(".");
    $("#answer-3").css("visibility","hidden");
    $("#answer-3").text(".");
    $("#answer-4").css("visibility","hidden");
    $("#answer-4").text(".");
}

function start(){
    //hide the start button and show the other components
    $("#start").hide();
    $("#time-remaining").css("visibility","visible");
    $("#question").css("visibility","visible");
    $("#answer-1").css("visibility","visible");
    $("#answer-2").css("visibility","visible");
    $("#answer-3").css("visibility","visible");
    $("#answer-4").css("visibility","visible");
    showQuestionPage();
}

function startTimer(){
    //every second...
    timerInterval = setInterval(function(){
        //decrement timer and display it on screen
        timer--;
        $("#time-remaining").text("Time remaining: " + timer);
        if(timer<=0) outOfTime();
    }, 1000)
}

function resetTimer(){
    //stop timer and reset it to 30 and display it on screen
    timer = 30;
    $("#time-remaining").text("Time remaining: " + timer);
    clearInterval(timerInterval);
}

function outOfTime(){
    //increment unanswered and show out of time page
    unanswered++;
    $("#question").text("Sorry, you ran out of time! The correct answer was " + questionInfo[index].answer + ".");
    $("time-remaining").css("visibility","hidden");
    resetTimer();
    $("#answer-1").css("visibility","hidden");
    $("#answer-2").css("visibility","hidden");
    $("#answer-3").css("visibility","hidden");
    $("#answer-4").css("visibility","hidden");
    //after 5 seconds go to the next question page
    setTimeout(showQuestionPage, 5000);
    index++;
}

function showQuestionPage(){
    //check if there are no more question pages left
    if(index === questionInfo.length){
        // if not, game over
        return gameOver();
    }
    //show the question and possible answers
    $("#question").text(questionInfo[index].question);
    $("#answer-1").text(questionInfo[index].possibleAnswers[0]);
    $("#answer-2").text(questionInfo[index].possibleAnswers[1]);
    $("#answer-3").text(questionInfo[index].possibleAnswers[2]);
    $("#answer-4").text(questionInfo[index].possibleAnswers[3]);
    $("#answer-1").css("visibility","visible");
    $("#answer-2").css("visibility","visible");
    $("#answer-3").css("visibility","visible");
    $("#answer-4").css("visibility","visible");
    startTimer();
}

function showAnswerPage(correct){
    resetTimer();
    //if the correct answer was chosen
    if(correct){
        //increment correctCount and show correct answer page
        correctCount++;
        $("#question").text("Correct!");
        $("#answer-1").css("visibility","hidden");
        $("#answer-2").css("visibility","hidden");
        $("#answer-3").css("visibility","hidden");
        $("#answer-4").css("visibility","hidden");
        //after 5 seconds go to the next question page
        setTimeout(showQuestionPage, 5000);
    }
    //if the wrong answer was chosen
    else{
        //increment incorrectCount and show wrong answer page
        incorrectCount++;
        $("#question").text("Sorry, thats incorrect! The correct answer was " + questionInfo[index].answer + ".");
        $("#answer-1").css("visibility","hidden");
        $("#answer-2").css("visibility","hidden");
        $("#answer-3").css("visibility","hidden");
        $("#answer-4").css("visibility","hidden");
        //after 5 seconds go to the next question page
        setTimeout(showQuestionPage, 5000);
    }
    index++;
}

function gameOver(){
    //show game summary screen
    $("#question").text("How did you do?");
    $("#answer-1").text("Correct answers: "+correctCount);
    $("#answer-2").text("Incorrect answers: "+incorrectCount);
    $("#answer-3").text("Unanswered: "+unanswered);
    $("#answer-4").text("Play again?");
    $("#answer-1").css("visibility","visible");
    $("#answer-2").css("visibility","visible");
    $("#answer-3").css("visibility","visible");
    $("#answer-4").css("visibility","visible");
    //reset counter variables
    index = 0;
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;
}

$(".btn").click(function(){
    //check if the button pressed is the play again button
    if($(this).text()==="Play again?") start();
    //check if the button pressed is the start button
    else if($(this).text()==="Start") start();
    //check if the button pressed is the correct answer
    else if($(this).text()===questionInfo[index].answer){
        isCorrect = true;
        showAnswerPage(isCorrect);
    }
    //check if the button pressed is a valid (incorrect) answer
    else if(questionInfo[index].possibleAnswers.indexOf($(this).text()) != -1){
        isCorrect = false;
        showAnswerPage(isCorrect);
    }
    //if it isn't valid, do nothing
})

initializeGame();