
// PROCESS ROOM ATTRIBUTES ========================================================================

function processRoomAttributes() {

}
// ================================================================================================




// CHANGE ROOM ====================================================================================
function changeRoom(roomToChangeTo) {

    // change current room
    currentRoom = roomToChangeTo;

    // process room attributes
    processRoomAttributes();

    // print new room description to log
    printToLog(currentRoom.description);

    // if any items in the room have been identified then print their descriptions
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        if (currentRoom.interactableItems[i].identified) {
            printToLog(currentRoom.interactableItems[i].itemDescription);
        }
    }
    // play footsteps
    footSteps.play();
    
    // playCurrentRoomAudio
    playCurrentRoomAudio();

}
// ================================================================================================
