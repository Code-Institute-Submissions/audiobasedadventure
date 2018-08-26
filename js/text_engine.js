// acceptUserInput ==================================================================================


function acceptUserInput() {

    var userInput = document.getElementById("userInput").value.toLowerCase();
    var userInputWords = userInput.split(" ");
    var userInputWordsCleaned = deleteUnwantedWords(userInputWords);
    userInputWordsParsed = parser(userInputWordsCleaned);

    var userVerb = userInputWords[0];
    var userNouns = userInputWords.slice(1, userInputWords.length);

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

    var wordReplacementPairs = { "head": "go", "walk": "go", "move": "go", "travel": "go", "run": "go" };

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

// unpackGameStateIntoString ======================================================================

function unpackGameStateIntoString(gameState) {
    var gameStateAsString = gameState.currentRoom.description;
    gameStateAsString = gameStateAsString.concat(gameState.actionResponse);
    return gameStateAsString;
}


// printGameStateToUser ===========================================================================

function printGameStateToUser(stringToPrint) {
    document.getElementById("console").innerHTML = stringToPrint;
}
