
// gameState  =====================================================================================

var gameState = {currentRoom: rooms["se"], inventory: [], actionResponse: ""};

//  testStates ====================================================================================

var testStateNE = {currentRoom: rooms["ne"], inventory: [], actionResponse: ""};
var testStateSE = {currentRoom: rooms["se"], inventory: [], actionResponse: ""};
var testStateSW = {currentRoom: rooms["sw"], inventory: [], actionResponse: ""};
var testStateNW = {currentRoom: rooms["nw"], inventory: [], actionResponse: ""};

var testStateNWboundary = {currentRoom: rooms["nw"], inventory: [], actionResponse: "You can't go that way. There is a wall."};
var testStateSWboundary = {currentRoom: rooms["sw"], inventory: [], actionResponse: "You can't go that way. There is a wall."};
var testStateSEboundary = {currentRoom: rooms["se"], inventory: [], actionResponse: "You can't go that way. There is a wall."};
var testStateNEboundary = {currentRoom: rooms["ne"], inventory: [], actionResponse: "You can't go that way. There is a wall."};

var testStateExploreNEsomething = {currentRoom: rooms["ne"], inventory: [], actionResponse: "You can only explore 'surroundings'."};
var testStateExploreNE = {currentRoom: rooms["ne"], inventory: [], actionResponse: "You use your hands to explore your surroundings.\n"};
var testStateExploreSE = {currentRoom: rooms["se"], inventory: [], actionResponse: "You use your hands to explore your surroundings.\nYou run your hands over a plastic device with pushable buttons and twistable knobs."};

var testStateRadioUnidentified = {currentRoom: rooms["se"], inventory: [], actionResponse: "You cannot examine an item until you have identified it."};
var testStateDoor = {currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door to examine."};

var testStateIdentifyDoor = {currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door in the room."};
var testStateIdentifyRadio = {currentRoom: rooms["se"], inventory: [], actionResponse: "You identify a radio in the room."};
var testStateIdentifyRadioAgain = {currentRoom: rooms["se"], inventory: [], actionResponse: "Radio has already been identified"};

var testStateTakeRadioUnidentified = {currentRoom: rooms["se"], inventory: [], actionResponse: "You cannot take an item until you have identified it."};
var testStateTakeDoor = {currentRoom: rooms["se"], inventory: [], actionResponse: "There is no door in the room."};
var testStateTakeRadio = {currentRoom: rooms["se"], inventory: [{"itemName":"radio","interactions":{"explore":"You run your hands over a plastic device with pushable buttons and twistable knobs.","identify":"You identify a radio in the room.","examine":"You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.","turn":{"clockwise":"clockwise","anticlockwise":"You turn the knob anti-clockwise."}},"identified":true,"itemDescription":"There is a radio in the room.","usable":false,"on":false}], actionResponse: "You take the radio. \n(You can look inside your inventory by entering 'inventory')"};

var testStateInventory = {currentRoom: rooms["se"], inventory: [], actionResponse: "Your inventory is empty."};

var testStateInventoryRadio = {currentRoom: rooms["se"], inventory: [{"itemName":"radio","interactions":{"explore":"You run your hands over a plastic device with pushable buttons and twistable knobs.","identify":"You identify a radio in the room.","examine":"You can turn the radio on and off and you can turn the knob of the radio clockwise or anti-clockwise.","turn":{"clockwise":"clockwise","anticlockwise":"You turn the knob anti-clockwise."}},"identified":true,"itemDescription":"There is a radio in the room.","usable":false,"on":false}], actionResponse: "You look inside your inventory:\nRadio\n"};