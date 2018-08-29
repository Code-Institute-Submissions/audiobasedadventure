// test_are_equal =================================================================================

function test_are_equal(actual, expected) {
    if (actual != expected) {
        throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
    }
}

function test_states_are_equal(actual, expected) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error("Expected '" + JSON.stringify(expected) + "'\n\n\nbut got\n\n\n'" + JSON.stringify(actual) + "'.");
    }
}


function test_arrays_are_equal(actual, expected) {

    if (actual.length != expected.length) {
        throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
    }

    for (var i = 0; i < actual.length; i++) {
        if (actual[i] != expected[i]) {
            throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
        }
    }
}

//  testStates ====================================================================================

/*
Test states are used to compare the current state of the game (gameState) with a predefined testState.
*/

var testStateNE = { currentRoom: rooms["ne"], inventory: [], actionResponse: "" };
var testStateSE = { currentRoom: rooms["se"], inventory: [], actionResponse: "" };
var testStateSW = { currentRoom: rooms["sw"], inventory: [], actionResponse: "" };
var testStateNW = { currentRoom: rooms["nw"], inventory: [], actionResponse: "" };

// unitTesting ====================================================================================

function unitTesting() {

    // parseUserInput
    
    test_arrays_are_equal(parseUserInput("walk north"), ["go", "north"]);
    test_arrays_are_equal(parseUserInput("head north"), ["go", "north"]);
    test_arrays_are_equal(parseUserInput("move north"), ["go", "north"]);
    test_arrays_are_equal(parseUserInput("travel north"), ["go", "north"]);
    test_arrays_are_equal(parseUserInput("run north"), ["go", "north"]);
    
    test_arrays_are_equal(parseUserInput("dig"), ["use", "shovel"]);
    test_arrays_are_equal(parseUserInput("pick up shovel"), ["take", "shovel"]);
    
    test_arrays_are_equal(parseUserInput("go to the north"), ["go", "north"]);
    test_arrays_are_equal(parseUserInput("use the radio"), ["use", "radio"]);

    // verbs
    // test_states_are_equal(verbs["go"].process(["north"]), { currentRoom: rooms["dead end"], inventory: [], actionResponse: "You can't go that way." });
    // test_states_are_equal(verbs["go"].process(["south"]), testStateSE);
    // test_states_are_equal(verbs["go"].process(["west"]), testStateSW);
    // test_states_are_equal(verbs["go"].process(["north"]), testStateNW);
    // test_states_are_equal(verbs["go"].process(["north"]), testStateNWboundary);
    // test_states_are_equal(verbs["go"].process(["west"]), testStateNWboundary);
    // test_states_are_equal(verbs["go"].process(["south"]), testStateSW);
    // test_states_are_equal(verbs["go"].process(["south"]), testStateSWboundary);
    // test_states_are_equal(verbs["go"].process(["west"]), testStateSWboundary);
    // test_states_are_equal(verbs["go"].process(["east"]), testStateSE);
    // test_states_are_equal(verbs["go"].process(["east"]), testStateSEboundary);
    // test_states_are_equal(verbs["go"].process(["south"]), testStateSEboundary);
    // test_states_are_equal(verbs["go"].process(["north"]), testStateNE);
    // test_states_are_equal(verbs["go"].process(["north"]), testStateNEboundary);
    // test_states_are_equal(verbs["go"].process(["east"]), testStateNEboundary);

    // test_states_are_equal(verbs["explore"].process(["something"]), testStateExploreNEsomething);
    // test_states_are_equal(verbs["explore"].process(["surroundings"]), testStateExploreNE);
    // test_states_are_equal(verbs["go"].process(["south"]), testStateSE);
    // test_states_are_equal(verbs["explore"].process(["surroundings"]), testStateExploreSE);

    // test_states_are_equal(verbs["examine"].process(["radio"]), testStateRadioUnidentified);
    // test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadioUnidentified);
    // test_states_are_equal(verbs["examine"].process(["door"]), testStateDoor);
    // test_states_are_equal(processUserInput("examine", ["door", "wood"]), testStateTooManyArgs);
    

    // test_states_are_equal(verbs["identify"].process(["door"]), testStateIdentifyDoor);
    // test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadio);
    // test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadioAgain);

    // test_states_are_equal(verbs["drop"].process(["radio"]), testStateDropRadioBeforeTaking);
    // test_states_are_equal(verbs["take"].process(["door"]), testStateTakeDoor);
    // test_states_are_equal(verbs["inventory"].process(), testStateInventory);

    // test_states_are_equal(verbs["use"].process(["radio"]), testStateUseRadio);
    // test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadio);
    // test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadioAlreadyTaken);
    // test_states_are_equal(verbs["use"].process(["radio"]), testStateUseRadioWhenInInventory);
    // test_states_are_equal(verbs["inventory"].process(), testStateInventoryRadio); 
    // test_states_are_equal(verbs["drop"].process(["radio"]), testStateDropRadioAfterTaking);
    
    // test_states_are_equal(verbs["go"].process(["north"]), testStateNE);
    // test_states_are_equal(verbs["identify"].process(["batteries"]), testStateIdentifyBatteries);
    // test_states_are_equal(verbs["use"].process(["batteries"]), testStateUseBatteries);
    // test_states_are_equal(verbs["take"].process(["batteries"]), testStateTakeBatteries);
    // test_states_are_equal(verbs["use"].process(["batteries"]), testStateUseBatteriesTaken);
    
    // // test_states_are_equal(items["batteries"].interactions["put"].process(["batteries radio"]), testStatePutBatteriesInRadio);




    // // test_states_are_equal(verbs["restart"].process(), testStateRestart);

    // verbs["restart"].process();

    // // unpackGameStateIntoString
    // test_are_equal(unpackGameStateIntoString(gameState), "It is pitch-black...\n");

    console.log("unit tests successful");

}
unitTesting();