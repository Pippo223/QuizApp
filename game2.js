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
        question: 'Which football club has the most number of trophies?',
        choice1: 'Al-Ahly',
        choice2: 'Barcelona',
        choice3: 'Boca Juniors',
        choice4: 'Real Madrid',
        answer: 1,
    },
    {
        question: "Where was the very first World Cup held'?",
        choice1: "Brazil",
        choice2: "England",
        choice3: "Uruguay",
        choice4: "West-Germany",
        answer: 3,
    },
    {
        question: "Who is the most successful football coach in the world?",
        choice1: "Sir Alex Ferguson",
        choice2: "Carlo Ancelotti",
        choice3: "Jose Mourinho",
        choice4: "Pep Guardiola",
        answer: 1,
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

