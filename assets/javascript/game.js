var itemArray = ["Taylor Swift", "Bruno Mars", "Rihanna", "Idina Menzel", "LMFAO", "Justin Bieber", "Adele", "Katy Perry", "Miley Cyrus", "Michael Jackson", "Alicia Keys"];
var item = "";
var blankItem = "";
var validKeys = "abcdefghijkklmnopqrstuvwxyz";
var numberOfGuessesLeft = 0;
var numberOfWins = 0;
var youtubeArray = ["3gxPgU2-ih4","BSiN-Ze3idc","5f2mZSk-nvU","A_DaizJnnJQ","K1GKCBYtf1M","ZH9MDQSH_Z0","wq3zEOcXyGA","Oq_OvVavrN8","rPzqF2pzCKE","XCr6kR2UK4k","bSJSU9GPzHM"];
var youtube = "";
var lastGame = "";
var lastAnswer = ""

//Adele rolling in the deep   https://www.youtube.com/watch?v=3Nxxo9E2_x8
//justin timberlake sexyback  https://www.youtube.com/watch?v=zgxPkjhdr-U

function selectItem (){
    //returns a random item out of array of items, also make sure the chosen item is different than the previous item if applicable
    while (item==lastAnswer){
        var i = Math.floor(Math.random() * itemArray.length);
        item = itemArray[i];
        youtube = youtubeArray[i];
    }
}

function startItem (){
    //takes selected item and returns a string of underscores with equal length to the item, spaces will stay as spaces
    blankItem = "";
    for (var i=0; i<item.length; i++){
        if (item[i]==" "){
            blankItem = blankItem + " ";
        } else {
            blankItem = blankItem + "_";
        }
    }
}

function checkKey(key){
    //check to make sure key pressed is one of abcdefghijklmnopqrstuvwxyz, also make sure key is lower case
    key = key.toLowerCase();
    if (validKeys.indexOf(key)<0){
        key = "";
    }
    return key;
}

function setCharAt(string,i,newChar) {
    //replaces character in string at i with newChar
    if(i > string.length-1) return string;
    return string.substr(0,i) + newChar + string.substr(i+1);
}

function recordKey(event){
    //main function
    var answer = document.querySelector('#answer');
    var guesses = document.querySelector('#guesses');
    var letters = document.querySelector('#letters');
    var wins = document.querySelector('#score');
    var winLose = document.querySelector('#winLoseMessage');

    if (numberOfGuessesLeft==0||blankItem.indexOf("_")<0){ // if number of guesses have run out or game was won, initialize the game
        selectItem(); //pick an item
        startItem(); //convert it to blanks

        if (lastGame=="win"){  //if the last game was won, then a video has played, so for this new game, the video should be removed by removing the iframe with id="player"
            var a = document.getElementById("player");
            a.parentNode.removeChild(a);
        }
        addDiv = document.createElement("DIV"); //now add a new div with id="player" into id="append"
        addDiv.id = "player";
        document.getElementById("append").appendChild(addDiv);

        answer.innerText = blankItem; //show new word as blanks
        numberOfGuessesLeft=10; //reset number of guesses
        guesses.innerText = numberOfGuessesLeft; //display number of guesses
        wrongLetters = "...";  //reset list of letters guessed
        letters.innerText = wrongLetters; //display list of letters guessed
        wins.innerText = numberOfWins; //display score

    } else { //game continues
        var key = event.key;
        key = checkKey(key);
        if (item.toLowerCase().indexOf(key)<0){  //checks key against lower case version of the answer
            if (wrongLetters.indexOf(key)<0){  //checks key against list of wrong letters guessed
                numberOfGuessesLeft--;  //decrease number of guess
                guesses.innerText = numberOfGuessesLeft;  //display number of guess
                wrongLetters=wrongLetters+key;  //add letter to list of wrong letters
                letters.innerText = wrongLetters;  //display new list
            }
        } else {  //if we're here, then we successfully guessed a letter correctly
            for (var i=0; i<item.length; i++){  //search the whole string and replace the correct underscores with the letter
                if (key==item.toLowerCase()[i]){
                    blankItem = setCharAt(blankItem,i,item[i]);
                }
            }
        }
        answer.innerText = blankItem;

        if (blankItem.indexOf("_")<0){ //answer was successfully guessed
            numberOfWins++;
            wins.innerText = numberOfWins;
            winLose.innerText = "You win! Enjoy the video!";
            lastGame="win";
            lastAnswer=item;  //recording this answer because i don't want the next game to have the same answer as this one
            var playerdiv = document.querySelector("#player");
            playerdiv.innerHTML = '<iframe width="640" height="390" src="https://www.youtube.com/embed/'+ youtube +'?autoplay=1&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
    
        if (numberOfGuessesLeft==0){ //number of guesses have run out
            answer.innerText = item; //still display answer when game is lost
            winLose.innerText = "You lose!";
            lastGame="lose";
            lastAnswer=item;
        }
    }
}

document.onkeyup = recordKey;
