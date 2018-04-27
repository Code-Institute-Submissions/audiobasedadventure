// IMPLEMENT TESTING ON USERINPUT

var logArray = [];
var rooms = [];

var openingAudio = new Audio("audio/grandfather_clock.wav");
openingAudio.load();
var lightSwitchOnOff = new Audio("audio/light_switch_on_off.wav");
lightSwitchOnOff.load();
var laugh_1 = new Audio("audio/laugh_1.wav");
laugh_1.load();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// PLAY AUDIO =====================================================================================

function playAudio() {
    if (currentRoom.playAudio == true) {
        currentRoom.audio.play();
        console.log("playing " + currentRoom.audioName)
    }
}

// ================================================================================================



// INPUT VISIBLE ==================================================================================

function inputVisible(visibility) {
    if (visibility == false) {
        document.getElementById("userInput").style.visibility = 'hidden';
    }
    if (visibility == true) {
        document.getElementById("userInput").style.visibility = 'visible';
        document.getElementById("userInput").focus();
    }
}

// ================================================================================================



// PRINT TEXT =====================================================================================

function printText(toPrint) {
    // condition to confirm valid userInput
    if (toPrint == null) {
        toPrint = document.getElementById("userInput").value;
        if (toPrint == "") {
            document.getElementById("console").innerHTML += "<br>" + "Invalid user input";
        }
    }
    // add input to log
    console.log(toPrint);
    logArray.push(toPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");
    // keep scroll bar at bottom
    var textarea = document.getElementById("console");
    if (textarea != null) {
        textarea.scrollTop = textarea.scrollHeight;
    }
}
// ================================================================================================





// PRINTROOMINFO ===================================================================================

async function printRoomInfo() {

    var exitsCombined = [];
    for (var i = 0; i < currentRoom.exits.length; i++) {
        exitsCombined[i] = currentRoom.exits[i];
    }
    inputVisible(currentRoom.inputVisible);
    printText(currentRoom.status[currentRoom.statusIndex] + "\n" + exitsCombined.join("\n"));

    await sleep(currentRoom.delayTime);
    console.log(currentRoom.audioName + " finished")
    inputVisible(currentRoom.inputVisibleAfterDelay);
    if(currentRoom.displayDelayedDescription){
        printText(currentRoom.delayedDescription);
    }
    
}

// ================================================================================================




// PARSER ========================================================================================

function parser(userInput) {

    userInput = userInput.replace("8", "eight");
    return userInput;

}

// ================================================================================================


// EVALUATE USER INPUT ============================================================================

function evaluateUserInput() {

    var userInput = document.getElementById("userInput").value.toLowerCase();

    // check that user has inputted something
    if (userInput != "") {

        //parse userInput
        userInput = parser(userInput);
        console.log("userInput parsed: " + userInput);

        // split userInput into words
        var userInputWords = userInput.split(" ");


        // iterate through words in userInput
        for (var i = 0; i < userInputWords.length; i++)
            // if the word is a key of the keyRoomDict
            if (currentRoom.keyRoomDict[userInputWords[i]]) {
                console.log(currentRoom.keyRoomDict[userInputWords[i]]);
                logArray = [];
                // if the keyValue is a word
                if (isNaN(currentRoom.keyRoomDict[userInputWords[i]] * 1)) {
                    currentRoom = rooms[currentRoom.keyRoomDict[userInputWords[i]]];
                    console.log("Current Room: " + currentRoom.name);
                    printText(printRoomInfo());
                    return;
                }
                // if the keyValue is a number
                else {
                    currentRoom.statusIndex = currentRoom.keyRoomDict[userInputWords[i]];
                    currentRoom.playAudio = false;
                    currentRoom.displayDelayedDescription = false;
                    printText(printRoomInfo());
                    return;
                }
            }

        // return message when userInput does not contain keyString
        printText("Nothing happens...");
    }
}

// ================================================================================================







// ROOM OBJECT =====================================================================================

let Room = function(name, status, exits, keyRoomDict, delayTime, delayedDescription, inputVisible, inputVisibleAfterDelay, audio, audioName, playAudio, statusIndex, displayDelayedDescription) {
    this.name = name;
    this.status = status;
    this.exits = exits;
    this.keyRoomDict = keyRoomDict;
    this.delayTime = delayTime;
    this.delayedDescription = delayedDescription;
    this.inputVisible = inputVisible;
    this.inputVisibleAfterDelay = inputVisibleAfterDelay;
    this.audio = audio;
    this.audioName = audioName;
    this.playAudio = playAudio;
    this.statusIndex = statusIndex;
    this.displayDelayedDescription = displayDelayedDescription;

};

rooms["firstRoomMiddle"] = new Room("firstRoom", ["It is pitch dark.", "Which way should you move?"], [], { eight: "1", right: "secondRoom" }, 45000, "Do you have the time?", false, true, openingAudio, "opening audio", true, 0, true);




// ================================================================================================

var currentRoom = rooms["firstRoomMiddle"];
