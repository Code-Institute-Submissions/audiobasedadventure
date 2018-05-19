// AUDIO ENGINE ===================================================================================

function playCurrentRoomAudio() 
{
    for (var i = 0; i < currentRoom.audioObject.length; i++) 
    {
        if ((!sounds[currentRoom.audioObject[i]].audio[0].playing(audioId[i]))) 
        {
            audioId[i] = sounds[currentRoom.audioObject[i]].audio[0].play();
        }
        if (!sounds[currentRoom.audioObject[i]].active) 
        {
            sounds[currentRoom.audioObject[i]].audio[0].stop(audioId[i]);
        }
        
        // PANNING  -------------------------------------------------------------------------------

        var angleDeg = Math.atan2(sounds[currentRoom.audioObject[i]].coordinates[1] - currentRoom.coordinates[1], sounds[currentRoom.audioObject[i]].coordinates[0] - currentRoom.coordinates[0]) * 180 / Math.PI;
        
        behindAttenuator = 1;

        if (angleDeg < 0) 
        {
            behindAttenuator = 1.2;
            angleDeg = angleDeg * -1;
        }
        var scaledPan = 2 / 180 * angleDeg;
        scaledPan = scaledPan - 1;
        scaledPan = scaledPan * -1;

        sounds[currentRoom.audioObject[i]].audio[0].stereo(scaledPan, audioId[i]);

        // VOLUME  --------------------------------------------------------------------------------

        var distanceToSound = Math.sqrt(Math.pow(sounds[currentRoom.audioObject[i]].coordinates[0] - currentRoom.coordinates[0], 2) + Math.pow(sounds[currentRoom.audioObject[i]].coordinates[1] - currentRoom.coordinates[1], 2));
        
        var scaledVolume = Math.log(1 + distanceToSound) / Math.log(1 + 20);
        
        scaledVolume = scaledVolume * behindAttenuator;
        
        if (isNaN(previousVolume)) 
        {
            previousVolume = (1 - scaledVolume);
        }
        sounds[currentRoom.audioObject[i]].audio[0].fade(previousVolume, (1 - scaledVolume), 2200, audioId[i]);
        previousVolume = (1 - scaledVolume);

        // ----------------------------------------------------------------------------------------
    }
}
// ================================================================================================
