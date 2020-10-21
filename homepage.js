/* <div class="container my-container"> 
            <div id="home" class="flex-column flex-center ">
                <h1>Quick Quiz</h1>
                <a id="play" class="btn" href="/game.html">Play</a>
                <a id="highscores" class="btn" href="/highscores.html">High Scores</a>
            </div>
        </div> */


const container = document.createElement("div")
container.classList.add("container","my-container");
document.body.append(container);

const home_container = document.createElement("div");
home_container.classList.add("flex-column","flex-center");
home_container.setAttribute("id","home");
container.appendChild(home_container);

const quiz_title = document.createElement("h1");
quiz_title.innerText="Quick Quiz"
home_container.appendChild(quiz_title);

const play_button = document.createElement("a")
play_button.classList.add("btn")
play_button.setAttribute("id","play");
play_button.setAttribute("href","/game.html");
play_button.innerText = "Play";
home_container.appendChild(play_button);

const highscores_button =  document.createElement("a");
highscores_button.classList.add("btn");
highscores_button.setAttribute("id","highscores");
highscores_button.setAttribute("href","/highscores.html");
highscores_button.innerText = "Highscores";
home_container.appendChild(highscores_button);






