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

var testStateNWboundary = { currentRoom: rooms["nw"], inventory: [], actionResponse: "You can't go that way. There is a wall." };
var testStateSWboundary = { currentRoom: rooms["sw"], inventory: [], actionResponse: "You can't go that way. There is a wall." };
var testStateSEboundary = { currentRoom: rooms["se"], inventory: [], actionResponse: "You can't go that way. There is a wall." };
var testStateNEboundary = { currentRoom: rooms["ne"], inventory: [], actionResponse: "You can't go that way. There is a wall." };

var testStateExploreNEsomething = { currentRoom: rooms["ne"], inventory: [], actionResponse: "You can only explore 'surroundings'." };
var testStateExploreNE = { currentRoom: rooms["ne"], inventory: [], actionResponse: "You use your hands to explore your surroundings.\nYou run your hands over two small cylindrical items." };
var testStateExploreSE = { currentRoom: rooms["se"], inventory: [], actionResponse: "You use your hands to explore your surroundings.\nYou run your hands over a plastic device with pushable buttons and twistable knobs." };

var testStateRadioUnidentified = { currentRoom: rooms["se"], inventory: [], actionResponse: "You cannot examine an item until you have identified it." };
var testStateDoor = { currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door to examine." };
var testStateTooManyArgs = { currentRoom: rooms["se"], inventory: [], actionResponse: "Expected number of arguments when using 'examine': 1"};

var testStateIdentifyDoor = { currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door in the room." };
var testStateIdentifyRadio = { currentRoom: rooms["se"], inventory: [], actionResponse: "You identify a radio in the room." };
var testStateIdentifyRadioAgain = { currentRoom: rooms["se"], inventory: [], actionResponse: "Radio has already been identified" };

var testStateTakeRadioUnidentified = { currentRoom: rooms["se"], inventory: [], actionResponse: "You cannot take an item until you have identified it." };
var testStateTakeDoor = { currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door in the room." };

var testStateUseRadio = { currentRoom: rooms["se"], inventory: [], actionResponse: "You try to switch on the radio but nothing happens." };

var testStateDropRadioBeforeTaking = { currentRoom: rooms["se"], inventory: [], actionResponse: "There is no radio in your inventory." };

var testStateDropRadioAfterTaking = { currentRoom: rooms["se"], inventory: [], actionResponse: "You drop the radio. \n(The radio is now in the room)" };

var testStateTakeRadio = { currentRoom: rooms["se"], inventory: [items["radio"]], "actionResponse": "You take the radio. \n(You can look inside your inventory by entering 'inventory')" }

testStateTakeRadioAlreadyTaken = { currentRoom: rooms["se"], inventory: [items["radio"]], "actionResponse": "There is no radio in the room." }

var testStateUseRadio = { currentRoom: rooms["se"], inventory: [], actionResponse: "You try to switch on the radio but nothing happens." };

var testStateUseRadioWhenInInventory = { currentRoom: rooms["se"], inventory: [items["radio"]], actionResponse: "You try to switch on the radio but nothing happens." };

var testStateInventory = { currentRoom: rooms["se"], inventory: [], actionResponse: "Your inventory is empty." };

var testStateInventoryRadio = { currentRoom: rooms["se"], inventory: [items["radio"]], actionResponse: "You look inside your inventory:\nRadio\n" };

var testStateIdentifyBatteries = { currentRoom: rooms["ne"], inventory: [], actionResponse: "You identify batteries." };

var testStateUseBatteries = { currentRoom: rooms["ne"], inventory: [], actionResponse: "Batteries must be in your inventory before you can use them." };

var testStateTakeBatteries  = { currentRoom: rooms["ne"], inventory: [items["batteries"]], actionResponse: "You take the batteries. \n(You can look inside your inventory by entering 'inventory')" };

var testStateUseBatteriesTaken = { currentRoom: rooms["ne"], inventory: [items["batteries"]], actionResponse: "You can't use the batteries on their own. Try putting the batteries in another item." };

var testStatePutBatteriesInRadio = { currentRoom: rooms["ne"], inventory: [], actionResponse: "You put the batteries in the radio." };

var testStateRestart = { "currentRoom": { "name": "se", "description": "It is pitch-black...\n", "keyRoomDict": { "north": "ne", "south": "You can't go that way. There is a wall.", "east": "You can't go that way. There is a wall.", "west": "sw" }, "coordinates": [15, 5], "interactableItems": [{ "itemName": "radio", "interactions": { "explore": "You run your hands over a plastic device with pushable buttons and twistable knobs.", "identify": "You identify a radio in the room.", "examine": "You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.", use: function() {
                return radioOn();
            }, "turn": { "clockwise": "clockwise", "anticlockwise": "You turn the knob anti-clockwise." } }, "identified": false, "itemDescription": "There is a radio in the room.", "usable": false, "on": false }] }, inventory: [], actionResponse: "" };

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
    test_states_are_equal(processUserInput("examine", ["door", "wood"]), testStateTooManyArgs);
    

    test_states_are_equal(verbs["identify"].process(["door"]), testStateIdentifyDoor);
    test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadio);
    test_states_are_equal(verbs["identify"].process(["radio"]), testStateIdentifyRadioAgain);

    test_states_are_equal(verbs["drop"].process(["radio"]), testStateDropRadioBeforeTaking);
    test_states_are_equal(verbs["take"].process(["door"]), testStateTakeDoor);
    test_states_are_equal(verbs["inventory"].process(), testStateInventory);

    test_states_are_equal(verbs["use"].process(["radio"]), testStateUseRadio);
    test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadio);
    test_states_are_equal(verbs["take"].process(["radio"]), testStateTakeRadioAlreadyTaken);
    test_states_are_equal(verbs["use"].process(["radio"]), testStateUseRadioWhenInInventory);
    test_states_are_equal(verbs["inventory"].process(), testStateInventoryRadio); 
    test_states_are_equal(verbs["drop"].process(["radio"]), testStateDropRadioAfterTaking);
    
    test_states_are_equal(verbs["go"].process(["north"]), testStateNE);
    test_states_are_equal(verbs["identify"].process(["batteries"]), testStateIdentifyBatteries);
    test_states_are_equal(verbs["use"].process(["batteries"]), testStateUseBatteries);
    test_states_are_equal(verbs["take"].process(["batteries"]), testStateTakeBatteries);
    test_states_are_equal(verbs["use"].process(["batteries"]), testStateUseBatteriesTaken);
    
    // test_states_are_equal(items["batteries"].interactions["put"].process(["batteries radio"]), testStatePutBatteriesInRadio);




    // test_states_are_equal(verbs["restart"].process(), testStateRestart);

    verbs["restart"].process();

    // unpackGameStateIntoString
    test_are_equal(unpackGameStateIntoString(gameState), "It is pitch-black...\n");

    console.log("unit tests successful");

}
