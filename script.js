let inputNumber = document.getElementById('numberInput');
let submitBtn = document.getElementById('submitNumberBtn');
let messageBox = document.getElementById('msgBox');
let randomNumber;
let isGameOver = false;
let chanceTaken = 0;
let chanceTakenElem = document.getElementById('chanceTaken');
let WinAudio = new Audio('./sources/music.mp3');

//Generating Random Numbers in Backend for User
let generateRandomNumber = ()=>{
    let numberGenerated = Math.round(Math.random()*100);
    randomNumber = numberGenerated;
}
// Calling Function to generate Number Initially
generateRandomNumber()

//Function to send alert with different messages in messageContainer
function throwAlert(message) {
    messageBox.innerHTML = '';
    let messageElem = document.createElement('p');
    messageElem.innerText = message;
    messageBox.append(messageElem)
}

//Div to display when user has won the game
let wonDiv = document.querySelector('.wonDiv');

submitBtn.addEventListener('click',()=>{

    //Redirecting to game after winning the game (Play Again)
    if (isGameOver === true) {
        inputNumber.style.display = 'flex';
        submitBtn.innerText = 'Submit';
        wonDiv.style.display = 'none'
        isGameOver = false;
        chanceTaken = 0; //Setting chance Taken to 0 to reset the game
        chanceTakenElem.innerText = chanceTaken
        generateRandomNumber() //Generating different number 
        return
    }

    //Making Input value from String to Number Ex- "25" to 25
    let numberInputFromUser = parseInt(inputNumber.value)

    //If Input value is not a Number (NaN) or the value is Empty
    if (numberInputFromUser === '' || !numberInputFromUser) {
        inputNumber.value = ''
        return throwAlert('Please Enter a Number')
    }

    //If Input value is less then 0 or greater than 100
    if (numberInputFromUser < 0 || numberInputFromUser > 100) {
        inputNumber.value = ''
        return throwAlert('Please Enter Number between 1 - 100')
    }

    //If user predicted the corrent Random Number, win the user and display wonDiv
    if (numberInputFromUser === randomNumber) {
        inputNumber.value = ''
        inputNumber.style.display = 'none';
        submitBtn.innerText = 'Play Again';
        wonDiv.style.display = 'flex'
        throwAlert(`Congratulations, You Won! The random Number was ${randomNumber}`)
        isGameOver = true;
        WinAudio.play()
        return
    }


    //If User predicted greater or lesser number.
    if (numberInputFromUser > randomNumber) {
        inputNumber.value = ''
        throwAlert('Sorry, You have predicted a greater number. Try Again')
    }else{
        inputNumber.value = ''
        throwAlert('Sorry, You have predicted a lesser number. Try Again')
    }
    chanceTaken += 1 // Increasing Chances of user 
    chanceTakenElem.innerText = chanceTaken
})

//Making UX Easy
window.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter') {
        submitBtn.click()
    }
})
