function selectItem (){
    //returns a random item out of array of items
    var itemArray = ["Taylor Swift", "Bruno Mars", "Rihanna"];
    var item = itemArray[Math.floor(Math.random() * itemArray.length)];
    console.log(item);
    return item;
}

function startItem (item){
    //takes selected item and returns a string of underscores with equal length to the item, spaces will stay as spaces
    var blankItem = "";
    for (var i=0; i<item.length; i++){
        if (item[i]==" "){
            blankItem = blankItem + " ";
        } else {
            blankItem = blankItem + "_";
        }
    }
    // console.log("blankItem = "+ blankItem);
    return blankItem;
}

function checkKey(key){
    //check to make sure key pressed is one of abcdefghijklmnopqrstuvwxyz1234567890, also make sure key is lower case
    var validKeys = "abcdefghijkklmnopqrstuvwxyz1234567890";
    key = key.toLowerCase();
    if (validKeys.indexOf(key)<0){
        key = "";
    }
    // console.log(validKeys.indexOf(key));
    return key;
}

function setCharAt(string,i,newChar) {
    //replaces character in string at i with newChar
    if(i > string.length-1) return string;
    return string.substr(0,i) + newChar + string.substr(i+1);
}

function recordKey(event){
    //main function
    var key = event.key;
    console.log("before check key = "+ key);
    key = checkKey(key);
    console.log("after check key = "+ key);
    if (item.toLowerCase().indexOf(key)<0){  //checks key against lower case version of the answer
        if (wrongLetters.indexOf(key)<0){  //checks key against list of wrong letters/numbers guessed
            console.log("wrongLetters = "+wrongLetters);
            console.log("wrongLetters.indexOf(key) = "+wrongLetters.indexOf(key));
            numberOfGuesses++;
            var guesses = document.querySelector('#guesses');
            guesses.innerText = "The number of guesses is "+ (numberOfGuesses);
            var letters = document.querySelector('#letters');
            wrongLetters=wrongLetters+key;
            letters.innerText = "The letters guessed are "+wrongLetters;
        }
    } else {
        for (var i=0; i<item.length; i++){
            // console.log("i = "+ i);
            // console.log("item[i] = "+ item[i]);
            if (key==item.toLowerCase()[i]){
                // console.log("blankItem before = "+ blankItem);
                blankItem = setCharAt(blankItem,i,item[i]);
                // console.log("blankItem after = "+ blankItem);
            }
        }
    }
    console.log("blankItem = "+ blankItem);
    var answer = document.querySelector('#answer');
    answer.innerText = "The answer is "+blankItem;
    
    
}

var item = selectItem();
var blankItem = startItem(item);
var numberOfGuesses = 0;
var wrongLetters = "";
document.onkeyup = recordKey;