// AUDIO ENGINE ===================================================================================

function playCurrentRoomAudio() {

    for (var i = 0; i < currentRoom.audioObject.length; i++) {

        if ((!sounds[currentRoom.audioObject[i]].audio[0].playing(audioId[i]))) {
            audioId[i] = sounds[currentRoom.audioObject[i]].audio[0].play();
        }

        // stop audio if audio.active is false
        if (!sounds[currentRoom.audioObject[i]].active) {
            sounds[currentRoom.audioObject[i]].audio[0].stop(audioId[i]);
        }


        // PANNING  -------------------------------------------------------------------------------

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

        // ----------------------------------------------------------------------------------------



        // VOLUME  --------------------------------------------------------------------------------

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

        // ----------------------------------------------------------------------------------------
    }
}
// ================================================================================================
