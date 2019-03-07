const questionInfo = [{
    question: "The average human body contains how many pints of blood?",
    possibleAnswers: ["Five","Nine","Twelve","Twenty"],
    answer: "Nine",
    gifUrl: "assets/images/1.gif"},
    {
    question: "In which city is Jim Morrison buried?",
    possibleAnswers: ["Paris","Nashville","London","Sacramento"],
    answer: "Paris",
    gifUrl: "assets/images/2.gif"},
    {
    question: "Which movie features the song Ding Dong The Witch Is Dead?",
    possibleAnswers: ["The Blair Witch Project","Sleeping Beauty","Bewitched","The Wizard of Oz"],
    answer: "The Wizard of Oz",
    gifUrl: "assets/images/3.gif"},
    {
    question: "The Statue of Liberty was given to the US by which country?",
    possibleAnswers: ["Spain","Germany","England","France"],
    answer: "France",
    gifUrl: "assets/images/4.gif"},
    {
    question: "What is the name of Batman’s butler?",
    possibleAnswers: ["Wadsworth","Belvedere","Alfred","Jeeves"],
    answer: "Alfred",
    gifUrl: "assets/images/5.gif"},
    {
    question: "Who was the US president during World War I?",
    possibleAnswers: ["Herbert Hoover","Calvin Coolidge","Woodrow Wilson","Theodore Roosevelt"],
    answer: "Woodrow Wilson",
    gifUrl: "assets/images/6.gif"},
    {
    question: "Hg is the chemical symbol of which element?",
    possibleAnswers: ["Hydrogen","Mercury","Iron","Gold"],
    answer: "Mercury",
    gifUrl: "assets/images/7.gif"},
    {
    question: "Little Cuba is the nickname of what Florida city?",
    possibleAnswers: ["Miami","Key Largo","Sarasota","Key West"],
    answer: "Miami",
    gifUrl: "assets/images/8.gif"}
]

let timer = 10;
let timerInterval;
let index = 0;
let isCorrect;
let correctCount = 0;
let incorrectCount = 0;
let unanswered = 0;

function initializeGame(){
    $("#time-remaining").css("visibility","hidden");
    $("#time-remaining").text("Time remaining: 10");
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
    timer = 10;
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
    $("#gif").attr("src", questionInfo[index].gifUrl);
    $("#gif").css("visibility","visible");
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
    $("#gif").css("visibility","hidden");
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
        $("#gif").attr("src", questionInfo[index].gifUrl);
        $("#gif").css("visibility","visible");
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
        $("#gif").attr("src", questionInfo[index].gifUrl);
        $("#gif").css("visibility","visible");

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
    $("#gif").css("visibility","hidden");
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