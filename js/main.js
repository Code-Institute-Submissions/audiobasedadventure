var inputLogArray = [];

        // prints userInput to log
        function printUserInputInLog() {
            // condition to confirm valid userInput
            if (document.getElementById("userInput").value == "") {
                document.getElementById("inputLog").innerHTML += "<br>" + "Invalid user input";
            }
            else {
                inputLogArray.push(document.getElementById("userInput").value);
                // addressing HTML element with ID of result and changing it to equal the value of the fname form
                document.getElementById("inputLog").innerHTML = inputLogArray.join("\n");
                
                // keep scroll bar at bottom
                var textarea = document.getElementById("inputLog");
                if (textarea != null) {
                    textarea.scrollTop = textarea.scrollHeight;
                }
            }
            return false;
        }