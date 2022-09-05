let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justine Bieber",
        "right_answer": 3
    },
    {
        "question": "Wie nennt man einen Fehler in einem Computerprogramm?",
        "answer_1": "Bug",
        "answer_2": "Hat",
        "answer_3": "Pen",
        "answer_4": "Code",
        "right_answer": 1
    },
    {
        "question": "Mit welchem Tag bindet man eine Website in eine Website?",
        "answer_1": "span",
        "answer_2": "iframe",
        "answer_3": "button",
        "answer_4": "border",
        "right_answer": 2
    },
    {
        "question": "Was macht man mit einer Programmiersprache?",
        "answer_1": "kochen",
        "answer_2": "wandern",
        "answer_3": "zeichnen",
        "answer_4": "programmieren",
        "right_answer": 4
    },
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate",
        "answer_2": "let rate = 100",
        "answer_3": "100 = let rate",
        "answer_4": "rate = 100",
        "right_answer": 2
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let Audio_Right = new Audio('audio/right.mp3');
let Audio_Wrong = new Audio('audio/wrong.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amountOfQuestion').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion]; // choosen question from array
    let selectedQuestionNumber = selection.slice(-1); // last character to identify the right answer
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (selectedQuestionNumber == question['right_answer']) { // if last character ist the same as the 'right answer'
        document.getElementById(selection).parentNode.classList.add('bg-success');
        Audio_Right.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        Audio_Wrong.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++; // change the question from 0 to 1 and so on.
    document.getElementById('next-button').disabled = true;
    showQuestion();
    resetAnswerButtons();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
    document.getElementById('header-image').src = 'img/quiz.jpg';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}