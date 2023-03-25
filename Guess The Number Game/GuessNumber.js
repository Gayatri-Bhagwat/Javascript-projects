'use strict';
// /SELECTING THE HTML ELEMENTS - 👇🏻
console.log(document.querySelector('.message').textContent);
const element = document.querySelector('.label-score');
console.log(element.textContent);

// SETTING THE CONTENT OF THE ELEMENT - 👇🏻
document.querySelector('.message').textContent = 'Correct Number!🎉';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 15;

// document.querySelector('.guess').value = 34;
console.log(document.querySelector('.guess').value);

// GUESS MY NUMBERS - 😊
let score = 20;
let secretNumber = Math.trunc(Math.random()*20) + 1;
let highScore = 0;
const displayMessage= (message) => {
    document.querySelector('.message').textContent = message;
}
// document.querySelector('.number').textContent = secretNumber;
//trunc will remove all decimal places and Math.random() will generate a random number between 0 to 20;
document.querySelector('.check').addEventListener
('click' , function() {
   const guess =  Number(document.querySelector('.guess').value);
   //though input is a number but it's type is string so convert it to the number 
   console.log(guess,typeof guess);

   if(!guess) {
    displayMessage('No Number!🥺');
   }
   //whenever user guesses the correct number then change the background 
   //to green colour and change width of secret number filed
   else if(guess === secretNumber) {
    displayMessage('Correct Number!🎉');
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    //highscore should be greater than the score and it should updated when user guesses number correctly
    if (score > highScore)
    {
        highScore = score;
        document.querySelector('.highscore').textContent=highScore;
    }
   }
   //when the guess is wrong - 
   else if(guess !== secretNumber)
   {
    if(score > 1 )
    {
        displayMessage( guess > secretNumber ? 'Too high!👆🏻' : 'Too Low! 👇🏻');
        score--;
        document.querySelector('.score').textContent = score;
    }
    else 
    {
        document.querySelector('.message').textContent = 'You lost Your Game !😑'
        document.querySelector('.score').textContent = 0;
    }
   }

   else if(guess > secretNumber) {
    //if score is greater than 1 then only decrement the count else loose the game.
    if(score > 1 )
    {
        document.querySelector('.message').textContent =  guss > secretNumber ? 'Too high!👆🏻' : 'Too Low! 👇🏻';
        score--;
        document.querySelector('.score').textContent = score;
    }
    else 
    {
        document.querySelector('.message').textContent = 'You lost Your Game !😑'
        document.querySelector('.score').textContent = 0;
    }
   }
   else if(guess < secretNumber) {
    if(score > 1 )
    {
        document.querySelector('.message').textContent = 'Too Low!👇🏻';
        score--;
        document.querySelector('.score').textContent = score;
    }
    else 
    {
        document.querySelector('.message').textContent = 'You lost Your Game !😑'
        document.querySelector('.score').textContent = 0;
    }
   }
});

document.querySelector('.again').addEventListener
('click' , function() {
    score = 20;
    secretNumber = Math.trunc(Math.floor() * 20) + 1;
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent=score;
    document.querySelector('.guess').value = NaN; 
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width='15rem';
} );

let a=23;
console.log(a);
