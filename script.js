let answer = 0; 
let guessCount = 0; 
let totalWins = 0; 
let totalGuesses = 0; 
let scores = 0; 

let playerName = prompt("Enter your first name"); 
let formattedName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase(); 

let range = 3; 

document.getElementById('playBtn').addEventListener('click', function() { 
    let radios = document.getElementsByName('level'); 
    for (let i = 0; i < radios.length; i++) { 
        if (radios[i].checked) { 
            range = parseInt(radios[i].value); 
        } 
    } 
    answer = Math.floor(Math.random() * range) + 1; 
    document.getElementById('msg').textContent = formattedName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value="";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    for (let i=0; i < radios.length; i++) {
        radios[i].disabled = true;
    }

})

document.getElementById('guessBtn').addEventListener('click', function(){
    let input = document.getElementById('guess').value;
    let num = parseInt(input);
    if (isNaN(num)){
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }
    guessCount ++;
    let diff = Math.abs(num - answer);
    if (num === answer) {
        document.getElementById("msg").textContent = "Correct! " + formattedName + " got it in " + guessCount + " guesses!";
        updateScore(guessCount);
        resetButtons();
    }
    else if (num > answer) {
        let temp = "";
        if (diff <= 2){
            temp = "Hot!";
        }
        else if (diff <= 5){
            temp = "Warm.";
        }
        else {
            temp = "Cold."
        }
        document.getElementById('msg').textContent = "Too high. " + temp;
    }
    else {
        let temp = "";
        if (diff <= 2){
            temp = "Hot!";
        }
        else if (diff <= 5){
            temp = "Warm.";
        }
        else {
            temp = "Cold."
        }
        document.getElementById('msg').textContent = "Too low. " + temp;
    }
})

function updateScore(score){
    totalWins ++;
    totalGuesses += score;
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average score: " + (totalGuesses/totalWins).toFixed(2);
    scores.push(score);
    scores.sort(function(a,b){return a-b;});

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i=0; i < leaderboard.length; i++){
        if (i < scores.length) {
            leaderboard[i].textContent = scores[i];
        }
        else {
            leaderboard[i].textContent = "--";
        }
    }
}

function resetButtons() {
    document.getElementById('guessBtn').disabled = true;
    document.getElementById('giveUpBtn').disabled = true;
    document.getElementById('playBtn').disabled = false;

    let radios = document.getElementsByName("level");
    for (let i=0; i<radios.length; i++){
        radios[i].disabled = false;
    }
}


// onclick easy, medium, hard, if/elif func

// if player guess too high, #msg is high
// same for low/correct

// if guess > 5, cold, <= 5 warm, <= 2 hot

