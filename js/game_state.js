// gameState  =====================================================================================

var gameState;

function loadGameState() {
    gameState = { currentRoom: rooms["dead end"], inventory: [], actionResponse: "" };
}
loadGameState();
