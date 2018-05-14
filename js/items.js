// ITEM FUNCTIONS =================================================================================

/* Item functions are separate from core functions. They are functions that are specific to certain
items. Item objects are at the bottom of this script. */

// TAP FUNCTION -----------------------------------------------------------------------------------

function tapFunction(direction) {

    // if turned anticlockwise
    if (direction == "anticlockwise") {

        if (sounds["waterDrops"].active) {
            // water drops sound should stop
            sounds["waterDrops"].active = false;
            // tap is off
            tap.on = false;
            
            // record the time that the tap is switched off.
            timeOfTapOff = time;
            
            sounds["waterDropsOff"].active = true;
        } else {
            printToLog("Nothing happens.")
        }

    }
    else {
        if (!sounds["waterDrops"].active) {
            // water drops sound should stop
            sounds["waterDrops"].active = true;
            // tap is off
            tap.on = true;
            sounds["waterDropsOff"].active = false;
        } else {
            printToLog("Nothing happens.")
        }
    }
    // playCurrentRoomAudio
    playCurrentRoomAudio();
    sounds["waterDropsOff"].active = false;
    return;
}
//  -----------------------------------------------------------------------------------------------

//  ===============================================================================================





// INTERACTABLE ITEM OBJECTS  =====================================================================

let item = function(itemName, interactions, identified, itemDescription, on) {
    this.itemName = itemName;
    this.interactions = interactions;
    this.identified = identified;
    this.itemDescription = itemDescription
    this.on = on;
};

// ## TAP ##

items["tap"] = new item("tap", { explore: "You run your hands against an object directly to your right. It is some sort of rigid metal structure fixed against the wall.", identify: "tap", use: function() {return "You can turn the tap clockwise or anti-clockwise."}, turn: { clockwise: "clockwise", anticlockwise: "You turn the tap anti-clockwise." } }, false, "There is a tap in the room.", true);

// ## RADIO ##

items["radio"] = new item("radio", { explore: "You run your hands over a device with pushable buttons and twistable knobs.", identify: "radio", use: function() {return "You can turn the knob of the radio clockwise or anti-clockwise."}, turn: { clockwise: "clockwise", anticlockwise: "You turn the knob anti-clockwise." } }, false, "There is a radio in the room.", true);

//  ===============================================================================================
