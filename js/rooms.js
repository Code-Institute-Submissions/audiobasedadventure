
// ROOM OBJECT ====================================================================================

let Room = function(name, descriptions, descriptionIndex, keyRoomDict, inputVisible, inputVisibleAfterDelay, audioObject, coordinates, interactableItems) {
    this.name = name;
    this.descriptions = descriptions;
    this.descriptionIndex = descriptionIndex;
    this.keyRoomDict = keyRoomDict;
    this.inputVisible = inputVisible;
    this.inputVisibleAfterDelay = inputVisibleAfterDelay;
    this.audioObject = audioObject;
    this.coordinates = coordinates;
    this.interactableItems = interactableItems;
};

rooms["se"] = new Room(
    "se", ["It is pitch-black...\n"], 0, { NORTH: "e", SOUTH: "wall", EAST: "wall", WEST: "sw" }, true, true, ["waterDrops", "snoring", "radioStatic"], [15, 5], []);

rooms["e"] = new Room(
    "e", ["It is pitch-black...\n"],
    0, { NORTH: "ne", SOUTH: "se", EAST: "wall", WEST: "w" }, true, true, ["waterDrops", "waterDropsOff", "snoring", "radioStatic"], [15, 15], ["tap"]);

rooms["ne"] = new Room(
    "ne", ["It is pitch-black...\n"],
    0, { NORTH: "wall", SOUTH: "e", EAST: "wall", WEST: "nw" }, true, true, ["waterDrops", "snoring", "radioStatic", "snoreWakeUp"], [15, 25], ["radio"]);

rooms["nw"] = new Room(
    "nw", ["It is pitch-black...\n"],
    0, { NORTH: "wall", SOUTH: "w", EAST: "ne", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 25], []);

rooms["w"] = new Room(
    "w", ["It is pitch-black...\n"],
    0, { NORTH: "nw", SOUTH: "sw", EAST: "e", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 15], []);

rooms["sw"] = new Room(
    "sw", ["It is pitch-black...\n"],
    0, { NORTH: "w", SOUTH: "wall", EAST: "se", WEST: "wall" }, true, true, ["waterDrops", "snoring", "radioStatic"], [5, 5], []);

// ================================================================================================

var currentRoom = rooms["se"];
