//Initial Datas
let currentQuestion = 0;
let scoreArea = document.querySelector('.scoreArea');
let questionArea = document.querySelector('.questionArea');
let quest = document.querySelector('.question');
let alternatives = document.querySelector('.options');

let correctAnswers = 0;

//Event

document.querySelector('.scoreArea .btn').addEventListener('click', resetEvent)

//Functions
let showQuestion = () => {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let Pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector(".progress--bar").style.width = `${Pct}%`

        scoreArea.style.display = 'none';
        questionArea.style.display = 'block';

        quest.innerHTML = q.question;
        alternatives.innerHTML = '';

        let optionHTML = '';
        for(let i in q.options) {
            optionHTML += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>  ${q.options[i]}</div>`
        }
        alternatives.innerHTML = optionHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        });
    } else {
        noQuestion()
    }
}

showQuestion()

function optionClickEvent(e) {
    let clickedOption =  parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer == clickedOption ) {
        correctAnswers++;
    };

    currentQuestion++;
    showQuestion()
}

function noQuestion() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    let award = document.querySelector('.scoreText1');
    let scorePct = document.querySelector('.scorePct')

    if(points < 30) {
        award.innerHTML = "Faça novamente, cê ta ruim, hein.";
        scorePct.style.color = "#FF0000"

    } else if(points >= 30 && points < 70) {
        award.innerHTML = "Muito bom";
        scorePct.style.color = "#FFFF00"
    } else if(points >= 70) {
        award.innerHTML = "Excelente";
        scorePct.style.color = "#DCF7C6"
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu a ${questions.length} questões e acertou ${correctAnswers} `

    scoreArea.style.display = 'block';
    questionArea.style.display = 'none';
    document.querySelector(".progress--bar").style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion()
}