// items  =========================================================================================

let item = function(name, description, interactions, takeAudio) {
    this.name = name;
    this.description = description;
    this.interactions = interactions;
    this.takeAudio = takeAudio;
};

function loadItems() {
    
    // shovel -------------------------
    
    items["shovel"] = new item(
        
        // name -----------------------
        "shovel", 
        
        // description ----------------
        "There is a shovel here.\n", 
        
        // interactions ---------------
        {
            
            // interactions
            explore: "You run your hands over a plastic device on the floor with pushable buttons and twistable knobs.",
            examine: "Its covered in moss. It must have been here for a long time...",
            
            // use is switching on and off the radio
            use: function() {
                if (gameState.currentRoom == rooms["opening"]) {
                    
                    if (!this.usedInOpening) {
                        gameState.actionResponse = "You start digging...";
                        dig_with_shovel.play();
                        this.usedInOpening = true;
                    } else {
                        gameState.actionResponse = "You've already dug here. You found nothing.";
                    }
                }
                else {
                    gameState.actionResponse = "You cannot dig here.";
                }
            return gameState;
            },
        },
        takeAudio = pick_up_shovel
        );
    
    items["shovel"].usedInOpening = (false);
    
    
    

    items["radio"]
    = new item(
        "radio", {
            
            // interactions
            explore: "You run your hands over a plastic device on the floor with pushable buttons and twistable knobs.",
            examine: "You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.",
            
            // use is switching on and off the radio
            use: function() {
                if (!items["radio"].usable) {
                    gameState.actionResponse = "You try to switch on the radio but nothing happens. It must need power...";
                    return gameState;
                }
            },
        },
        false,
        false);

    items["batteries"] = new item(
        "batteries", 
        {
        // interactions -----------------------------------------------------------------------
            
            explore: "You run your hands over two small cylindrical items.",
            identify: "You identify batteries.",
            examine: "Two batteries.",
            
            //  use batteries ----------------------------------------------------------------------
            
            use: function() {

                for (var i = 0; i < gameState.inventory.length; i++) {
                    if (gameState.inventory[i] == items["batteries"]) {
                        gameState.actionResponse = "You can't use the batteries on their own. Try putting the batteries in another item.";
                        return gameState;
                    } 
                }
                gameState.actionResponse = "You can't use the batteries unless they are in your inventory.";
                return gameState;
            },
            
            // putBatteriesInRadio ----------------------------------------------------------------
            
            put: function(target) {
                if (target == "radio") {
                    gameState.actionResponse = "You put the batteries inside the radio.";
                }
                return gameState;
            },
        },
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
