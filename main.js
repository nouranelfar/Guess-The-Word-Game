const randomWords = ["apple","flower","water","banana","mango","egypt","elephant","lion","chair","mirror"];
let unorderedWord = document.getElementById("word");
let randomBtn = document.getElementById("random");
let gussingTheWord = document.getElementById("gussing_the_word");
let resetBtn = document.getElementById("reset");
const inputs = document.getElementsByTagName("input");
let currentWord = 0;

//make a random word
function scramWord(word){
  currentWord = Math.floor(Math.random()*10);
  return word;
}

//mix the letters
function generateRandomWord(){
  scramWord(randomWords[currentWord]);
  let randomWord = (randomWords[currentWord]);
  let sorted = randomWord.split("").sort().join("");
  unorderedWord.textContent = sorted;
  createInputFields();
}

//make the cells base of the num of the 
function createInputFields(){
  gussingTheWord.innerHTML = " ";
  for(index = 0 ; index < randomWords[currentWord].length; index++){
    let item = document.createElement("input");
    item.type = "text";
    item.name = "input_cell";
    item.setAttribute("aria-label","letter input")
    //write only one letter in every cell .
    item.maxLength = "1";
    gussingTheWord.appendChild(item);
  }
  handleInput();
  inputs[0].focus();
}


function handleInput(){
    let originalWord = (randomWords[currentWord]);
    let mistakeLetters = [];
    let mistake = 0;
    let currentIndex = 0;
    Array.from(inputs).forEach((input , index)=>{
      input.addEventListener("input",(e)=>{
        let inputValue = e.target.value;
          
        if(inputValue.length === 1){
            //compare the index of the string with the index of the input & the letter of string with the input value.
            if(currentIndex === index && originalWord[currentIndex] === inputValue){
              currentIndex++;
              if(index + 1 < inputs.length){
                inputs[index + 1].focus();
              }
              if(currentIndex === originalWord.length){
                setTimeout(()=>{
                alert("Success");
                resetGame();
                generateRandomWord();
                },100);
              }             
             }else{
                mistake++;
                let triesNum = document.getElementById("tries_num");
                triesNum.textContent = "Tries (" + mistake + "/5)";

                mistakeLetters.push(inputValue);
                mistakeWords.textContent = mistakeLetters.join(" , ");
                circles[mistake-1].style.backgroundColor = "#7429C6";

                if(mistake >= 5){
                  setTimeout(()=>{
                  alert("Game Over");
                  resetGame();
                  generateRandomWord();
                  },100);
                }
              }
              
            }
        })
      })
}

let mistakeWords = document.getElementById("mistake_words");
let circles = document.getElementsByClassName("circle");
let triesNum = document.getElementById("tries_num");

function resetGame(){
  mistake = 0;
  mistakeWords.textContent = " ";
  mistakeLetters = [];
  triesNum.textContent = "Tries (0/5): "
  Array.from(circles).forEach((circle)=>{
      circle.style.backgroundColor = "#4A5567";
  });
  createInputFields();
}

randomBtn.addEventListener("click",function(){
  generateRandomWord();
  resetGame();
});

resetBtn.addEventListener("click",function(){
  resetGame();
});

//set a random word by default when the game is loaded.
generateRandomWord();

