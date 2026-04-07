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

});

document.getElementById('')

// onclick easy, medium, hard, if/elif func

// if player guess too high, #msg is high
// same for low/correct

// if guess > 5, cold, <= 5 warm, <= 2 hot

