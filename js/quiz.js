var r = 0;
var count = 30;
var timer = 0;
var data;
var list;
var correctCount = 0;
var life = 3;

function makeQuestion() {
    list = data.plist[r];

    $("#legend").html(list.pnum + "번째 문제");
    $("#question").html(list.problem);
    $("#question").css("opacity", "1");
    $("#question").css("transform", "translateY(-50%)");

    if (list.isOX == "true") {
        $("#button-group-OX").html('<div id="group1"><button id="b1" onclick="buttonClick(\'1\');">O</button><button id="b2" onclick="buttonClick(\'2\');">X</button></div>');
        //<button id="b1">O</button><button id="b2">X</button>
    }
    else {
        $("#button-group-4choice").html('<div id="group1"><button id="b1" onclick="buttonClick(\'1\');">' +
            list.ex1 + '</button><button id="b2" onclick="buttonClick(\'2\');">' +
            list.ex2 + '</button></div><div id="group2""><button id="b3" onclick="buttonClick(\'3\');">' +
            list.ex3 + '</button><button id="b4" onclick="buttonClick(\'4\');">' + list.ex4 + '</button></div>');
        //<button id="b1">O</button><button id="b2">X</button></div><div id="group2"><button id="b3">네</button><button id="b4">아니오</button>
    }

    timer = setInterval(quizTimer, 1000);
}

function buttonClick(exnum) {
    $("#count").empty();
    $("#button-group-OX").empty();
    $("#button-group-4choice").empty();

    if (exnum == list.answernum) {
        $("#question").html("정답입니다!");
        $("#question").css("opacity", "1");
        correctCount++;
        $("#correct").html("맞은 개수: " + correctCount);
    }
    else {
        $("#question").html("틀렸습니다!");
        $("#question").css("opacity", "1");
        $("#life").empty();
        life--;
        for(var j = 3-life; j>0; j--)
        {
            $("#life").append("<img src=\"../media/emptyheart.png\"></img>");
        }
        for(var i = 0; i<life; i++)
        {
            $("#life").append("<img src=\"../media/fillheart.png\"></img>");
        }
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

        $("#life").empty();
        life--;
        for(var j = 3-life; j>0; j--)
        {
            $("#life").append("<img src=\"../media/emptyheart.png\"></img>");
        }
        for(var i = 0; i<life; i++)
        {
            $("#life").append("<img src=\"../media/fillheart.png\"></img>");
        }

        count = 1;
        timer = setInterval(secondTimer, 1000);
    }
}

function quizEnd()
{
    $("#question").empty();
    $("#answer").empty();
    $("#life").empty();
    $("#correct").empty();
    $("#nextButton").empty();
    $("#legend").html("퀴즈 결과");

    $("#answer").html("맞은 개수: " + correctCount + "<br><br>");
    $("#question").html("남은 생명: " + life);
    $("#nextButton").html("<button onclick=\"newGame()\">다시하기</button>");
}

function secondTimer() {
    --count;
    if (count <= 0) {
        $("#question").empty();
        $("#answer").append("정답: " + list.answer + "<br><br>");
        $("#question").append("해설: " + list.commentary);

        if (r == 19) {
            $("#nextButton").html("<button onclick=\"quizEnd()\">퀴즈 종료</button>");
        }
        else if (life <= 0) {
            $("#nextButton").html("<button onclick=\"quizEnd()\">퀴즈 종료</button>");
        }
        else {
            $("#nextButton").html("<button onclick=\"nextButtonClick()\">다음 문제</button>");
        }
        clearInterval(timer);
    }
}

function newGame()
{
    r = 0;
    count = 30;
    timer = 0;
    correctCount = 0;
    life = 3;

    makeQuestion();
    $("#correct").html("맞은 개수: " + correctCount);
    $("#nextButton").empty();
    $("#answer").empty();

    for(var i = 0; i<life; i++)
    {
        $("#life").append("<img src=\"../media/fillheart.png\"></img>");
    }
}

$(document).ready(function () {
    $.getJSON('../1.json', function (jsondata) {
        data = jsondata;
        newGame();
    });
})