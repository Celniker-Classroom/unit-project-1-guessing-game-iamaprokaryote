let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let startTime;
let gameTimes = [];

let playerName = prompt("Enter your first name");
let formattedName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

function time() {
    let d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = d.getDate();
    let suffix = "th";
    
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    let timeString = `${months[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()} - ${d.toLocaleTimeString()}`;
    document.getElementById("date").textContent = timeString;
}
setInterval(time, 1000);

document.getElementById('playBtn').addEventListener('click', function() {
    guessCount = 0;
    startTime = new Date().getTime();
    let radios = document.getElementsByName('level');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
        radios[i].disabled = true;
    }
    
    answer = Math.floor(Math.random() * range) + 1;
    document.getElementById('msg').textContent = formattedName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
});

document.getElementById('guessBtn').addEventListener('click', function() {
    let input = document.getElementById('guess').value;
    let num = parseInt(input);
    
    if (isNaN(num)) {
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }
    
    guessCount++;
    let diff = Math.abs(num - answer);
    
    if (num === answer) {
        document.getElementById("msg").textContent = "Correct! " + formattedName + " got it in " + guessCount + " guesses!";
        updateScore(guessCount, true);
        resetButtons();
    } else {
        let hint = "";
        if (diff <= 2) hint = "hot";
        else if (diff <= 5) hint = "warm";
        else hint = "cold";
        
        let direction = num > answer ? "high" : "low";
        document.getElementById('msg').textContent = `Too ${direction}. You are ${hint}!`;
    }
});

document.getElementById('giveUpBtn').addEventListener('click', giveUp);

function giveUp() {
    document.getElementById("msg").textContent = "You gave up! The answer was " + answer + ".";
    updateScore(range, false);
    resetButtons();
}

function updateScore(score, isWin) {
    if (isWin) {
        totalWins++;
        document.getElementById("wins").textContent = "Total wins: " + totalWins;
    }
    
    totalGuesses += score;
    scores.push(score);
    scores.sort((a, b) => a - b);

    document.getElementById("avgScore").textContent = "Average score: " + (totalGuesses / scores.length).toFixed(2);

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i = 0; i < leaderboard.length; i++) {
        if (scores[i] !== undefined) {
            leaderboard[i].textContent = scores[i];
        } else {
            leaderboard[i].textContent = "--";
        }
    }

    let duration = (new Date().getTime() - startTime) / 1000;
    updateTimers(duration);
}

function updateTimers(duration) {
    gameTimes.push(duration);
    let fastest = Math.min(...gameTimes);
    let sumTime = gameTimes.reduce((a, b) => a + b, 0);
    let avgTime = sumTime / gameTimes.length;

    document.getElementById("fastest").textContent = "Fastest Game: " + fastest.toFixed(2);
    document.getElementById("avgTime").textContent = "Average Time: " + avgTime.toFixed(2);
}

function resetButtons() {
    document.getElementById('guessBtn').disabled = true;
    document.getElementById('giveUpBtn').disabled = true;
    document.getElementById('playBtn').disabled = false;
    let radios = document.getElementsByName("level");
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
    }
}