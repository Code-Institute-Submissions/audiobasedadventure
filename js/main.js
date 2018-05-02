// IMPLEMENT TESTING ON USERINPUT
// use jquery
// build inventory
// implement verbs
// create item class
// create audio engine
// fix history
// build audio objects

// HOW TO IMPLEMENT JASMINE - wroks best for functions that return something. parser, printTo Log
// HOW TO SORT OUT LOADSOUND

var logArray = [];
var logHistoryArray = [];
var rooms = [];
var sounds = [];

var grandfatherClock;
var waterDrops;
var currentAudio;
var previousAudio;
var hasPlayed = false;






// PROCESS USER INPUT =============================================================================

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

        // print history
        if (userInput == "h") {
            printLogHistory();
            return;
        }

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

                    // this condition should evaluate to true if the key returns a room value
                    if (rooms[currentRoom.keyRoomDict[userInputWords[i]]] instanceof Object) {
                        // change currentRoom
                        console.log(typeof(rooms[currentRoom.keyRoomDict[userInputWords[i]]]));
                        currentRoom = rooms[currentRoom.keyRoomDict[userInputWords[i]]];
                        console.log("Current Room: " + currentRoom.name);
                        // process room attributes
                        processRoomAttributes();
                        // print new room description to log
                        printToLog(currentRoom.descriptions[currentRoom.descriptionIndex]);
                        return;
                    }
                    // If the key returns an undefined value
                    else {
                        // print the value associated with the key
                        printToLog(currentRoom.keyRoomDict[userInputWords[i]]);
                        return;
                    }
                }
                // if the keyValue is a number
                else {
                    currentRoom.descriptionIndex = currentRoom.keyRoomDict[userInputWords[i]];
                    currentRoom.playAudio = false;
                    printToLog(currentRoom.descriptions[currentRoom.descriptionIndex]);
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




// PARSER =========================================================================================

function parser(userInput) {
    userInput = userInput.replace("8", "eight")
    userInput = userInput.replace("history", "h");
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
    console.log("checked visibility")
    if (visibility == false) {
        document.getElementById("userInput").style.visibility = 'hidden';
    }
    if (visibility == true) {
        document.getElementById("userInput").style.visibility = 'visible';
        document.getElementById("userInput").focus();
    }
}
// ================================================================================================


// PRINT TO LOG ===================================================================================

function printToLog(textToPrint) {

    // add input to log
    logArray.push(textToPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");
    console.log("printed to log")

    // // keep scroll bar at bottom
    // var textarea = document.getElementById("console");
    // if (textarea != null) {
    //     textarea.scrollTop = textarea.scrollHeight;
    // }
}
// ================================================================================================



// PRINT LOG  HISTORY =============================================================================

function printLogHistory() {

    // print log
    document.getElementById("console").reset();
    document.getElementById("console").innerHTML += "\nLog history: " + (logHistoryArray.join("\n")) + "\n" +
        currentRoom.descriptions[currentRoom.descriptionIndex];
    console.log("printed log history")
}
// ================================================================================================





// AUDIO OBJECT =====================================================================================

let soundObject = function(audio, amplitude, pan, coordinates, active) {
    this.audio = audio;
    this.amplitude = amplitude;
    this.pan = pan;
    this.coordinates = coordinates;
    this.active = active;
};


sounds["grandfatherClock"] = new soundObject(grandfatherClock, .5, -1, [-1, 0], true);
sounds["waterDrops"] = new soundObject(waterDrops, .5, 1, [1, 0], true);



// ROOM OBJECT =====================================================================================

let Room = function(name, descriptions, descriptionIndex, keyRoomDict, inputVisible, inputVisibleAfterDelay, audioObject, displayDelayedDescription, coordinates, interactableItems) {
    this.name = name;
    this.descriptions = descriptions;
    this.descriptionIndex = descriptionIndex;
    this.keyRoomDict = keyRoomDict;
    this.inputVisible = inputVisible;
    this.inputVisibleAfterDelay = inputVisibleAfterDelay;
    this.audioObject = audioObject;
    this.coordinates = coordinates;
    this.interactableItems = interactableItems;
};

// last description is the delayed description

rooms["prologue"] = new Room("prologue", ["It is pitch black.", "Do you have the time?"], 0, { eight: "firstRoomMiddle" }, true, true, "grandfatherClock", [0, 0], [0]);



// MIDDLE 
rooms["firstRoomMiddle"] = new Room(
    "firstRoomMiddle", ["(m) The ground is completely soaked. There's about an inch of water and its freezing.", "Which way should you move?"], 0, { north: "firstRoomNorth", south: "firstRoomSouth", east: "firstRoomEast", west: "firstRoomWest" }, true, true, "waterDrops", [0, 0], []);


// NORTH
rooms["firstRoomNorth"] = new Room(
    "firstRoomNorth", ["n Which way should you move?"],
    0, { north: "(n) You walk north but collide head-first into what feels like a door... ouch", south: "firstRoomMiddle", east: "firstRoomEast", west: "firstRoomWest" }, true, true, "waterDrops", [0, 1], []);



// SOUTH
rooms["firstRoomSouth"] = new Room(
    "firstRoomSouth", ["(s) Which way should you move?"],
    0, { north: "firstRoomMiddle", south: "(s) You walk south but are obstructed by some sort of furniture...", east: "firstRoomEast", west: "firstRoomWest" }, true, true, "waterDrops", [0, -1], []);



// EAST
rooms["firstRoomEast"] = new Room(
    "firstRoomEast", ["(e) Which way should you move?"],
    0, { north: "firstRoomNorth", south: "firstRoomSouth", east: "(e) There's some sort of device in your way.", west: "firstRoomMiddle" }, true, true, "waterDrops", [1, 0], []);



// WEST
rooms["firstRoomWest"] = new Room(
    "firstRoomWest", ["((w) Which way should you move?"],
    0, { north: "firstRoomNorth", south: "firstRoomSouth", east: "firstRoomMiddle", west: "(w) There's a metal structure running along the wall." }, true, true, "waterDrops", [-1, 0], []);

// ================================================================================================

var currentRoom = rooms["prologue"];
