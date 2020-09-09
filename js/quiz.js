var r = 0;
var count = 30;
var timer = 0;
var data;
var list;
var correctCount = 0;
var life = 3;

function makeQuestion() {
    list = data.plist[r];

    document.getElementById("legend").innerHTML = list.pnum + "번째 문제";
    document.getElementById("question").innerHTML = list.problem;

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
        correctCount++;
        $("#correct").html("맞은 개수: " + correctCount);
    }
    else {
        $("#question").html("틀렸습니다!");
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
        for(var i = 0; i<life; i++)
        {
            $("#life").append("<img src=\"../media/fillheart.png\"></img>");
        }

        count = 1;
        timer = setInterval(secondTimer, 1000);
    }
}

function secondTimer() {
    --count;
    if (count <= 0) {
        $("#question").empty();
        $("#answer").append("정답: " + list.answer + "<br><br>");
        $("#question").append("해설: " + list.commentary);

        if (r == 19) {
            $("#nextButton").html("<button>퀴즈 종료</button>");
        }
        else if (life <= 0) {
            $("#nextButton").html("<button>퀴즈 종료</button>");
        }
        else {
            $("#nextButton").html("<button onclick=\"nextButtonClick()\">다음 문제</button>");
        }
        clearInterval(timer);
    }
}

$(document).ready(function () {
    $.getJSON('../1.json', function (jsondata) {
        data = jsondata;
        makeQuestion();
        $("#correct").html("맞은 개수: " + correctCount);
        //$("#life").html("남은 기회: " + life);

        for(var i = 0; i<life; i++)
        {
            $("#life").append("<img src=\"../media/fillheart.png\"></img>");
        }
    });
})