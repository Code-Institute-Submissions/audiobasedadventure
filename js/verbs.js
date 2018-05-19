// VERBS  =========================================================================================

// go ---------------------------------------------------------------------------------------------

function go(directionNoun) {

    if (directionNoun[0] in gameState.currentRoom.keyRoomDict) {
        var roomToChangeTo = gameState.currentRoom.keyRoomDict[directionNoun[0]];

        if (rooms[roomToChangeTo] instanceof Object) {
            gameState.actionResponse = "";
            gameState.currentRoom = rooms[roomToChangeTo];
        }
        else {
            gameState.actionResponse = roomToChangeTo;
        }
    }
    return gameState;
}

// examine ----------------------------------------------------------------------------------------

function examine(itemNoun) {

    for (var i = 0; i < gameState.currentRoom.interactableItems.length; i++) {
        var itemToExamine = gameState.currentRoom.interactableItems[i];
        if (itemToExamine.itemName == itemNoun[0]) {
            if (!itemToExamine.identified) {
                gameState.actionResponse = "You cannot examine an item until you have identified it.";
            }
            else {
                gameState.actionResponse = itemToExamine.interactions["examine"];
            }
            return gameState;
        }
    }
    gameState.actionResponse = "There is no " + itemNoun + " to examine.";
    return gameState;
}

//  explore ---------------------------------------------------------------------------------------

function explore(surroundings) {

    if (surroundings[0] != "surroundings") {
        gameState.actionResponse = "You can only explore 'surroundings'.";
    }
    else {
        gameState.actionResponse = "You use your hands to explore your surroundings.\n";
        for (var i = 0; i < gameState.currentRoom.interactableItems.length; i++) {
            var itemToExplore = gameState.currentRoom.interactableItems[i]
            gameState.actionResponse += itemToExplore.interactions["explore"];
        }
    }
    return gameState;
}

// identify ---------------------------------------------------------------------------------------

function identify(userGuess) {

    for (var i = 0; i < gameState.currentRoom.interactableItems.length; i++) {
        var itemToIdentify = gameState.currentRoom.interactableItems[i];
        if (itemToIdentify.itemName != userGuess[0]) {
            gameState.actionResponse = "There is no " + userGuess[0] + " in the room.";
        }
        else if (!itemToIdentify.identified) {
            itemToIdentify.identified = true;
            gameState.actionResponse = itemToIdentify.interactions["identify"];
        }
        else {
            gameState.actionResponse = itemToIdentify.itemName.charAt(0).toUpperCase() + itemToIdentify.itemName.slice(1) + " has already been identified";
        }
    }
    return gameState;
}

// take -------------------------------------------------------------------------------------------

function take(itemNoun) {

    for (var i = 0; i < gameState.currentRoom.interactableItems.length; i++) {

        var itemToTake = gameState.currentRoom.interactableItems[i];
        if (!itemToTake.identified) {
            gameState.actionResponse = "You cannot take an item until you have identified it.";
            return gameState;
        }
        else if (itemToTake.itemName == itemNoun[0]) {
            gameState.actionResponse = "You take the " + itemNoun[0] + ". \n(You can look inside your inventory by entering 'inventory')";
            gameState.inventory.push(items[itemNoun]);
            return gameState;
        }
    }
    gameState.actionResponse = "There is no " + itemNoun[0] + " in the room.";
    return gameState;
}

// use --------------------------------------------------------------------------------------------

function use(objectToUse) {

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

// inventory --------------------------------------------------------------------------------------

function showInventory() {

    if (gameState.inventory.length == 0) {
        gameState.actionResponse = "Your inventory is empty.";
        return gameState;
    }
    else {
        gameState.actionResponse = "You look inside your inventory:\n";

        for (var i = 0; i < gameState.inventory.length; i++) {
            gameState.actionResponse += gameState.inventory[i].itemName.charAt(0).toUpperCase() + gameState.inventory[i].itemName.slice(1) + "\n";
        }
        return gameState;
    }
}

//  restart ---------------------------------------------------------------------------------------


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

verbs["examine"] = new verb("examine", function(secondWord) {
    return examine(secondWord);
});

verbs["explore"] = new verb("explore", function(secondWord) {
    return explore(secondWord);
});

verbs["identify"] = new verb("identify", function(secondWord) {
    return identify(secondWord);
});

verbs["take"] = new verb("take", function(secondWord) {
    return take(secondWord);
});

verbs["use"] = new verb("use", function(secondWord) {
    return use(secondWord);
});

verbs["inventory"] = new verb("inventory", function() {
    return showInventory();
});

verbs["turn"] = new verb("turn", function(secondWord, thirdWord) {
    turn(secondWord, thirdWord);
})

//  ===============================================================================================
