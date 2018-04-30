// IMPLEMENT TESTING ON USERINPUT
// make delayed description occur on audio end
// fix scroll bar issue
// get user input once
// use jquery
// build inventory
// implement verbs
// create item class

var logArray = [];
var logHistoryArray = [];
var rooms = [];

var openingAudio = new Audio("audio/grandfather_clock.wav");
openingAudio.load();
var lightSwitchOnOff = new Audio("audio/light_switch_on_off.wav");
lightSwitchOnOff.load();
var laugh_1 = new Audio("audio/laugh_1.wav");
laugh_1.load();



// PROCESS USER INPUT ============================================================================

function processUserInput() {

    // userInput is made into lower case
    var userInput = document.getElementById("userInput").value.toLowerCase();

    // check that user has inputted something
    if (userInput != "") {

        // print userInput in console
        printToLog(userInput);

        // parse userInput
        userInput = parser(userInput);
        console.log("userInput parsed: " + userInput);

        // split userInput into words
        var userInputWords = userInput.split(" ");

        // iterate through words in userInput
        for (var i = 0; i < userInputWords.length; i++)
            // if the word is a key of the keyRoomDict
            if (currentRoom.keyRoomDict[userInputWords[i]]) {
                console.log(currentRoom.keyRoomDict[userInputWords[i]]);

                // add the current log to the logHistoryArray
                logHistoryArray = logHistoryArray.concat(logArray);
                // empty the log
                logArray = [];

                // if the keyValue is a word
                if (isNaN(currentRoom.keyRoomDict[userInputWords[i]] * 1)) {
                    // change currentRoom
                    currentRoom = rooms[currentRoom.keyRoomDict[userInputWords[i]]];
                    console.log("Current Room: " + currentRoom.name);
                    // process room attributes
                    processRoomAttributes();
                    // print new room description to log
                    printToLog(currentRoom.descprition[currentRoom.descriptionIndex]);
                    // play new room audio
                    playAudio();
                    return;
                }
                // if the keyValue is a number
                else {
                    currentRoom.descriptionIndex = currentRoom.keyRoomDict[userInputWords[i]];
                    currentRoom.playAudio = false;
                    currentRoom.displayDelayedDescription = false;
                    printToLog(currentRoom.description);
                    return;
                }
            }
        // return message when userInput does not contain keyString
        printToLog("Nothing happens...");
    }
    else {
        console.log("Empty userInput")
    }
}
// ================================================================================================

// PARSER ========================================================================================

function parser(userInput) {
    userInput = userInput.replace("8", "eight");
    return userInput;
}

// ================================================================================================


// PROCESS ROOM ATTRIBUTES ========================================================================

function processRoomAttributes() {

    // check the inputVisible attribute of the current room
    inputVisible(currentRoom.inputVisible);
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


// PRINT TO LOG =====================================================================================

function printToLog(textToPrint) {

    // add input to log
    logArray.push(textToPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");

    // keep scroll bar at bottom
    var textarea = document.getElementById("console");
    if (textarea != null) {
        textarea.scrollTop = textarea.scrollHeight;
    }
}
// ================================================================================================



// AUDIO =====================================================================================

function playAudio() {
    if (currentRoom.playAudio == true) {
        currentRoom.audio.play();
        console.log("playing " + currentRoom.audioName)
    }
    // runs audioEndedFunction when audio has ended
    currentRoom.audio.addEventListener('ended', function() {
        console.log(currentRoom.audioName + " ended")
        // print last description in array
        printToLog(currentRoom.descriptions[currentRoom.descriptions.length-1])
    })
}

// ================================================================================================


// AUDIO ON END =====================================================================================

function audioEnded() {
    console.log(currentRoom.audioName + " finished")
    inputVisible(currentRoom.inputVisibleAfterDelay);
    if (currentRoom.displayDelayedDescription) {
        printToLog(currentRoom.delayedDescription);
    }
}

// ================================================================================================


















// ROOM OBJECT =====================================================================================

let Room = function(name, descriptions, descriptionIndex, keyRoomDict, inputVisible, inputVisibleAfterDelay, audio, audioName, playAudio, displayDelayedDescription) {
    this.name = name;
    this.descriptions = descriptions;
    this.descriptionIndex = descriptionIndex;
    this.keyRoomDict = keyRoomDict;
    this.inputVisible = inputVisible;
    this.inputVisibleAfterDelay = inputVisibleAfterDelay;
    this.audio = audio;
    this.audioName = audioName;
    this.playAudio = playAudio;
};

// last description is the delayed description

rooms["firstRoomMiddle"] = new Room("firstRoom", ["It is pitch black.", "Which way should you move?", "Do you have the time?"], 0, { eight: "1", right: "secondRoom" }, false, true, openingAudio, "opening audio", true);


// ================================================================================================

var currentRoom = rooms["firstRoomMiddle"];
