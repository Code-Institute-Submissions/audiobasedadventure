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

// research modules
// 



// GLOBAL VARIABLES ===============================================================================

var logArray = [];
var logHistoryArray = [];
var verbs = [];
var items = [];
var rooms = [];
var sounds = [];
var audioId = [];
var directionNouns = ["NORTH", "SOUTH", "EAST", "WEST"];
var timeValues = {minute: "1", minutes: "1", hour: "60", hours: "60"};
var currentAudio;
var previousVolume;
var groundWet = true;
var timeOfTapOff;
var previousRoom = "se";
var behindAttenuator;
var hasPlayed = false;
var time = 0;

//  ===============================================================================================
