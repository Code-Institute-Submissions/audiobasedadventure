// acceptUserInput ==================================================================================

function acceptUserInput() {

    var userInput = document.getElementById("userInput").value.toLowerCase();
    var userInputWords = userInput.split(" ");
    var userInputWordsCleaned = deleteUnwantedWords(userInputWords);
    userInputWordsParsed = parser(userInputWordsCleaned);

    var userVerb = userInputWords[0];
    var userNouns = userInputWords.slice(1, userInputWords.length);

    if (userVerb in verbs) {
        gameState = verbs[userInputWords[0]].process(userNouns);
    }
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

// unpackGameStateIntoString ======================================================================

function unpackGameStateIntoString(gameState) {
    var gameStateAsString = gameState.currentRoom.description;
    gameStateAsString.concat(gameState.actionResponse);
    return gameStateAsString;
}


// printGameStateToUser ===========================================================================

function printGameStateToUser(stringToPrint) {
    document.getElementById("console").innerHTML = stringToPrint;
}

// unitTesting ====================================================================================

function unitTesting() {

    // deleteUnwantedWords
    test_arrays_are_equal(deleteUnwantedWords(["hello"]), ["hello"]);
    test_arrays_are_equal(deleteUnwantedWords(["use", "the", "radio"]), ["use", "radio"]);
    test_arrays_are_equal(deleteUnwantedWords(["go", "to", "the", "north"]), ["go", "north"]);

    // parser
    test_arrays_are_equal(parser(["hello"]), ["hello"]);
    test_arrays_are_equal(parser(["use", "radio"]), ["use", "radio"]);
    test_arrays_are_equal(parser(["head", "north"]), ["go", "north"]);
    test_arrays_are_equal(parser(["move", "north"]), ["go", "north"]);
    test_arrays_are_equal(parser(["walk", "north"]), ["go", "north"]);
    test_arrays_are_equal(parser(["travel", "north"]), ["go", "north"]);
    test_arrays_are_equal(parser(["run", "north"]), ["go", "north"]);

    // verbs
    test_states_are_equal(verbs["go"].process(["north"]), testStateNE);
    test_states_are_equal(verbs["go"].process(["south"]), testStateSE);
    test_states_are_equal(verbs["go"].process(["west"]), testStateSW);
    test_states_are_equal(verbs["go"].process(["north"]), testStateNW);
    test_states_are_equal(verbs["go"].process(["north"]), testStateNWboundary);
    test_states_are_equal(verbs["go"].process(["west"]), testStateNWboundary);
    test_states_are_equal(verbs["go"].process(["south"]), testStateSW);
    test_states_are_equal(verbs["go"].process(["south"]), testStateSWboundary);
    test_states_are_equal(verbs["go"].process(["west"]), testStateSWboundary);
    test_states_are_equal(verbs["go"].process(["east"]), testStateSE);
    test_states_are_equal(verbs["go"].process(["east"]), testStateSEboundary);
    test_states_are_equal(verbs["go"].process(["south"]), testStateSEboundary);
    test_states_are_equal(verbs["go"].process(["north"]), testStateNE);
    test_states_are_equal(verbs["go"].process(["north"]), testStateNEboundary);
    test_states_are_equal(verbs["go"].process(["east"]), testStateNEboundary);

    test_states_are_equal(verbs["explore"].process(["something"]), testStateExploreNEsomething);
    test_states_are_equal(verbs["explore"].process(["surroundings"]), testStateExploreNE);
    test_states_are_equal(verbs["go"].process(["south"]), testStateSE);
    test_states_are_equal(verbs["explore"].process(["surroundings"]), testStateExploreSE);

    test_states_are_equal(verbs["examine"].process(["radio"]), testStateRadioUnidentified);
    test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadioUnidentified);
    test_states_are_equal(verbs["examine"].process(["door"]), testStateDoor);
    
    test_states_are_equal(verbs["identify"].process(["door"]), testStateIdentifyDoor);
    test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadio);
    test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadioAgain);
    
    test_states_are_equal(verbs["take"].process(["door"]), testStateTakeDoor);
    test_states_are_equal(verbs["inventory"].process(), testStateInventory);
    test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadio);
    test_states_are_equal(verbs["inventory"].process(), testStateInventoryRadio);

    // unpackGameStateIntoString
    test_are_equal(unpackGameStateIntoString(gameState), "It is pitch-black...\n");

    console.log("unit tests successful");
}
