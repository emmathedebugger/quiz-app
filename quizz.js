const questions = [
    {
        question:"Which is the largest animal",
        answers:[
            {text:"Lion",correct:false},
            {text:"Elephant",correct:true},
            {text:"Rabbit",correct:false},
            {text:"Snake",correct:false}
            ]
    },
    {
        question:"Which is the smallest animal",
        answers:[
            {text:"Rat",correct:false},
            {text:"Eagle",correct:false},
            {text:"Ant",correct:true},
            {text:"Scorpion",correct:false}
            ]
    },
    {
        question:"Which is the largest continent",
        answers:[
            {text:"North America",correct:false},
            {text:"Asia",correct:true},
            {text:"Artantic",correct:false},
            {text:"Africa",correct:false}
            ]
    },
    {
        question:"Which is the largest fruit",
        answers:[
            {text:"Coconut",correct:false},
            {text:"Mango",correct:false},
            {text:"Watermelon",correct:true},
            {text:"Pawpaw",correct:false}
            ]
    },
    {
        question:"Which is the most popular game",
        answers:[
            {text:"Baseball",correct:false},
            {text:"Football",correct:true},
            {text:"Table Tennis",correct:false},
            {text:"Basketball",correct:false}
            ]
    },
    {
        question:"Who is the president of America",
        answers:[
            {text:"Barack Obama",correct:false},
            {text:"Donald Trump",correct:false},
            {text:"Joe Biden",correct:true},
            {text:"Elearnor Roselvet",correct:false}
            ]
    },
    {
        question:"Is python programming easy to learn?",
        answers:[
            {text:"I Do Not Know",correct:false},
            {text:"No",correct:false},
            {text:"Maybe",correct:false},
            {text:"Yes",correct:true}
            ]
    },
    {
        question:"Who was the first president of Nigeria",
        answers:[
            {text:"Muhamed Buhari",correct:false},
            {text:"Nnamdi Azikiwe",correct:true},
            {text:"Moritala Muhammed",correct:false},
            {text:"Obafemi Awolowo",correct:false}
            ]
    },
    {
        question:"What is my best color",
        answers:[
            {text:"Yellow",correct:true},
            {text:"Red",correct:false},
            {text:"Black",correct:false},
            {text:"Green",correct:false}
            ]
    },
    {
        question:"Which is the largest fish",
        answers:[
            {text:"Shark",correct:false},
            {text:"Pyrana",correct:false},
            {text:"Maquerel",correct:false},
            {text:"Whale",correct:true}
            ]
    }
    ];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const next = document.getElementById('next-btn');
const previous = document.getElementById('previous-btn');
let currentQuestionIndex = 0;
let score = 0;
function start(){
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
    document.getElementById('timer').style.display="inline";
    timer();
}
function timer(){
    var count = 10;
    var time = setInterval(() => {
        document.getElementById('timer').innerHTML=count+"s";
        count--;
        if(count==0){
            clearInterval(time);
            resetState();
            handleNextButton();
        }
        if(currentQuestionIndex<questions.length){
            next.addEventListener("click", () => {
                clearInterval(time);
            })
        }
    },1000);
};
function selectAnswer(e){
   const selectedBtn= e.target;
   const isCorrect = selectedBtn.dataset.correct ==="true";
   if(isCorrect){
       selectedBtn.classList.add("correct");
       score++;
   }else{
       selectedBtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct=="true"){
           button.classList.add("correct");
       }
       button.disabled=true;
   });
   next.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
next.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        resetState();
        handleNextButton();
    }else{
        start();
    }
})
function showScore(){
    resetState();
    if(score < 5){
        document.getElementById('timer').style.display="none";
        questionElement.innerHTML= `You scored ${score} out of ${questions.length},You failed, Try your chance.`;
    }
    else{
        document.getElementById('timer').style.display="none";
        questionElement.innerHTML= `You scored ${score} out of ${questions.length}, You passed 🥇🥇🥇`;
    }
    next.innerHTML= "Play Again";
    next.style.display= "block";
}
function resetState(){
    next.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
};
start();