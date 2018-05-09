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
var audioId = [];


var waterDrops = new Howl({
    src: ['audio/waterDrops.mp3'],
    loop: true,
    volume: 0.5,
});

var snoring = new Howl({
    src: ['audio/snoring.mp3'],
    loop: true,
    volume: 0.2,
});

var snoreWakeUp = new Howl({
    src: ['audio/snoreWakeUp.mp3'],
    loop: false,
    volume: 0.2,
});

var hitWithClub = new Howl({
    src: ['audio/hitWithClub.mp3'],
    loop: false,
    volume: 0.5,
});

var radioStatic = new Howl({
    src: ['audio/radioStatic.mp3'],
    loop: true,
    volume: 0.7,
});

var footSteps = new Howl({
    src: ['audio/footSteps.mp3'],
    loop: false,
    volume: 0.5,
});

var footStepsInWater = new Howl({
    src: ['audio/footStepsInWater.mp3'],
    loop: false,
    volume: 0.2,
});

var currentAudio;
var previousVolume;
var previousRoom = "se";
var behindAttenuator
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
                        // playCurrentRoomAudio
                        playCurrentRoomAudio();
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

//     if (currentRoom.name == "ne") {
//         sounds["snoring"].active = false;
//         sounds["snoreWakeUp"].active = true;
//     }
//     else {
//         sounds["snoring"].active = true;
//         sounds["snoreWakeUp"].active = false;
//     }
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





// AUDIO OBJECT ===================================================================================

function playCurrentRoomAudio() {

    if (previousRoom != currentRoom.name) {
        footStepsInWater.play();
        previousRoom = currentRoom.name;
    }


    for (var i = 0; i < currentRoom.audioObject.length-1; i++) {
        
        console.log(sounds[currentRoom.audioObject[i]]);
        console.log(currentRoom);

        if ((!sounds[currentRoom.audioObject[i]].audio[0].playing(audioId[i]))) {
            audioId[i] = sounds[currentRoom.audioObject[i]].audio[0].play();
            console.log("Playing: " + currentRoom.audioObject[i]);
        }

        // stop audio if audio.active is false
        if (!sounds[currentRoom.audioObject[i]].active) {
            console.log("audio should stop");
            sounds[currentRoom.audioObject[i]].audio[0].stop(audioId[i]);
        }


        // PANNING  ===============================================================================

        // angle between player and soundsource in degrees
        var angleDeg = Math.atan2(sounds[currentRoom.audioObject[i]].coordinates[1] - currentRoom.coordinates[1], sounds[currentRoom.audioObject[i]].coordinates[0] - currentRoom.coordinates[0]) * 180 / Math.PI;

        console.log(angleDeg);

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
            
            console.log(sounds[currentRoom.audioObject[i]]);
            
            // when the audio of the object finishes playing
            sounds[currentRoom.audioObject[i]].audio[0].on('end', function() {
            
                this[1].play();

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
sounds["snoreWakeUp"] = new soundObject([snoreWakeUp] [8, 28], false);
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
    0, { north: "wall", south: "e", east: "wall", west: "nw" }, true, true, ["waterDrops", "snoring", "snoreWakeUp", "radioStatic"], [15, 25], []);

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
