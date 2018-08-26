// VERBS  =========================================================================================

// go ---------------------------------------------------------------------------------------------

function go(userNouns) {

    if (userNouns[0] in gameState.currentRoom.keyRoomDict) {
        var roomToChangeTo = gameState.currentRoom.keyRoomDict[userNouns[0]];

        if (rooms[roomToChangeTo] instanceof Object) {
            gameState.actionResponse = "";
            gameState.currentRoom = rooms[roomToChangeTo];
            
            // plays one footstep audio file from an array of three.
            var randomFootsteps = footstepsArray[Math.floor(Math.random()*footstepsArray.length)];
            randomFootsteps.play()
            
            gameState.currentRoom.onEnter();
            console.log(gameState.currentRoom.name)
        }
        else {
            gameState.actionResponse = roomToChangeTo;
        }
    }
    return gameState;
}

// examine ----------------------------------------------------------------------------------------

function examine(userNouns) {

    for (var i = 0; i < gameState.currentRoom.itemsInRoom.length; i++) {
        var itemToExamine = gameState.currentRoom.itemsInRoom[i];
        if (itemToExamine.itemName == userNouns[0]) {
            if (!itemToExamine.identified) {
                gameState.actionResponse = "You cannot examine an item until you have identified it.";
            }
            else {
                gameState.actionResponse = itemToExamine.interactions["examine"];
            }
            return gameState;
        }
    }
    gameState.actionResponse = "There is no " + userNouns[0] + " to examine.";
    return gameState;
}

//  explore ---------------------------------------------------------------------------------------

function explore(userNouns) {

    if (userNouns[0] != "surroundings") {
        gameState.actionResponse = "You can only explore 'surroundings'.";
    }
    else {
        gameState.actionResponse = "You use your hands to explore your surroundings.\n";
        for (var i = 0; i < gameState.currentRoom.itemsInRoom.length; i++) {
            var itemToExplore = gameState.currentRoom.itemsInRoom[i]
            gameState.actionResponse += itemToExplore.interactions["explore"];
        }
    }
    return gameState;
}

// take -------------------------------------------------------------------------------------------

function take(userNouns) {

    for (var i = 0; i < gameState.currentRoom.itemsInRoom.length; i++) {

        var itemToTake = gameState.currentRoom.itemsInRoom[i];

        if (itemToTake.itemName == userNouns[0]) {
            gameState.actionResponse = "You take the " + userNouns[0] + ". \n(You can look inside your inventory by entering 'inventory')";
            gameState.inventory.push(items[userNouns[0]]);
            // can this be cleaned up?
            gameState.currentRoom.itemsInRoom.splice(gameState.currentRoom.itemsInRoom.indexOf(userNouns[0], 1));
            return gameState;
        }
    }
    gameState.actionResponse = "There is no " + userNouns[0] + " in the room.";
    return gameState;
}

// drop -------------------------------------------------------------------------------------------

function drop(userNouns) {

    for (var i = 0; i < gameState.inventory.length; i++) {

        var itemToDrop = gameState.inventory[i];
        if (itemToDrop.itemName == userNouns[0]) {
            gameState.actionResponse = "You drop the " + userNouns[0] + ". \n(The " + userNouns[0] + " is now in the room)";
            gameState.currentRoom.itemsInRoom.push(items[userNouns[0]]);
            // can this be cleaned up?
            gameState.inventory.splice(gameState.inventory.indexOf(userNouns[0], 1));
            return gameState;
        }
    }
    gameState.actionResponse = "There is no " + userNouns[0] + " in your inventory.";
    return gameState;
}

// use --------------------------------------------------------------------------------------------

function use(userNouns) {

    var inventoryAndRoomItemsCombined = gameState.currentRoom.itemsInRoom.concat(gameState.inventory);

    for (var i = 0; i < inventoryAndRoomItemsCombined.length; i++) {

        var itemToUse = inventoryAndRoomItemsCombined[i];
        if (itemToUse.itemName == userNouns[0]) {
            gameState = itemToUse.interactions["use"]();
        }
        return gameState;
    }
    gameState.actionResponse = "There is no " + userNouns[0] + " in the room or in your inventory.";
    return gameState;
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

function restart() {

    loadItems();
    loadRooms();
    loadGameState();

    return gameState;
}


// VERBS  =========================================================================================

let verb = function(verbName, expectedNumberOfArgs, process) {
    this.verbName = verbName;
    this.expectedNumberOfArgs = expectedNumberOfArgs;
    this.process = process;
};

verbs["go"] = new verb("go", 1, function(userNouns) {
    return go(userNouns);
});

verbs["examine"] = new verb("examine", 1, function(userNouns) {
    return examine(userNouns);
});

verbs["explore"] = new verb("explore", 1, function(userNouns) {
    return explore(userNouns);
});

verbs["identify"] = new verb("identify", 1, function(userNouns) {
    return identify(userNouns);
});

verbs["take"] = new verb("take", 1, function(userNouns) {
    return take(userNouns);
});

verbs["drop"] = new verb("drop", 1, function(userNouns) {
    return drop(userNouns);
});

verbs["use"] = new verb("use", 1, function(userNouns) {
    return use(userNouns);
});

verbs["inventory"] = new verb("inventory", 0, function() {
    return showInventory();
});

verbs["restart"] = new verb("restart", 0, function() {
    return restart();
});

//  ===============================================================================================
