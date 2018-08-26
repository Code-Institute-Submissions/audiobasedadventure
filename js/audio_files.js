
// AUDIO FILES ====================================================================================

/* https://github.com/goldfire/howler.js#documentation: howler.js is an audio library for the modern web. It defaults to Web Audio API and falls back to HTML5 Audio. This makes working with audio in JavaScript easy and reliable across all platforms. */

// footsteps --------------------------------------------------------------------------------------

var footsteps_1 = new Howl({
    src: ['audio/footsteps_1.m4a'],
    loop: false,
    volume: .2
});

var footsteps_2 = new Howl({
    src: ['audio/footsteps_2.m4a'],
    loop: false,
    volume: .2
});

var footsteps_3 = new Howl({
    src: ['audio/footsteps_2.m4a'],
    loop: false,
    volume: .2
});

var footstepsArray = [footsteps_1, footsteps_2, footsteps_3]

// ------------------------------------------------------------------------------------------------

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


// AUDIO OBJECTS ===================================================================================

/* Audio objects add additional functionality to the audio files by giving them coordinates for 
directionality and an active state to contol whether the audio file should be audible or not. */

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

// Auto play starting sounds ----------------------------------------------------------------------

function playStartingSounds() {
    // waterDrops.play()
}

// ------------------------------------------------------------------------------------------------