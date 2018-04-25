var logArray = [];
var rooms = [];


// PRINT TEXT =====================================================================================

function printText(toPrint) {
    // condition to confirm valid userInput
    if (toPrint == null) {
        toPrint = document.getElementById("userInput").value;
        if (toPrint == "") {
            document.getElementById("console").innerHTML += "<br>" + "Invalid user input";
        }
    }
    // add input to log
    logArray.push(toPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");
    // keep scroll bar at bottom
    var textarea = document.getElementById("console");
    if (textarea != null) {
        textarea.scrollTop = textarea.scrollHeight;
    }
}
// ================================================================================================


// EVALUATE USER INPUT ============================================================================

function evaluateUserInput() {
    if(document.getElementById("userInput").value == currentRoom.exitString) {
        console.log("user input evaluated");
        console.log(currentRoom.name);
        currentRoom = currentRoom.roomChange();
        console.log(currentRoom.name);
        printText(currentRoom.roomDescription());
    }
}

// ================================================================================================



// ROOM OBJECT =====================================================================================

    rooms[0] = {
    name: 'firstRoom', 
    status: 'You are standing in a room.',
    exits: 'There is a door to the North.',
    exitString: 'north',
    roomDescription: function() {
        return rooms[0].status + "\n" + rooms[0].exits;
    },
    roomChange: function() {
        return rooms[1];
    }
}

    rooms[1] = {
    name: 'secondRoom', 
    status: 'You are in a new room.',
    exits: 'There is a door to the South.',
    roomDescription: function() {
        return rooms[1].status + "\n" + rooms[1].exits;
    }
}

// ================================================================================================

var currentRoom = rooms[0];
