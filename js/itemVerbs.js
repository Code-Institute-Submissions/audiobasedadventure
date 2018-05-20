// radioOn ----------------------------------------------------------------------------------------

function radioOn() {
    if (!items["radio"].usable) {
        gameState.actionResponse = "You try to switch on the radio but nothing happens.";
        return gameState;
    }
}

//  useBatteries ----------------------------------------------------------------------------------

function useBatteries() {
    for (var i = 0; i < gameState.currentRoom.itemsInRoom.length; i++) {
        if (gameState.currentRoom.itemsInRoom[i] == items["batteries"]) {
            gameState.actionResponse = "Batteries must be in your inventory before you can use them.";
            return gameState;
        }
    }
    gameState.actionResponse = "You can't use the batteries on their own. Try putting the batteries in another item.";
    return gameState;
}

//  putBatteriesInRadio ---------------------------------------------------------------------------

function putBatteriesInRadio(indirectNoun) {
    if (indirectNoun != "radio") {
        gameState.actionResponse = "You cannot use batteries with " + indirectNoun;
        return gameState;
    }
    items["radio"].usable = true;
    gameState.actionResponse = "You put the batteries in the radio.";
    return gameState;
}





// itemVerbs ======================================================================================

let itemVerb = function(verbName, process) {
    this.verbName = verbName;
    this.process = process;
};

itemVerbs["radioOn"] = new itemVerb("radioOn", function(userNouns) {
    return radioOn(userNouns);
});

itemVerbs["useBatteries"] = new itemVerb("useBatteries", function(userNouns) {
    return useBatteries(userNouns);
});

itemVerbs["putBatteriesInRadio"] = new itemVerb("put", function(userNouns) {
    return putBatteriesInRadio(userNouns);
});

//  ===============================================================================================
