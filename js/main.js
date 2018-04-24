var logArray = [];
var descArray = ["Good Morning!"];


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

function evaluateUserInput(keyString) {
    var userInput = document.getElementById("userInput").value;
    if (userInput == keyString) {
        printText("yay");
    }
}

// ================================================================================================