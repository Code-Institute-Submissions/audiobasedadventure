// PROCESS USER INPUT =============================================================================

function processUserInput() {

    // userInput is made into lower case
    var userInput = document.getElementById("userInput").value.toLowerCase();

    // check that user has inputted something
    if (userInput == "") {
        console.log("Empty userInput")
        return;
    }
    // parse userInput
    userInput = parser(userInput);

    // split userInput into words
    var userInputWords = userInput.split(" ");

    // if the user's first word is a valid verb
    if (userInputWords[0] in verbs) {

        // add the current log to the logHistoryArray
        logHistoryArray = logHistoryArray.concat(logArray);

        // empty the log
        logArray = [];

        // input the remaining words to the verb function
        verbs[userInputWords[0]].process(userInputWords.slice(1, userInputWords.length));
        return;
    }
    printToLog("First word should be a verb");


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
        currentRoom.description;
}
// ================================================================================================
