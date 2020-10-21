const highscoreslist = document.getElementById('highscorelist');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScores.map(score=>{
    const li = document.createElement('li');
    li.classList.add('high-score');
    li.innerText = `${score.name}    -    ${score.score}`
    highscoreslist.append(li)
})