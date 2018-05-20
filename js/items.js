// items  =========================================================================================

let item = function(itemName, interactions, identified, itemDescription, usable, on) {
    this.itemName = itemName;
    this.interactions = interactions;
    this.identified = identified;
    this.itemDescription = itemDescription;
    this.usable = usable;
    this.on = on;
};

function loadItems() {

    items["radio"] = new item(
        "radio", {
            // interactions
            explore: "You run your hands over a plastic device with pushable buttons and twistable knobs.",
            identify: "You identify a radio in the room.",
            examine: "You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.",
            // use is switching on an off the radio
            use: function() {
                return radioOn();
            },
            turn: {
                clockwise: "clockwise",
                anticlockwise: "You turn the knob anti-clockwise."
            }
        },
        false,
        "There is a radio in the room.",
        false,
        false);

    items["batteries"] = new item(
        "batteries", {
            // interactions
            explore: "You run your hands over two small cylindrical items.",
            identify: "You identify batteries.",
            examine: "Two batteries.",
            // use is switching on an off the radio
            use: function() {
                return useBatteries();
            },
            put: itemVerbs["putBatteriesInRadio"]
        },
        false,
        "There are batteries in the room.",
        true,
        false);
}
loadItems();

//  ===============================================================================================
// // TURN FUNCTION ----------------------------------------------------------------------------------

// function turn(objectAndDirectionToTurn) {
//     if (objectAndDirectionToTurn.length == 2) {
//         printToLog("You must use two words with 'turn' (object to turn and direction to turn')");
//     }
//     for (var i = 0; i < currentRoom.interactableItems.length; i++) {
//         if ((currentRoom.interactableItems[i].itemName == objectAndDirectionToTurn[0]) && ("turn" in currentRoom.interactableItems[i].interactions)) {
//             if (objectAndDirectionToTurn[1] in currentRoom.interactableItems[i].interactions["turn"]) {
//                 tapFunction(objectAndDirectionToTurn[1]);
//             }
//             printToLog("You cannot turn this direction.")
//         }
//     }
// }
// //  --------------------------------------------------------------------------------------------

// verbs["turn"] = new verb("turn", function(secondWord, thirdWord) {
//     turn(secondWord, thirdWord);
// })
