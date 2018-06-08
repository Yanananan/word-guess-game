var itemArray = ["Taylor Swift", "Bruno Mars", "Rihanna"];
var item = ""
var blankItem = ""
var validKeys = "abcdefghijkklmnopqrstuvwxyz1234567890";
var numberOfGuessesLeft = 0;
var numberOfWins = 0;
var youtubeArray = ["3gxPgU2-ih4","BSiN-Ze3idc","5f2mZSk-nvU"];
var youtube = ""


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
//bruno mars uptown funk https://www.youtube.com/watch?v=BSiN-Ze3idc

function selectItem (){
    //returns a random item out of array of items
    var i = Math.floor(Math.random() * itemArray.length);
    item = itemArray[i];
    youtube = youtubeArray[i];
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


        if (numberOfWins>0){
            var a = document.getElementById("player");
            a.parentNode.removeChild(a);
        }
        addDiv = document.createElement("DIV");
        addDiv.id = "player";
        document.getElementById("append").appendChild(addDiv);

        answer.innerText = "The answer is "+blankItem;

        numberOfGuessesLeft=10;
        guesses.innerText = "The number of guesses is 10";
        
        wrongLetters = "...";
        
        letters.innerText = "The letters guessed are "+wrongLetters;

        wins.innerText = "Your score is "+numberOfWins;

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
                // var guesses = document.querySelector('#guesses');
                guesses.innerText = "The number of guesses is "+ (numberOfGuessesLeft);
                // var letters = document.querySelector('#letters');
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
        // var answer = document.querySelector('#answer');
        answer.innerText = "The answer is "+blankItem;

        if (blankItem.indexOf("_")<0){ //answer was successfully guessed
            
            numberOfWins++;
            var wins = document.querySelector('#score');
            wins.innerText = "Your score is "+numberOfWins;
            winLose.innerText = "You win! Enjoy the video! Press any key to start a new game!";
            loadYoutube();
        }
    
        if (numberOfGuessesLeft==0){ //number of guesses have run out
            // var winLose = document.querySelector('#winLoseMessage');
            winLose.innerText = "You lose! Press any key to start a new game!";
        }
    }
}



document.onkeyup = recordKey;

//everything from this point on is copied from Youtube. The goal is to have the corresponding youtube video load and play when the correct answer is guessed.

function loadYoutube(){ 
    // 2. This code loads the IFrame Player API code asynchronously.
    if (numberOfWins==1){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: youtube,
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
    // if (event.data == YT.PlayerState.ENDED) {
    //     console.log($('#player').remove());
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}
