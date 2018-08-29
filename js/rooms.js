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
        "You follow the path. There are trees on both sides of you. The road continues to the east and west.\n",
        
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
        "You follow the path and reach a small opening. The ground feels soft here. The path continues to the southeast. You notice a gap in the trees to the northeast.\n",
        
        // directions -----------------
        { southeast: "path se/nw", northeast: "path ne/sw", west: "path e/w" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        [items["keys"]]
        );
        

    // path se/nw -------------------------------------------------------------------------------------
        
    rooms["path se/nw"] = new Room(
        
        // name -----------------------
        "Path SE/NW\n",
        
        // description ----------------
        "You are on a southeast/northwest road.\n",
        
        // directions -----------------
        { northwest: "opening" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        []
    );
    
    // path ne/sw -------------------------------------------------------------------------------------
        
    rooms["path ne/sw"] = new Room(
        
        // name -----------------------
        "Path NE/SW\n",
        
        // description ----------------
        "You are on a northeast/southwest trail.\n",
        
        // directions -----------------
        { northeast: "building front", southwest: "opening" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        []
    );
    
    // building front -------------------------------------------------------------------------------------
        
    rooms["building front"] = new Room(
        
        // name -----------------------
        "Building Front\n",
        
        // description ----------------
        "You are at the end of the road. There is a building in front of you and the road leads back to the southwest. \n[game ends here]\n",
        
        // directions -----------------
        { southwest: "building front" },
        
        // coordinates ----------------
        [15, 5], 
        
        // items ----------------------
        []
    );
    

}
loadRooms();

// ================================================================================================
