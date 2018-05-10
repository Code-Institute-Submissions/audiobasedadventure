'use strict';

// IMPLEMENT TESTING ON USERINPUT
// use jquery
// build inventory
// implement verbs
// create item class
// create audio engine
// fix history
// fix parsing

// restart function

// HOW TO IMPLEMENT JASMINE - wroks best for functions that return something. parser, printTo Log
// HOW TO SORT OUT LOADSOUND

var logArray = [];
var logHistoryArray = [];
var verbs = [];
var rooms = [];
var sounds = [];
var audioId = [];
var directionNouns = ["north", "south", "east", "west"];


var waterDrops = new Howl({
    src: ['audio/waterDrops.mp3'],
    loop: true,
    volume: 0.3
});

var snoring = new Howl({
    src: ['audio/snoring.mp3'],
    loop: true,
    volume: 0.2
});

var snoreWakeUp = new Howl({
    src: ['audio/snoreWakeUp.mp3'],
    loop: false,
    volume: 0.8
});

var hitWithClub = new Howl({
    src: ['audio/hitWithClub.mp3'],
    loop: false,
    volume: 0.5
});

var radioStatic = new Howl({
    src: ['audio/radioStatic.mp3'],
    loop: true,
    volume: 0.7
});

var footSteps = new Howl({
    src: ['audio/footSteps.mp3'],
    loop: false,
    volume: 0.5
});

var footStepsInWater = new Howl({
    src: ['audio/footStepsInWater.mp3'],
    loop: false,
    volume: 0.2
});

var currentAudio;
var previousVolume;
var previousRoom = "se";
var behindAttenuator
var hasPlayed = false;



// UNCONSCIOUS ====================================================================================

function unconscious() {
    hitWithClub.play();
    for (var j = 0; j < currentRoom.audioObject.length; j++) {
        sounds[currentRoom.audioObject[j]].audio[0].mute(true);
    }
    printToLog("You are unconscious...\n\nType 'restart' to play again")
}
//  ===============================================================================================





// VERB FUNCTIONS  ================================================================================

function go(directionNoun) {

    // if the direction noun is a valid direction noun
    if (directionNouns.indexOf(directionNoun) >= 0) {


        console.log(currentRoom.keyRoomDict[directionNoun]);
        console.log(rooms);
        console.log(rooms.indexOf(currentRoom.keyRoomDict[directionNoun]));

        // if the directionNoun returns a room

        // this condition should evaluate to true if the key returns a room value
        if (rooms[currentRoom.keyRoomDict[directionNoun]] instanceof Object) {

            // add the current log to the logHistoryArray
            logHistoryArray = logHistoryArray.concat(logArray);
            // empty the log
            logArray = [];

            // change current room
            currentRoom = rooms[currentRoom.keyRoomDict[directionNoun]];

            // process room attributes
            processRoomAttributes();

            // print new room description to log
            printToLog(currentRoom.descriptions[currentRoom.descriptionIndex]);

            // playCurrentRoomAudio
            playCurrentRoomAudio();

        }

        else {
            // print the value associated with the key
            printToLog(currentRoom.keyRoomDict[directionNoun]);
            return;
        }
    }
    // if the directionNoun is not a valid direction
    else {
        printToLog("You must specify a valid direction ('n', 's', 'e', 'w')");
    }
    return;
}
//  ===============================================================================================








// VERB OBJECTS  ==================================================================================

// ## GO ##

let verb = function(verbName, process) {
    this.verbName = verbName;
    this.process = function(directionNoun) {
        go(directionNoun)
    };
};
let verb1 = new verb("go", go);
verbs.push(verb1);

//  ===============================================================================================















// PROCESS USER INPUT =============================================================================

function processUserInput() {

    // userInput is made into lower case
    var userInput = document.getElementById("userInput").value.toLowerCase();

    // check that user has inputted something
    if (userInput != "") {

        // // print userInput in console
        // printToLog(userInput);

        // parse userInput
        userInput = parser(userInput);

        // split userInput into words
        var userInputWords = userInput.split(" ");

        // for every valid verb
        for (var i = 0; i < verbs.length; i++) {

            // if the user's first word is a valid verb
            if (userInputWords[0] == verbs[i].verbName) {

                // check that the user has given a second word
                if (userInputWords.length > 1) {
                    // input the second word to the verb function
                    verbs[i].process(userInputWords[1]);
                }
                else {
                    printToLog("You must provide a second word when using " + userInputWords[0]);
                }
            }
            else {
                printToLog("First word should be a verb");
            }
        }
    }
    // if the user has not inputted anything
    else {
        printToLog("Empty userInput")
    }
}
// ================================================================================================




// PARSER =========================================================================================

function parser(userInput) {
    userInput = userInput.replace("n", "north");
    userInput = userInput.replace("s", "south");
    userInput = userInput.replace("e", "east");
    userInput = userInput.replace("w", "west");
    userInput = userInput.replace("history", "h");
    return userInput;
}

// ================================================================================================





// PROCESS ROOM ATTRIBUTES ========================================================================

