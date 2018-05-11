'use strict';

// IMPLEMENT TESTING ON USERINPUT
// use jquery
// build inventory
// implement verbs
// create item class
// create audio engine
// fix history
// fix parsing
// make all objects the same (push problem)

// restart function

// HOW TO IMPLEMENT JASMINE - wroks best for functions that return something. parser, printTo Log
// HOW TO SORT OUT LOADSOUND


// AUDIO FILES ====================================================================================

var waterDrops = new Howl({
    src: ['audio/waterDrops.mp3'],
    loop: true,
    volume: 0.1
});

var waterDropsOff = new Howl({
    src: ['audio/waterDropsOff.mp3'],
    loop: false,
    volume: 0.4
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

//  ===============================================================================================


var logArray = [];
var logHistoryArray = [];
var verbs = [];
var items = [];
var rooms = [];
var sounds = [];
var audioId = [];
var directionNouns = ["NORTH", "SOUTH", "EAST", "WEST"];
var currentAudio;
var previousVolume;
var groundWet = true;
var previousRoom = "se";
var behindAttenuator;
var hasPlayed = false;



// UNCONSCIOUS ====================================================================================

function unconscious() {
    hitWithClub.play();
    for (var i = 0; i < currentRoom.audioObject.length; i++) {
        sounds[currentRoom.audioObject[i]].audio[0].mute(true);
    }
    printToLog("You are unconscious...\n\nType 'restart' to play again")
}
//  ===============================================================================================



// TAP FUNCTION ===================================================================================

function tapFunction(direction) {

    // if turned anticlockwise
    if (direction == "anticlockwise") {

        if (sounds["waterDrops"].active) {
            // water drops sound should stop
            sounds["waterDrops"].active = false;
            // tap is off
            tap.on = false;
            sounds["waterDropsOff"].active = true;
        } else {
            printToLog("nothing happens.")
        }

    }
    else {
        if (!sounds["waterDrops"].active) {
            // water drops sound should stop
            sounds["waterDrops"].active = true;
            // tap is off
            tap.on = true;
            sounds["waterDropsOff"].active = false;
        } else {
            printToLog("Nothing happens.")
        }
    }
    // playCurrentRoomAudio
    playCurrentRoomAudio();
    return;
}
//  ===============================================================================================


// SLEEP ===================================================================================

function sleep() {

    console.log("hello");

    if(tap.on == false) {
        groundWet = false;
    } else {
        groundWet = true;
    }
    
    for(var i = 0; i < sounds.length; i ++) {
        console.log(sounds[i].audio.volume());
        sounds[i].audio.fade(sounds[i].audio.volume(), 0, 5000);
    }
    

    return;
}
//  ===============================================================================================


// AUDIO OBJECTS ===================================================================================

let soundObject = function(audio, coordinates, active) {
    this.audio = audio;
    this.coordinates = coordinates;
    this.active = active;
};

sounds["waterDrops"] = new soundObject([waterDrops], [20, 15], true);
sounds["waterDropsOff"] = new soundObject([waterDropsOff], [20, 15], false);
sounds["snoring"] = new soundObject([snoring], [8, 28], true);
sounds["snoreWakeUp"] = new soundObject([snoreWakeUp, hitWithClub], [8, 28], false);
sounds["radioStatic"] = new soundObject([radioStatic], [8, 29], true);

// ================================================================================================



// INTERACTABLE ITEM OBJECTS  ==================================================================================

// ## TAP ##

let item = function(itemName, interactions, identified, itemDescription, on) {
    this.itemName = itemName;
    this.interactions = interactions;
    this.identified = identified;
    this.itemDescription = itemDescription
    this.on = on;
};
let tap = new item("tap", { explore: "You run your hands against an object directly to your right. It is some sort of rigid metal structure fixed against the wall.", identify: "tap", use: function() {return "You can turn the tap clockwise or anti-clockwise."}, turn: { clockwise: "clockwise", anticlockwise: "You turn the tap anti-clockwise." } }, false, "There is a tap in the room.", true);

items.push(tap);

// ## BED ##

let bed = new item("bed", { explore: "You run your hands against a big flat surface. It feels soft and welcoming.", identify: "bed", use: function () {sleep(); return "You lie down on the bed. \nGradually you drift off..."}}, false, "There is a bed in the room.", true);



items.push(bed);

//  ===============================================================================================



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
    "se", ["It is pitch-black...\n"], 0, { NORTH: "e", SOUTH: "wall", EAST: "wall", WEST: "sw" }, true, true, ["waterDrops", "snoring", "radioStatic"], [15, 5], [bed]);

rooms["e"] = new Room(
    "e", ["It is pitch-black...\n"],
    0, { NORTH: "ne", SOUTH: "se", EAST: "wall", WEST: "w" }, true, true, ["waterDrops", "waterDropsOff", "snoring", "radioStatic"], [15, 15], [tap]);

rooms["ne"] = new Room(
    "ne", ["It is pitch-black...\n"],
    0, { NORTH: "wall", SOUTH: "e", EAST: "wall", WEST: "nw" }, true, true, ["waterDrops", "snoring", "radioStatic", "snoreWakeUp"], [15, 25], []);

rooms["nw"] = new Room(
    "nw", ["It is pitch-black...\n"],
    0, { NORTH: "wall", SOUTH: "w", EAST: "ne", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 25], []);

rooms["w"] = new Room(
    "w", ["It is pitch-black...\n"],
    0, { NORTH: "nw", SOUTH: "sw", EAST: "e", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 15], []);

rooms["sw"] = new Room(
    "sw", ["It is pitch-black...\n"],
    0, { NORTH: "w", SOUTH: "wall", EAST: "se", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 5], []);

rooms["unconscious"] = new Room(
    "sw", ["You are unconscious...\n"],
    0, { RESTART: "se" }, true, true, [], [5, 5], []);

// ================================================================================================

var currentRoom = rooms["se"];
