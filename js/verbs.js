// VERB FUNCTIONS  ================================================================================

function go(directionNoun) {

    // if the userInput has the correct number of words
    if (directionNoun.length == 1) {

        // if the direction noun is a valid direction noun
        if (directionNouns.indexOf(directionNoun[0]) >= 0) {

            // this condition should evaluate to true if the key returns a room value
            if (rooms[currentRoom.keyRoomDict[directionNoun[0]]] instanceof Object) {

                // add the current log to the logHistoryArray
                logHistoryArray = logHistoryArray.concat(logArray);
                // empty the log
                logArray = [];

                // change current room
                currentRoom = rooms[currentRoom.keyRoomDict[directionNoun[0]]];

                // process room attributes
                processRoomAttributes();

                // print new room description to log
                printToLog(currentRoom.descriptions[currentRoom.descriptionIndex]);

                // if any items in the room have been identified then print their descriptions
                for (var i = 0; i < currentRoom.interactableItems.length; i++) {

                    if (currentRoom.interactableItems[i].identified) {
                        printToLog(currentRoom.interactableItems[i].itemDescription);
                    }
                }
                
                // playCurrentRoomAudio
                playCurrentRoomAudio();
            }

            else {
                // print the value associated with the key
                printToLog(currentRoom.keyRoomDict[directionNoun[0]]);
                return;
            }
        }
        // if the directionNoun is not a valid direction
        else {
            printToLog("You must specify a valid direction ('north', 'south', 'east', 'west')");
        }
        return;
    }

    else {
        printToLog("You must use only one word to descibe direction ('north', 'south', 'east', 'west')");
        return;
    }
}




function explore(surroundings) {

    // if the userInput has the correct number of words
    if (surroundings.length == 1) {

        // count to see if any items are in room
        var count = 0;

        // check if the second word is 'surroundings'
        if (surroundings[0] == "surroundings") {

            // for every interactable item in the room
            for (var i = 0; i < currentRoom.interactableItems.length; i++) {

                // if the interactable item can be examined
                if ("explore" in currentRoom.interactableItems[i].interactions) {

                    printToLog("You use your hands to feel out your surroundings.");
                    // print the item's explore description
                    printToLog(currentRoom.interactableItems[i].interactions["explore"]);

                    count++;
                }
            }
            // if there are no explorable items in the room
            if (count == 0) {
                printToLog("You use your hands to explore your surroundings but find nothing.");
            }
            return;
        }

        else {
            printToLog("You cannot explore " + surroundings[0] + ". Expects 'explore surroundings'.")
        }
    }
    else {
        printToLog("You can only explore 'surroundings'");
        return;
    }


}



function identify(userGuess) {

    // if the userInput has the correct number of words
    if (userGuess.length == 1) {

        // for every interactable object in the room
        for (var i = 0; i < currentRoom.interactableItems.length; i++) {

            // if objectName is the name of an interactable object in the room.
            if (currentRoom.interactableItems[i].itemName == userGuess[0]) {

                // if the object has not yet been identified
                if (!currentRoom.interactableItems[i].identified) {
                    // change the item's identified state to true
                    currentRoom.interactableItems[i].identified = true;
                    // print the object's description
                    printToLog(currentRoom.interactableItems[i].itemDescription);
                }
                else {
                    printToLog(currentRoom.interactableItems[i].itemName + " has already been identified");
                }
            }
            else {
                printToLog("There is no " + userGuess[0] + " in the room.");
            }
            return;
        }
    }
    else {
        printToLog("You must use only one word with 'identify'");
        return;
    }


}



function use(objectToUse) {

    // if the userInput has the correct number of words
    if (objectToUse.length == 1) {
        // for every interactable object in the room
        for (var i = 0; i < currentRoom.interactableItems.length; i++) {

            // if objectToUse is the name of an interactable object in the room or in the inventory.
            if (currentRoom.interactableItems[i].itemName == objectToUse[0]) {

                // if the item has been identified
                if (currentRoom.interactableItems[i].identified) {
                    var usedString = currentRoom.interactableItems[i].interactions["use"]();
                    printToLog(usedString);
                }
                else {
                    printToLog("You cannot use an item until you have identified what it is.");
                }
            }
            else {
                printToLog("There is no " + objectToUse[0] + " in the room or in your inventory.");
            }
            return;
        }
    }
    else {
        printToLog("You must use only one word with 'use'");
        return;
    }
}



function turn(objectAndDirectionToTurn) {

    // if the userInput has the correct number of words
    if (objectAndDirectionToTurn.length == 2) {

        // check if the object is in the room or 
        for (var i = 0; i < currentRoom.interactableItems.length; i++) {

            if (currentRoom.interactableItems[i].itemName == objectAndDirectionToTurn[0]) {

                // check if object can be turned
                if ("turn" in currentRoom.interactableItems[i].interactions) {

                    // if user gives a key as a third word
                    if (objectAndDirectionToTurn[1] in currentRoom.interactableItems[i].interactions["turn"]) {

                        // run tap function
                        tapFunction(objectAndDirectionToTurn[1]);
                    }
                }
                else {
                    printToLog("You cannot turn this item.")
                }
            }
        }
    }
    else {
        printToLog("You must use two words with 'turn' (object to turn and direction to turn')");
    }
}




// VERB OBJECTS  ==================================================================================

// ## GO ##

let verb = function(verbName, process) {
    this.verbName = verbName;
    this.process = process;
};
let verb1 = new verb("go", function(secondWord) {
    go(secondWord);
});
verbs.push(verb1);

let verb2 = new verb("explore", function(secondWord) {
    explore(secondWord);
});
verbs.push(verb2);

let verb3 = new verb("identify", function(secondWord) {
    identify(secondWord);
});
verbs.push(verb3);

let verb4 = new verb("use", function(secondWord) {
    use(secondWord);
});
verbs.push(verb4);

let verb5 = new verb("turn", function(secondWord, thirdWord) {
    turn(secondWord, thirdWord);
})
verbs.push(verb5);

//  ===============================================================================================











//  ===============================================================================================
