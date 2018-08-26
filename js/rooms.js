// ROOM OBJECT ====================================================================================

// attributes
let Room = function(name, description, keyRoomDict, coordinates, itemsInRoom, audioOnEnter, firstEntranceString) {
    this.name = name;
    this.description = description;
    this.keyRoomDict = keyRoomDict;
    this.coordinates = coordinates;
    this.itemsInRoom = itemsInRoom;
    this.hasBeenEntered = false;
};

// methods ----------------------------------------------------------------------------------------

// On entering a room
Room.prototype.onEnter = function() {
    
    // if the room has not been entered before
    if (!this.hasBeenEntered) {
        
        // if there is audio for first entrance
        if (this.audioOnFirstEntrance) {
            this.audioOnFirstEntrance.play();
        }

        // if the room has a string for first entrance.
        if (this.firstEntranceString) {
            this.description = this.firstEntranceString;
        }
    
    // the room has now been entered
    this.hasBeenEntered = true;
    }
    
    // if the room has been entered before
    else {
        if (this.entranceString) {
            this.description = this.entranceString;
        }
    }
};


function loadRooms() {

    rooms["se"] = new Room(
        "se", "It is pitch-black...\n", { north: "ne", south: "You can't go that way. There is a wall.", east: "You can't go that way. There is a wall.", west: "sw" }, [15, 5], []);

    rooms["ne"] = new Room(
        "ne", "It is pitch-black...\n", { north: "You can't go that way. There is a wall.", south: "se", east: "You can't go that way. There is a wall.", west: "nw" }, [15, 25], []);

    // NW -----------------------------------------------------------------------------------------

    rooms["nw"] = new Room(
        "nw", "It is pitch-black...\n", { north: "You can't go that way. There is a wall.", south: "sw", east: "ne", west: "You can't go that way. There is a wall." }, [5, 25],  [items["radio"]]);
        
    rooms["nw"].audioOnFirstEntrance = radio_fall;
    rooms["nw"].firstEntranceString = "You knocked something over.\n";
    rooms["nw"].entranceString = "There something on the floor.\n";
    


    // SW -----------------------------------------------------------------------------------------

    rooms["sw"] = new Room(
        "sw", "It is pitch-black...\n", { north: "nw", south: "You can't go that way. There is a wall.", east: "se", west: "You can't go that way. There is a wall." }, [5, 5], [items["batteries"]]);
        
    rooms["sw"].audioOnFirstEntrance = rolling_batteries;
    rooms["sw"].firstEntranceString = "You hit something with your foot.\n";
    rooms["sw"].entranceString = "Theres something on the floor.\n";

}
loadRooms();

// ================================================================================================
