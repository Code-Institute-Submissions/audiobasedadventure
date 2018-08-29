// ROOM OBJECT ====================================================================================

// attributes
let Room = function(name, description, keyRoomDict, coordinates, itemsInRoom) {
    this.name = name;
    this.description = description;
    this.keyRoomDict = keyRoomDict;
    this.coordinates = coordinates;
    this.itemsInRoom = itemsInRoom;
    // this.hasBeenEntered = false;
};

// methods ----------------------------------------------------------------------------------------




function loadRooms() {
    
    // dead end -----------------------------------------------------------------------------------
    
    rooms["dead end"] = new Room(
        
        // name -----------------------
        "Dead end\n",
        
        // description ----------------
        "You are at the end of a dirt path. The path goes to the east.\n",
        
        // directions -----------------
        { east: "path e/w" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        [items["shovel"]]
        );
        
    // path e/w -----------------------------------------------------------------------------------
        
    rooms["path e/w"] = new Room(
        
        // name -----------------------
        "Path E/W\n",
        
        // description ----------------
        "You follow the path. There are more trees on both sides of you. The road continues to the east and west.\n",
        
        // directions -----------------
        { east: "opening", west: "dead end" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        []
        );
    
    //opening -------------------------------------------------------------------------------------
        
    rooms["opening"] = new Room(
        
        // name -----------------------
        "Opening\n",
        
        // description ----------------
        "You follow the path and reach a small opening. The ground feels soft here. There is a gap in the trees to the north.\n",
        
        // directions -----------------
        { north: "opening", west: "dead end" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        []
        );

}
loadRooms();

// ================================================================================================
