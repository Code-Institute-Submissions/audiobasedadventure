// ROOM OBJECT ====================================================================================

let Room = function(name, description, keyRoomDict, audioObject, coordinates, interactableItems) {
    this.name = name;
    this.description = description;
    this.keyRoomDict = keyRoomDict;
    this.audioObject = audioObject;
    this.coordinates = coordinates;
    this.interactableItems = interactableItems;
};

rooms["se"] = new Room(
    "se", "It is pitch-black...\n", { NORTH: "ne", SOUTH: "You can't go that way. There is a wall.", EAST: "You can't go that way. There is a wall.", WEST: "sw" }, [], [15, 5], [items["radio"]]);

rooms["ne"] = new Room(
    "ne", "It is pitch-black...\n", { NORTH: "You can't go that way. There is a wall.", SOUTH: "se", EAST: "You can't go that way. There is a wall.", WEST: "nw" }, [], [15, 25], []);

rooms["nw"] = new Room(
    "nw", "It is pitch-black...\n", { NORTH: "You can't go that way. There is a wall.", SOUTH: "sw", EAST: "ne", WEST: "You can't go that way. There is a wall." }, [], [5, 25], []);

rooms["sw"] = new Room(
    "sw", "It is pitch-black...\n", { NORTH: "nw", SOUTH: "You can't go that way. There is a wall.", EAST: "se", WEST: "You can't go that way. There is a wall." }, [], [5, 5], []);

// ================================================================================================

var currentRoom = rooms["se"];
