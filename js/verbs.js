
// VERB FUNCTIONS  ================================================================================

// go ---------------------------------------------------------------------------------------------

function go(directionNoun) {

    if (directionNoun[0] in gameState.currentRoom.keyRoomDict) {
        var roomToChangeTo = gameState.currentRoom.keyRoomDict[directionNoun[0]];

        if (rooms[roomToChangeTo] instanceof Object) {
            gameState.actionResponse = "";
            gameState.currentRoom = rooms[roomToChangeTo];
        } else {
            gameState.actionResponse = roomToChangeTo;
        }
    }
    return gameState;
}

function explore(surroundings) {

    if (surroundings.length != 1 || surroundings[0] != "surroundings") {
        printToLog("You can only explore 'surroundings'.");
        return;
    }
    printToLog("You use your hands to explore your surroundings.");

    for (var i = 0; i < currentRoom.interactableItems.length; i++) {
        if ("explore" in currentRoom.interactableItems[i].interactions) {
            printToLog(currentRoom.interactableItems[i].interactions["explore"]);
        }
    }
    return;
}
//  -----------------------------------------------------------------------------------------------




// IDENTIFY FUNCTION ------------------------------------------------------------------------------

function identify(userGuess) {


    if (userGuess.length != 1) {
        printToLog("You must use only one word with 'identify'");
        return;
    }

    // for every interactable object in the room
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if userGuess is not the name of an interactable object in the room.
        if (currentRoom.interactableItems[i].itemName != userGuess[0]) {
            printToLog("There is no " + userGuess[0] + " in the room.");
        }

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
    return;
}
//  -----------------------------------------------------------------------------------------------




// USE FUNCTION -----------------------------------------------------------------------------------

function use(objectToUse) {
    if (objectToUse.length != 1) {
        printToLog("You must use only one word with 'use'");
        return;
    }
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {
        if (currentRoom.interactableItems[i].itemName == objectToUse[0]) {
            if (currentRoom.interactableItems[i].identified) {
                printToLog(currentRoom.interactableItems[i].interactions["use"]());
                return;
            }
            else {
                printToLog("You cannot use an item until you have identified what it is.");
                return;
            }
        }
    }
    printToLog("There is no " + objectToUse[0] + " in the room or in your inventory.");
    return;
}
//  -----------------------------------------------------------------------------------------------




// TAKE FUNCTION -----------------------------------------------------------------------------------

function take(objectToTake) {

    // if the userInput has the correct number of words
    if (objectToTake.length != 1) {
        printToLog("You must use one noun with 'take'");
        return;
    }
    // for every interactable object in the room
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if objectToTake is the name of an interactable object in the room.
        if (currentRoom.interactableItems[i].itemName == objectToTake[0]) {

            // if the item has been identified
            if (currentRoom.interactableItems[i].identified) {
                // print the used description
                printToLog("You take the " + objectToTake[0] + ". \n(You can look inside your inventory by entering 'inventory')");
                console.log(inventory);
                inventory.push(items[objectToTake[0]]);
                return;
            }
            else {
                printToLog("You cannot take an item until you have identified it.");
                return;
            }
        }
    }
    printToLog("There is no " + objectToTake[0] + " in the room or in your inventory.");
    return;
}
//  -----------------------------------------------------------------------------------------------




// EXAMINE FUNCTION -------------------------------------------------------------------------------

function examine(objectToExamine) {

    // if the userInput has the correct number of words
    if (objectToExamine.length != 1) {
        printToLog("You must use one noun with 'examine'");
        return;
    }
    // for every interactable object in the room
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if objectToUse is the name of an interactable object in the room or in the inventory.
        if (currentRoom.interactableItems[i].itemName == objectToExamine[0]) {

            // if the item has been identified
            if (currentRoom.interactableItems[i].identified) {
                // print the used description
                printToLog(currentRoom.interactableItems[i].interactions["examine"]);
                return;
            }
            else {
                printToLog("You cannot examine an item until you have identified it.");
                return;
            }
        }
    }
    printToLog("There is no " + objectToExamine[0] + " in the room or in your inventory.");
    return;
}
//  -----------------------------------------------------------------------------------------------





// INVENTORY FUNCTION -----------------------------------------------------------------------------

function showInventory() {

    if (inventory.length == 0) {
        printToLog("Your inventory is empty.");
        return;
    }

    printToLog("You look inside your inventory:");

    for (var i = 0; i < inventory.length; i++) {
        printToLog(inventory[i].name);
    }
    return;
}

//  -----------------------------------------------------------------------------------------------


// TURN FUNCTION ----------------------------------------------------------------------------------

function turn(objectAndDirectionToTurn) {
    if (objectAndDirectionToTurn.length == 2) {
        printToLog("You must use two words with 'turn' (object to turn and direction to turn')");
    }
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {
        if ((currentRoom.interactableItems[i].itemName == objectAndDirectionToTurn[0]) && ("turn" in currentRoom.interactableItems[i].interactions)) {
            if (objectAndDirectionToTurn[1] in currentRoom.interactableItems[i].interactions["turn"]) {
                tapFunction(objectAndDirectionToTurn[1]);
            }
            printToLog("You cannot turn this direction.")
        }
    }
}
//  -----------------------------------------------------------------------------------------------




// VERBS  =========================================================================================

let verb = function(verbName, process) {
    this.verbName = verbName;
    this.process = process;
};

verbs["go"] = new verb("go", function(secondWord) {
    return go(secondWord);
});

verbs["explore"] = new verb("explore", function(secondWord) {
    explore(secondWord);
});

verbs["identify"] = new verb("identify", function(secondWord) {
    identify(secondWord);
});

verbs["examine"] = new verb("examine", function(secondWord) {
    examine(secondWord);
});

verbs["take"] = new verb("take", function(secondWord) {
    take(secondWord);
});

verbs["use"] = new verb("use", function(secondWord) {
    use(secondWord);
});

verbs["inventory"] = new verb("inventory", function() {
    showInventory();
});

verbs["turn"] = new verb("turn", function(secondWord, thirdWord) {
    turn(secondWord, thirdWord);
})

//  ===============================================================================================
