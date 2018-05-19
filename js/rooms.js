
// ROOM OBJECT ====================================================================================

let Room = function(name, description, keyRoomDict, audioObject, coordinates, interactableItems) {
    this.name = name;
    this.description = description;
    this.keyRoomDict = keyRoomDict;

    this.coordinates = coordinates;
    this.interactableItems = interactableItems;
};

rooms["se"] = new Room(
    "se", "It is pitch-black...\n", {north: "ne", south: "You can't go that way. There is a wall.", east: "You can't go that way. There is a wall.", west: "sw"}, [15, 5], [items["radio"]]);

rooms["ne"] = new Room(
    "ne", "It is pitch-black...\n", {north: "You can't go that way. There is a wall.", south: "se", east: "You can't go that way. There is a wall.", west: "nw"}, [15, 25], []);

rooms["nw"] = new Room(
    "nw", "It is pitch-black...\n", {north: "You can't go that way. There is a wall.", south: "sw", east: "ne", west: "You can't go that way. There is a wall."}, [5, 25], []);

rooms["sw"] = new Room(
"sw", "It is pitch-black...\n", { north: "nw", south: "You can't go that way. There is a wall.", east: "se", west: "You can't go that way. There is a wall."}, [5, 5], []);

// ================================================================================================
