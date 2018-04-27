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
    printText(currentRoom.status + "\n" + exitsCombined.join("\n"));

    await sleep(currentRoom.delayTime);
    console.log(currentRoom.audioName + " finished")
    inputVisible(currentRoom.inputVisibleAfterDelay);
    printText(currentRoom.delayedDescription);
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
                currentRoom = rooms[currentRoom.keyRoomDict[userInputWords[i]]];
                console.log("Current Room: " + currentRoom.name);
                printText(printRoomInfo());
                return;
            }

        // return message when userInput does not contain keyString
        printText("Nothing happens...");
    }
}

// ================================================================================================







// ROOM OBJECT =====================================================================================

let Room = function(name, status, exits, keyRoomDict, delayTime, delayedDescription, inputVisible, inputVisibleAfterDelay, audio, audioName, playAudio) {
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

};

rooms["bellsRoom"] = new Room("bellsRoom", "It is pitch dark.", [], { eight: "seeLightRoom" }, 45000, "Do you have the time?", false, true, openingAudio, "opening audio", true);

rooms["seeLightRoom"] = new Room("seeLightRoom", "You see a sliver of light peeking through on the ground in front of you. \nIt must be from under a door. \nIs there someone out there?", [""], { door: "firstRoomNorth" }, 0, "", true, true, lightSwitchOnOff, "lightSwitchOnOff", true);

rooms["firstRoomNorth"] = new Room("firstRoomNorth", "The door is locked. \nMaybe theres something in you could use to open the door? \nTry looking around the room (north, south, east, west)", [""], { south: "bellsRoom" }, 10000, "Theres someone outside the door...", true, true, laugh_1, "laugh_1", true);

// ================================================================================================

var currentRoom = rooms["bellsRoom"];
