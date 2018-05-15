// VERB FUNCTIONS  ================================================================================

// GO FUNCTION ------------------------------------------------------------------------------------

function go(directionNoun) {

    // if the userInput does not have the correct number of words
    if (directionNoun.length != 1) {
        printToLog("You must provide one word to specify direction.");
        return;
    }

    // if the direction noun is a valid direction noun
    if (directionNouns.indexOf(directionNoun[0]) < 0) {
        printToLog("You must specify a valid direction ('north', 'south', 'east', 'west')");
        return;
    }

    // if the direction noun returns a key
    if (rooms[currentRoom.keyRoomDict[directionNoun[0]]] instanceof Object) {

        // change room
        changeRoom(rooms[currentRoom.keyRoomDict[directionNoun[0]]]);
    }
    else {
        // print the value associated with the key
        printToLog(currentRoom.keyRoomDict[directionNoun[0]]);
    }
    return;
}
//  -----------------------------------------------------------------------------------------------




// EXPLORE FUNCTION -------------------------------------------------------------------------------

function explore(surroundings) {

    // if the userInput has the correct number of words and that the second word is 'surroundings'
    if (surroundings.length != 1 || surroundings[0] != "surroundings") {
        printToLog("You can only explore 'surroundings'.");
        return;
    }
    printToLog("You use your hands to explore your surroundings.");

    // for every interactable item in the room
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if the interactable item can be examined
        if ("explore" in currentRoom.interactableItems[i].interactions) {

            // print the item's explore description
            printToLog(currentRoom.interactableItems[i].interactions["explore"]);
        }
    }
    return;
}
//  -----------------------------------------------------------------------------------------------




// IDENTIFY FUNCTION ------------------------------------------------------------------------------

function identify(userGuess) {

    // if the userInput has the correct number of words
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

    // if the userInput has the correct number of words
    if (objectToUse.length != 1) {
        printToLog("You must use only one word with 'use'");
        return;
    }
    // for every interactable object in the room
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if objectToUse is the name of an interactable object in the room or in the inventory.
        if (currentRoom.interactableItems[i].itemName == objectToUse[0]) {

            // if the item has been identified
            if (currentRoom.interactableItems[i].identified) {
                // print the used description
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

    console.log("hello?");

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
                console.log(items[objectToTake[0]]);
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

function inventory() {

    if (inventory.length == 0) {
        printToLog("Your inventory is empty.");
        return;
    }

    printToLog("You look inside your inventory:");

    for (var i = 0; i < inventory.length; i++) {
        printToLog(inventory[i]);
    }
    return;
}

//  -----------------------------------------------------------------------------------------------


// TURN FUNCTION ----------------------------------------------------------------------------------

function turn(objectAndDirectionToTurn) {

    // if the userInput has the correct number of words
    if (objectAndDirectionToTurn.length == 2) {
        printToLog("You must use two words with 'turn' (object to turn and direction to turn')");
    }

    // check if the object is in the room or inventory
    for (var i = 0; i < currentRoom.interactableItems.length; i++) {

        // if the userInput item is in the current room and "turn" i an interaction of that item
        if ((currentRoom.interactableItems[i].itemName == objectAndDirectionToTurn[0]) && ("turn" in currentRoom.interactableItems[i].interactions)) {

            // if user gives a key as a third word
            if (objectAndDirectionToTurn[1] in currentRoom.interactableItems[i].interactions["turn"]) {

                // run tap function
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
    go(secondWord);
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
    inventory();
});

verbs["turn"] = new verb("turn", function(secondWord, thirdWord) {
    turn(secondWord, thirdWord);
})

//  ===============================================================================================