function processRoomAttributes() {

    // check the inputVisible attribute of the current room
    inputVisible(currentRoom.inputVisible);



    // When in NE
    if (currentRoom.name == "ne") {
        sounds["snoring"].active = false;
        sounds["snoreWakeUp"].active = true;
    }
    else {
        sounds["snoring"].active = true;
        sounds["snoreWakeUp"].active = false;
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






// PRINT TO LOG ===================================================================================

function printToLog(textToPrint) {

    // add input to log
    logArray.push(textToPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");

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
}
// ================================================================================================





// AUDIO ENGINE ===================================================================================

function playCurrentRoomAudio() {

    if (previousRoom != currentRoom.name) {
        footStepsInWater.play();
        previousRoom = currentRoom.name;
    }


    for (var i = 0; i < currentRoom.audioObject.length; i++) {

        if ((!sounds[currentRoom.audioObject[i]].audio[0].playing(audioId[i]))) {
            audioId[i] = sounds[currentRoom.audioObject[i]].audio[0].play();
        }

        // stop audio if audio.active is false
        if (!sounds[currentRoom.audioObject[i]].active) {
            sounds[currentRoom.audioObject[i]].audio[0].stop(audioId[i]);
        }






        // PANNING  ===============================================================================

        // angle between player and soundsource in degrees
        var angleDeg = Math.atan2(sounds[currentRoom.audioObject[i]].coordinates[1] - currentRoom.coordinates[1], sounds[currentRoom.audioObject[i]].coordinates[0] - currentRoom.coordinates[0]) * 180 / Math.PI;

        // at 1 unless sound is behind.
        behindAttenuator = 1;

        // make all values positive
        if (angleDeg < 0) {
            behindAttenuator = 1.2;
            angleDeg = angleDeg * -1;
        }

        // scaling 0-180 degrees to minus1 - 1 to satisfy requirements of stereo function.
        var scaledPan = 2 / 180 * angleDeg;
        scaledPan = scaledPan - 1;
        scaledPan = scaledPan * -1;

        sounds[currentRoom.audioObject[i]].audio[0].stereo(scaledPan, audioId[i]);

        // ========================================================================================





        // VOLUME  ================================================================================

        var distanceToSound = Math.sqrt(Math.pow(sounds[currentRoom.audioObject[i]].coordinates[0] - currentRoom.coordinates[0], 2) + Math.pow(sounds[currentRoom.audioObject[i]].coordinates[1] - currentRoom.coordinates[1], 2));

        // mapping distance values to a unit scale with logarithmic spacing 
        var scaledVolume = Math.log(1 + distanceToSound) / Math.log(1 + 20);

        scaledVolume = scaledVolume * behindAttenuator;

        // if there is no previous volume
        if (isNaN(previousVolume)) {
            previousVolume = (1 - scaledVolume);
        }

        // adjusting volume for distance between sound and player over two seconds
        sounds[currentRoom.audioObject[i]].audio[0].fade(previousVolume, (1 - scaledVolume), 2200, audioId[i]);

        // remember volume
        previousVolume = (1 - scaledVolume);


        //ONENDAUDIO 

        // if an audio object has an onendAudio value
        if (sounds[currentRoom.audioObject[i]].audio.length > 1) {

            // when the audio of the object finishes playing
            sounds[currentRoom.audioObject[i]].audio[0].on('end', function() {
                if (this == snoreWakeUp) {
                    unconscious();
                }
            }, audioId[i]);
        }
    }
}

// ================================================================================================








// AUDIO OBJECT ===================================================================================

let soundObject = function(audio, coordinates, active) {
    this.audio = audio;
    this.coordinates = coordinates;
    this.active = active;
};

sounds["waterDrops"] = new soundObject([waterDrops], [20, 15], true);
sounds["snoring"] = new soundObject([snoring], [8, 28], true);
sounds["snoreWakeUp"] = new soundObject([snoreWakeUp, hitWithClub], [8, 28], false);
sounds["radioStatic"] = new soundObject([radioStatic], [8, 29], true);

// ================================================================================================









// ROOM OBJECT ====================================================================================

let Room = function(name, descriptions, descriptionIndex, keyRoomDict, inputVisible, inputVisibleAfterDelay, audioObject, coordinates, interactableItems) {
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

// rooms["prologue"] = new Room("prologue", ["It is pitch black.", "Do you have the time?"], 0, { eight: "firstRoomMiddle" }, true, true, "grandfatherClock", [0, 0], [0]);




rooms["se"] = new Room(
    "se", ["It is pitch-black..."], 0, { north: "e", south: "wall", east: "wall", west: "sw" }, true, true, ["waterDrops", "snoring", "radioStatic"], [15, 5], []);

rooms["e"] = new Room(
    "e", ["It is pitch-black..."],
    0, { north: "ne", south: "se", east: "wall", west: "w" }, true, true, ["waterDrops", "snoring", "radioStatic"], [15, 15], []);

rooms["ne"] = new Room(
    "ne", ["It is pitch-black..."],
    0, { north: "wall", south: "e", east: "wall", west: "nw" }, true, true, ["waterDrops", "snoring", "radioStatic", "snoreWakeUp"], [15, 25], []);

rooms["nw"] = new Room(
    "nw", ["It is pitch-black..."],
    0, { north: "wall", south: "w", east: "ne", west: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 25], []);

rooms["w"] = new Room(
    "w", ["It is pitch-black..."],
    0, { north: "nw", south: "sw", east: "e", west: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 15], []);

rooms["sw"] = new Room(
    "sw", ["It is pitch-black..."],
    0, { north: "w", south: "wall", east: "se", west: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 5], []);

rooms["unconscious"] = new Room(
    "sw", ["You are unconscious..."],
    0, { restart: "se" }, true, true, [], [5, 5], []);

// ================================================================================================

var currentRoom = rooms["se"];
