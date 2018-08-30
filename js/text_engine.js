
// parser =========================================================================================

function parseUserInput(userInput) {

    var wordsArray = [];
    var wordReplacementPairs = { "head": "go", "walk": "go", "move": "go", "travel": "go", "run": "go", "dig": "use shovel", "pick up": "take", "grab": "take" };
    var wordsToDelete = new Set(["to", "the", "with"]);
    
    // replace words
    for(var key in wordReplacementPairs) {
        userInput = userInput.replace(key, wordReplacementPairs[key]);
    }
    userInput = userInput.split(" ");
    
    // delete unwanted words
    for (var i = 0; i < userInput.length; i++) {
        if (wordsToDelete.has(userInput[i])) {
            continue;
        }
        wordsArray.push(userInput[i]);
    }
    return wordsArray;
}

// acceptUserInput ==================================================================================

function acceptUserInput() {

    var userInput = document.getElementById("userInput").value.toLowerCase();

    userInput = parseUserInput(userInput);

    var userVerb = userInput[0];
    var userNouns = userInput.slice(1, userInput.length);
    
    gameState = processUserInput(userVerb, userNouns);

    var gameStateAsString = unpackGameStateIntoString(gameState);
    printGameStateToUser(gameStateAsString);
}

// processUserInput ===============================================================================

function processUserInput(userVerb, userNouns) {
    if (userVerb in verbs) {
        if (userNouns.length == verbs[userVerb].expectedNumberOfArgs) {
            gameState = verbs[userVerb].process(userNouns);
        }
        else {
            gameState.actionResponse = "Expected number of arguments when using '" + userVerb + "': " + verbs[userVerb].expectedNumberOfArgs;
        }
    }
    return gameState;
}

// getItemDescriptions ============================================================================

function getItemDescriptions(gameState) {
    var itemsString = "";
    for(var i = 0; i < gameState.currentRoom.itemsInRoom.length; i ++) {
        itemsString += gameState.currentRoom.itemsInRoom[i].description;
    }
    return itemsString;
}

// unpackGameStateIntoString ======================================================================

function unpackGameStateIntoString(gameState) {
    var gameStateAsString = gameState.currentRoom.name + gameState.currentRoom.description + getItemDescriptions(gameState);
    gameStateAsString = gameStateAsString.concat(gameState.actionResponse);
    return gameStateAsString;
}


// printGameStateToUser ===========================================================================

function printGameStateToUser(stringToPrint) {
    document.getElementById("console").innerHTML = stringToPrint;
}
