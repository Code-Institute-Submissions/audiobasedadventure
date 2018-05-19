
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