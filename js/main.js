var logArray = [];
var rooms = [];

var openingAudio = new Audio("audio/grandfather_clock.wav");
openingAudio.load();



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




// PLAY AUDIO =====================================================================================

function playAudio() {
    currentRoom.audio.play();
    console.log("playing " + currentRoom.audioName)
}

// ================================================================================================



// INPUT VISIBLE ==================================================================================

function inputVisible(visibility) {
    if(visibility == false){
        document.getElementById("userInput").style.visibility='hidden';
    }
    if(visibility == true){
        document.getElementById("userInput").style.visibility='visible';
        document.getElementById("userInput").focus();
    }
}

// ================================================================================================



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
    console.log(toPrint);
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


// PRINTROOMINFO ===================================================================================

async function printRoomInfo() {
        
        var exitsCombined = [];
        for(var i = 0; i < currentRoom.exits.length; i++) {
            exitsCombined[i] = currentRoom.exits[i];
        }
        inputVisible(currentRoom.inputVisible);
        printText(currentRoom.status + "\n" + exitsCombined.join("\n"));
        
        await sleep(currentRoom.delayTime);
        inputVisible(currentRoom.inputVisibleAfterDelay);
        printText(currentRoom.delayedDescription);
    }

// ================================================================================================


// EVALUATE USER INPUT ============================================================================

function evaluateUserInput() {

    // check that user has inputted something
    if (document.getElementById("userInput").value != "") {
        
        // look through exitStrings of current room
        for(var i = 0; i < currentRoom.exitStrings.length; i++) {
            
            // if the input matches the current room exitString change rooms and print new room description
            if (document.getElementById("userInput").value.toLowerCase() == currentRoom.exitStrings[i]) {
            console.log("user input evaluated");
            console.log(i);
            currentRoom = changeRoom(i);
            console.log("Current Room: " + currentRoom.name);
            printText(printRoomInfo());
            return;
            }
        }
        
        // return message when userInput does not match keyString
        printText("Nothing happens...");
    }
}

// ================================================================================================





// CHANGE ROOM ===================================================================================

function changeRoom(roomIndex) {
        return rooms[currentRoom.adjacentRooms[roomIndex]];
    }

// ================================================================================================
















// ROOM OBJECT =====================================================================================

let Room = function(name, status, exits, exitStrings, adjacentRooms, delayTime, delayedDescription, inputVisible, inputVisibleAfterDelay, audio, audioName) {
  this.name = name;
  this.status = status;
  this.exits = exits;
  this.exitStrings = exitStrings;
  this.adjacentRooms = adjacentRooms;
  this.delayTime = delayTime;
  this.delayedDescription = delayedDescription;
  this.inputVisible = inputVisible;
  this.inputVisibleAfterDelay = inputVisibleAfterDelay;
  this.audio = audio;
  this.audioName = audioName;
  
}

rooms[0] = new Room("firstRoom", "It is pitch black.", [], ["8"], [1], 45000, "Do you have the time?", false, true, openingAudio, "opening audio");

// ================================================================================================

var currentRoom = rooms[0];

