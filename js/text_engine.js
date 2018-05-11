

// PROCESS USER INPUT =============================================================================

function processUserInput() {

    // userInput is made into lower case
    var userInput = document.getElementById("userInput").value.toLowerCase();

    // check that user has inputted something
    if (userInput != "") {

        // // print userInput in console
        // printToLog(userInput);

        // parse userInput
        userInput = parser(userInput);

        // split userInput into words
        var userInputWords = userInput.split(" ");

        // for every valid verb
        for (var i = 0; i < verbs.length; i++) {

            // if the user's first word is a valid verb
            if (userInputWords[0] == verbs[i].verbName) {

                // check that the user has given a second word
                if (userInputWords.length > 1) {
                    // input the second word to the verb function
                    verbs[i].process(userInputWords.slice(1, userInputWords.length));
                    return;
                }
                else {
                    printToLog("You must provide a second word when using " + userInputWords[0]);
                }
            }
        }
        printToLog("First word should be a verb");
    }
    // if the user has not inputted anything
    else {
        printToLog("Empty userInput")
    }
}
// ================================================================================================




// PARSER =========================================================================================

function parser(userInput) {
    userInput = userInput.replace("north", "NORTH");
    userInput = userInput.replace("south", "SOUTH");
    userInput = userInput.replace("east", "EAST");
    userInput = userInput.replace("west", "WEST");
    userInput = userInput.replace("history", "HISTORY");
    userInput = userInput.replace("-", "");
    return userInput;
}

// ================================================================================================





// PROCESS ROOM ATTRIBUTES ========================================================================

function processRoomAttributes() {

    // check the inputVisible attribute of the current room
    inputVisible(currentRoom.inputVisible);



    // When in NE
    if (currentRoom.name == "ne") {
        sounds["snoring"].active = false;
        sounds["snoreWakeUp"].active = true;
    }
    else {
        sounds["snoring"].active = true;
        sounds["snoreWakeUp"].active = false;
    }
}
// ================================================================================================





// INPUT VISIBLE ==================================================================================

function inputVisible(visibility) {
    if (visibility == false) {
        document.getElementById("userInput").style.visibility = 'hidden';
    }
    if (visibility == true) {
        document.getElementById("userInput").style.visibility = 'visible';
        document.getElementById("userInput").focus();
    }
}
// ================================================================================================






// PRINT TO LOG ===================================================================================

function printToLog(textToPrint) {

    // add input to log
    logArray.push(textToPrint);
    // print log
    document.getElementById("console").innerHTML = logArray.join("\n");

}
// ================================================================================================




// PRINT LOG  HISTORY =============================================================================

function printLogHistory() {

    // print log
    document.getElementById("console").reset();
    document.getElementById("console").innerHTML += "\nLog history: " + (logHistoryArray.join("\n")) + "\n" +
        currentRoom.descriptions[currentRoom.descriptionIndex];
}
// ================================================================================================