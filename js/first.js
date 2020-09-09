var r = 0;
var count = 30;
var timer = 0;

function makeQuestion() {

    $("#question").css("opacity", "1");
    timer = setInterval(quizTimer, 1000);
}

function buttonClick(exnum) {
    $("#count").empty();
    $("#button-group-OX").empty();
    $("#button-group-4choice").empty();

    if (exnum == '2') {
        $("#question").html("정답입니다! :)");
        $("#question").css("opacity", "1");
    }
    else {
        $("#question").html("틀렸습니다! :(");
        $("#question").css("opacity", "1");
    }

    clearInterval(timer);

    count = 1;
    timer = setInterval(secondTimer, 1000);
}

function nextButtonClick() {
    ++r;
    count = 30;
    makeQuestion();
    $("#answer").empty();
    $("#nextButton").empty();
}

function quizTimer() {
    --count;
    $("#count").text(count);
    if (count <= 0) {
        clearInterval(timer);
        $("#count").empty();
        $("#button-group-OX").empty();
        $("#button-group-4choice").empty();
        $("#question").html("시간 초과!");

        count = 1;
        timer = setInterval(secondTimer, 1000);
    }
}

function secondTimer() {
    --count;
    if (count <= 0) {
        $("#question").empty();
        $("#answer").empty();
        $("#answer").html("정답: X<br><br>");
        $("#question").html("해설: html은 프로그래밍 언어가 아니라 마크업 언어입니다!");

        
        $("#nextButton").html("<button onclick=\"location.href='main.html'\">퀴즈 시작</button>");
        clearInterval(timer);
    }
}

function newGame()
{
    count = 30;
    timer = 0;

    makeQuestion();
}

$(document).ready(function () {
    newGame();
})