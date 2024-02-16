let $ = document;

let containerElem = $.querySelector(".container");
let description = $.querySelector(".description");
let question = $.querySelector(".question");
let minutesElem = $.querySelector(".Minutes");
let secondsElem = $.querySelector(".seconds");
let bulletsElem = $.querySelectorAll(".bullets");
let questionElem = $.querySelector(".question");
let displayQuestion = $.querySelector(".display-text");
let textInputElem = $.querySelector("input");
let resultScore = $.querySelector(".scoreResult");
let guessBtn = $.querySelector(".btn-guess");
let startBtn = $.querySelector(".btn-start");
let modalElem = $.querySelector(".modal");
let h2Elem = $.querySelector("h2");
let imgElem = $.querySelector("img");
let showScoreResult = $.querySelector(".show-result");

let wordsList = [
  {
    hint: "Write a delicious fruit's name, it has yellow color",
    answer: "banana",
    score: 2,
  },
  {
    hint: "Write a delicious fruit's name that is eatable in summer",
    answer: "cherry",
    score: 2,
  },
  {
    hint: "Write a delicious fruit's name that is eatable in winter",
    answer: "orange",
    score: 2,
  },
  {
    hint: "Write the name of your car that is made in Japan",
    answer: "toyota",
    score: 2,
  },
];

let showIndexQuestion = (indexNumber) => {
  questionElem.innerHTML = wordsList[indexNumber].hint;
  displayQuestion.innerHTML = wordsList[indexNumber].answer.slice(1, -1);
  return wordsList[indexNumber];
};

let displayScores = [];

let calcScore = () => {
  let totalScores = 0;
  displayScores.forEach((scores) => {
    totalScores += scores;
  });
  resultScore.innerHTML = "Your score is :  " + totalScores;

  if (totalScores < 5) {
    h2Elem.innerHTML = "You failed!";
    imgElem.setAttribute("src", "./assets/images/sad.png");
  } else {
    h2Elem.innerHTML = "Congratulations!";
    imgElem.setAttribute("src", "./assets/images/happy.png");
  }
};

let index = 0;
let nextStepQuestion = () => {
  if (index < bulletsElem.length) {
    bulletsElem[index].style.backgroundColor = "darkorange";
    if (textInputElem.value === wordsList[index].answer) {
      displayScores.push(wordsList[index].score);
      calcScore();
      index++;
    } else {
      let negativeScore = 0;
      negativeScore -= wordsList[index].score;
      index++;
    }
  }

  textInputElem.value = "";

  if (index === bulletsElem.length) {
    containerElem.style.filter = "blur(8px)";
    modalElem.style.visibility = "visible";
    calcScore();
    showScoreResult.innerHTML = resultScore.innerHTML;

    let secondToClose = 5;
    setInterval(() => {
      secondToClose--;
      if (secondToClose === 0) {
        location.reload();
      }
    }, 1000);
  }

  if (index < wordsList.length) {
    showIndexQuestion(index);
  }
};

let answerQuizQuestion = () => {
  textInputElem.focus();
};

startBtn.addEventListener("click", () => {
  let seconds = 0;
  let Minutes = 2;

  let timer = setInterval(() => {
    if (seconds === -1) {
      seconds = 59;
      Minutes--;
    }
    
    if (Minutes === 0 && seconds === 0) {
      Minutes = 0;
      seconds = 0;
      guessBtn.style.backgroundColor = "gray";
      guessBtn.disabled = true;
      alert("time is over!");
      location.reload();
      clearInterval(timer);
    }
    secondsElem.innerHTML = seconds--;
    minutesElem.innerHTML = Minutes;
  }, 1000);

  description.style.display = "none";
  question.style.display = "block";
  displayQuestion.style.display = "block";
  textInputElem.style.cssText = "display: inline-block";
  resultScore.style.display = "block";
  guessBtn.style.display = "inline-block";
  startBtn.style.display = "none";
  showIndexQuestion(index);
});

guessBtn.addEventListener("click", () => {
  if (textInputElem.value === "") {
    alert("Please enter a word");
  } else {
    answerQuizQuestion();
    nextStepQuestion();
  }
});