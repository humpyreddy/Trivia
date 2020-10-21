// HTML Template
   
   //      <div class="container-sm my-container">

   //      <div id="qa_frame" class="row w-100">
   //          <div class="col my-col">
   //              <h2 id="question">What is the answer to this question?</h2>   
   //          </div>
   //      </div>

   //      <div class="row w-100">
   //          <div  class="col w-100 my-col">
   //              <div class="row choice-container w-100">
   //                  <span class="choice-prefix">A</span>
   //                  <p class="choice-text">Choice 1</p>
   //              </div>
   //      </div>



   //      </div>
   //  </div> 





//DIV CONTAINER
const container = document.createElement("div");
container.classList.add("container","my-container");
document.body.append(container);

//Head Data

const hud = document.createElement("div");
hud.setAttribute("id","hud")
hud.classList.add('row','justify-content-between');
container.appendChild(hud);

const hud_col1 = document.createElement("div");
hud_col1.classList.add('col-6');
hud.appendChild(hud_col1)

// const hud_ques = document.createElement("p");
// hud_ques.classList.add("hud-prefix");
// hud_ques.innerText = "Question"
// hud_col1.appendChild(hud_ques);




const hud_ques_no = document.createElement("p");
hud_ques_no.classList.add("hud-main-text");
hud_ques_no.setAttribute("id","progressText")
hud_col1.appendChild(hud_ques_no);

const progressBar = document.createElement("div");
progressBar.classList.add("progressBar");
hud_col1.appendChild(progressBar)

const bar = document.createElement("div");
bar.setAttribute("id","progressBar")
bar.classList.add('progress-bar-full');
progressBar.appendChild(bar);



const hud_col2 = document.createElement("div");
hud_col2.classList.add('col-6','text-right')
hud.appendChild(hud_col2)

const hud_score_text = document.createElement("p");
hud_score_text.classList.add("hud-prefix");
hud_score_text.innerText="Score"
hud_col2.appendChild(hud_score_text);

const hud_score = document.createElement("h1")
hud_score.setAttribute("id","score")
hud_score.innerText="0"
hud_score.classList.add("hud-main-text");
hud_col2.appendChild(hud_score)




// Question Appending Code
//Question Container - row
const ques_container = document.createElement("div");
ques_container.classList.add("row","w-100");
ques_container.setAttribute("id","qa_frame")
container.appendChild(ques_container)

//Question col
const question_col = document.createElement("div");
question_col.classList.add("col-12");
ques_container.appendChild(question_col);

//Question
const question = document.createElement("h2");
question.setAttribute("id","question");
question_col.appendChild(question);


 //Choice Code

 const choice_frame = document.createElement("div");
 choice_frame.classList.add("row","w-100");
 container.appendChild(choice_frame);

 const choice_col = document.createElement("div");
 choice_col.classList.add("col-12","w-100");
 choice_col.setAttribute("id","choices");
 choice_frame.appendChild(choice_col);


var element = document.getElementById("choices");
let choices_prefix = ['A','B','C','D']
 for(let i=0;i<4;i++){

    const choice_container = document.createElement("div");
    choice_container.classList.add("row","choice-container","w-100")
    element.append(choice_container)

    const choice_span = document.createElement("span");
    choice_span.classList.add("choice-prefix");
    choice_span.innerText = choices_prefix[i];
    choice_container.append(choice_span);
   
    const choice_text = document.createElement("p");
    choice_text.classList.add("choice-text");
    choice_text.setAttribute("data-number",i+1)
    choice_container.append(choice_text)

 }


 //Fetching and Rendering Data

fetch_data = async ()=>{
   let data = await fetch(
        'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
    );
    data = await data.json();

    questions = data.results.map((loadedQuestion) => {
                    const formattedQuestion = {
                        question: loadedQuestion.question,
                    };
        
                    const answerChoices = [...loadedQuestion.incorrect_answers];
                    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                    answerChoices.splice(
                        formattedQuestion.answer - 1,
                        0,
                        loadedQuestion.correct_answer
                    );
        
                    answerChoices.forEach((choice, index) => {
                        formattedQuestion['choice' + (index + 1)] = choice;
                    });

                    return formattedQuestion;
                });
                startGame();

}

fetch_data();

const question_dom = document.getElementById('question')
const choices_dom = Array.from(document.getElementsByClassName('choice-text'));
const scoretext = document.getElementById("score");
const questionCounterText = document.getElementById("progressText");
const progressBarFull =  document.getElementById("progressBar");


let currentQuestion = {};
let availableQuestions = [];
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

const MAX_QUESTIONS = 10;
const CORRECT_BONUS = 10;


startGame =()=>{
   questionCounter =0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
}

 getNewQuestion = ()=>{

   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      //go to the end page
      localStorage.setItem('mostRecentScore',score);
      return window.location.assign('/end.html');
  }
   questionCounter++;
   questionCounterText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;
   //updating the progress bar
   console.log((questionCounter/MAX_QUESTIONS)*100)
   progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

   let questionIndex = Math.floor(Math.random()*availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   console.log(currentQuestion)
   question_dom.innerText=currentQuestion.question;

   choices_dom.forEach(ch=>{
      const number = ch.dataset["number"]
       ch.innerText=currentQuestion["choice"+number]
      
   })

   availableQuestions.splice(questionIndex,1);
   acceptingAnswers = true;
};

choices_dom.forEach((ch) => {
   ch.addEventListener('click', (e) => {
       if (!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number']
       const classToApply = selectedAnswer==currentQuestion.answer?'correct':'incorrect'

       if(classToApply=='correct'){
          incrementScore(CORRECT_BONUS);
       }
      

       selectedChoice.parentElement.classList.add(classToApply);
       setTimeout(()=>{
         selectedChoice.parentElement.classList.remove(classToApply);
         getNewQuestion();
       },1000)

   });
});


let incrementScore = num=>{
   score +=num;
   scoretext.innerText =score;
}

