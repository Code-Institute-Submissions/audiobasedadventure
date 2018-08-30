// items  =========================================================================================

let item = function(name, description, interactions, takeAudio, discovered) {
    this.name = name;
    this.description = description;
    this.interactions = interactions;
    this.takeAudio = takeAudio;
    this.discovered = discovered;
};

function loadItems() {
    
    // shovel -------------------------------------------------------------------------------------
    
    items["shovel"] = new item(
        
        // name -----------------------
        "shovel", 
        
        // description ----------------
        "There is a shovel here.\n", 
        
        // interactions ---------------
        {
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
        takeAudio = pick_up_shovel, 
        discovered = true
        );
    
    items["shovel"].usedInOpening = (false);
    
    
    // keys -------------------------------------------------------------------------------------
    
    items["keys"] = new item(
        
        // name -----------------------
        "keys", 
        
        // description ----------------
        "", 
        
        // interactions ---------------
        {
            examine: "The keys are covered in rust...",
            
            // use is switching on and off the radio
            use: function() {
                    
                gameState.actionResponse = "You cannot use the keys here.";
                return gameState;
            },
        },
        takeAudio = pick_up_keys,
        discovered = false
        );
}
loadItems();

//  ===============================================================================================

