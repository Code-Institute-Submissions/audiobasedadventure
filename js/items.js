// ITEM FUNCTIONS =================================================================================

/* Item functions are separate from core functions. They are functions that are specific to certain
items. Item objects are at the bottom of this script. */

// RADIO ON --------------------------------------------------------------------------------------

function radioOn() 
{
    if(!items["radio"].usable) 
    {
        printToLog("You try to switch on the radio but nothing happens.");
        return;
    }
}

//  -----------------------------------------------------------------------------------------------

//  ===============================================================================================





// INTERACTABLE ITEM OBJECTS  =====================================================================

let item = function(itemName, interactions, identified, itemDescription, usable, on) {
    this.itemName = itemName;
    this.interactions = interactions;
    this.identified = identified;
    this.itemDescription = itemDescription;
    this.usable = usable;
    this.on = on;
};

// ## RADIO ##

items["radio"] = new item(
    "radio", 
    { 
        // interactions
        explore: "You run your hands over a plastic device with pushable buttons and twistable knobs.", 
        identify: "radio", 
        examine: "You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.",
        // use is switching on an off the radio
        use: function() {
            radioOn();
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

//  ===============================================================================================
