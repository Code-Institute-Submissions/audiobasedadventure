

function preload() {

  grandfatherClock = loadSound("audio/grandfather_clock.wav");
  waterDrops = loadSound("audio/water_drops.wav");
}

function setup() {
  // put setup code here
  console.log(currentRoom.audioObject);
  console.log(sounds[currentRoom.audioObject]);
  currentAudio = sounds[currentRoom.audioObject].audio;
  
  
}

function draw() {

  // AUDIO ==========================================================================================

  // always adjusting pan and playback volume
  currentAudio.setVolume(.1);
  currentAudio.pan(1);


  // if currentAudio has changed
  if (currentAudio != previousAudio) {
    currentAudio.play();
    previousAudio = currentAudio;
    
  }



  // // runs audioEndedFunction when audio has ended
  // audioIn.audio.addEventListener('ended', function() {
  //     console.log(audioIn.audioName + " ended")
  //     // print last description in array
  //     printToLog(currentRoom.descriptions[currentRoom.descriptions.length - 1])
  //     // if the input is invisible make it visible
  //     inputVisible(true);
  // })


  // ================================================================================================
}
