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
var testNouns = ["north", "south", "east", "west", "radio", "item"]; 
var items = [];
var rooms = [];
var sounds = [];
var audioId = [];
var directionNouns = ["north", "south", "east", "west"];
var currentAudio;
var previousVolume;
var previousRoom = "se";
var behindAttenuator;
var hasPlayed = false;

var radioChannel = 0;

//  ===============================================================================================
