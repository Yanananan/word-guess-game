
function selectItem (){
    //returns a random item out of array of items
    var itemArray = ["Taylor Swift", "Bruno Mars", "Rihanna"];
    var item = itemArray[Math.floor(Math.random() * itemArray.length)];
    // console.log(item);
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
    if (numberOfGuessesLeft==0||blankItem.indexOf("_")<0){ //number of guesses have run out or game is won
        item = selectItem();
        blankItem = startItem(item);
        var answer = document.querySelector('#answer');
        answer.innerText = "The answer is ...";
        var guesses = document.querySelector('#guesses');
        guesses.innerText = "The number of guesses is 10";
        numberOfGuessesLeft=10;
        var letters = document.querySelector('#letters');
        letters.innerText = "The letters guessed are ...";
        wrongLetters = "";
        var winLose = document.querySelector('#winLose');
        winLose.innerText = "";
    } else { //game continues
        var key = event.key;
        console.log("before check key = "+ key);
        key = checkKey(key);
        console.log("after check key = "+ key);
        if (item.toLowerCase().indexOf(key)<0){  //checks key against lower case version of the answer
            if (wrongLetters.indexOf(key)<0){  //checks key against list of wrong letters/numbers guessed
                console.log("wrongLetters = "+wrongLetters);
                console.log("wrongLetters.indexOf(key) = "+wrongLetters.indexOf(key));
                numberOfGuessesLeft--;
                var guesses = document.querySelector('#guesses');
                guesses.innerText = "The number of guesses is "+ (numberOfGuessesLeft);
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

        if (blankItem.indexOf("_")<0){ //answer was successfully guessed
            var winLose = document.querySelector('#winLose');
            winLose.innerText = "You win!";
        }
    
        if (numberOfGuessesLeft==0){ //number of guesses have run out
            var winLose = document.querySelector('#winLose');
            winLose.innerText = "You lose!";
        }
    }
}


var numberOfGuessesLeft = 0;
document.onkeyup = recordKey;

//rihanna diamond https://www.youtube.com/watch?v=5f2mZSk-nvU
//taylor trouble  https://www.youtube.com/watch?v=3gxPgU2-ih4
//Idina Menzel  let it go     https://www.youtube.com/watch?v=A_DaizJnnJQ
//Adele rolling in the deep   https://www.youtube.com/watch?v=3Nxxo9E2_x8
//LMFAO sexy and i know it https://www.youtube.com/watch?v=K1GKCBYtf1M
//bieber baby https://www.youtube.com/watch?v=ZH9MDQSH_Z0
//Adell Hello  https://www.youtube.com/watch?v=wq3zEOcXyGA
//one direction what makes you beautiful https://www.youtube.com/watch?v=aqXM0OzsDn0
//justin timberlake sexyback  https://www.youtube.com/watch?v=zgxPkjhdr-U
//michael jackson thriller  https://www.youtube.com/watch?v=XCr6kR2UK4k
//katy perry firework https://www.youtube.com/watch?v=Oq_OvVavrN8
//alicia keys girl on fire https://www.youtube.com/watch?v=bSJSU9GPzHM
//miley cyrus party in the usa  https://www.youtube.com/watch?v=rPzqF2pzCKE