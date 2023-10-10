const questions = [
    {
        question: "Why Litchi love Sanchi?",
        answers: [
            { text: "No idea" ,correct: false},
            { text: "Sanchi goofy" ,correct: true},
            { text: "Sanchi perfect" ,correct: false},
            { text: "Sanchi idiot" ,correct: false}
        ]
    },
    {
        question: "Who Sanchi love the most",
        answers: [
            { text: "Kaju katli" ,correct: false},
            { text: "Towel" ,correct: false},
            { text: "Litchi & Rem" ,correct: true},
            { text: "No-one" ,correct: false}
        ]
    },
    {
        question: "Choose good food",
        answers: [
            { text: "Kaju Kalti" ,correct: false},
            { text: "Rasmalai" ,correct: false},
            { text: "Litchi😉" ,correct: true},
            { text: "Vada Pav" ,correct: false}
        ]
    },
    {
        question: "do litchi lob sanchi really?",
        answers: [
            { text: "very very very much" ,correct: true},
            { text: "very much" ,correct: false},
            { text: "yes" ,correct: false},
            { text: "bleh" ,correct: false}
        ]
    },
];

const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ===
    'true';
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
        button.style.cursor = 'not-allowed'
    })
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();
