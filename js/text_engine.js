// acceptUserInput ==================================================================================


function acceptUserInput() {

    // CLEAN

    var userInput = document.getElementById("userInput").value.toLowerCase();
    var userInputWords = userInput.split(" ");
    var userInputWordsCleaned = deleteUnwantedWords(userInputWords);
    var userInputWordsParsed = parser(userInputWordsCleaned);
    
    var userInputWordsFinal = [];
    for (var i = 0; i < userInputWordsParsed.length; i ++ ) {
        
        var split = userInputWordsParsed[i].split(" ");
        console.log(split);
        
        for(var j = 0; j < split.length; j ++) {
            
            userInputWordsFinal.push(split[j]);
        }
    }

    console.log(userInputWordsFinal)

    var userVerb = userInputWordsFinal[0];
    var userNouns = userInputWordsFinal.slice(1, userInputWordsFinal.length);
    
    console.log(userNouns)

    gameState = processUserInput(userVerb, userNouns);

    // CORE VERBS ARE WORKING BUT I NEED HELP MAKING THE ITEM VERBS WORK.

    // var inventoryAndRoomItemsCombined = gameState.currentRoom.itemsInRoom.concat(gameState.inventory);
    // for (var i = 0; i < inventoryAndRoomItemsCombined.length; i++) {
    //     if (userNouns[0] == inventoryAndRoomItemsCombined[i].name && userVerb in inventoryAndRoomItemsCombined[i].interactions) {
    //         gameState = inventoryAndRoomItemsCombined[i].interactions[userVerb].process(userNouns);
    //     }
    // }

    var gameStateAsString = unpackGameStateIntoString(gameState);
    printGameStateToUser(gameStateAsString);
}

// deleteUnwantedWords ============================================================================

function deleteUnwantedWords(userInputWords) {

    var userInputWordsCleaned = [];
    var wordsToDelete = new Set(["to", "the"]);

    for (var i = 0; i < userInputWords.length; i++) {
        if (wordsToDelete.has(userInputWords[i])) {
            continue;
        }
        userInputWordsCleaned.push(userInputWords[i]);
    }
    return userInputWordsCleaned;
}

// parser =========================================================================================

function parser(userInputWords) {

    var wordReplacementPairs = { "head": "go", "walk": "go", "move": "go", "travel": "go", "run": "go", "dig": "use shovel" };

    for (var i = 0; i < userInputWords.length; i++) {
        if (userInputWords[i] in wordReplacementPairs) {
            userInputWords[i] = wordReplacementPairs[userInputWords[i]];
            if (userInputWords[i] == "") {
                userInputWords.splice(i, 1);
            }
        }
    }
    return userInputWords;
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
