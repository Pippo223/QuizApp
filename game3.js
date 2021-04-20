const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'How much pressure do the strings in a grand piano exert on the frame?',
        choice1: '30 lbs',
        choice2: '300 lbs',
        choice3: '30 tons',
        choice4: '300 tons',
        answer: 3,
    },
    {
        question: "What was Bob Marley's song 'I Shot the Sheriff' really about?",
        choice1: "Birth control",
        choice2: "His record label",
        choice3: "Irish Rebublic Army",
        choice4: "The Media",
        answer: 1,
    },
    {
        question: "Which musician has won the most grammy awards",
        choice1: "Beyonce",
        choice2: "Georg Solti",
        choice3: "Jimmy Hendrix",
        choice4: "Quincy Jonas",
        answer: 2,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update Progress Bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
 
    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
  
      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
});

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
}

startGame();

