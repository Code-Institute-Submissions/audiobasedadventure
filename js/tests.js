function test_are_equal(actual, expected) {
    if (actual != expected) {
        throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
    }
}

function test_states_are_equal(actual, expected) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error("Expected '" + JSON.stringify(expected) + "' but got '" + JSON.stringify(actual) + "'.");
    }
}


function test_arrays_are_equal(actual, expected) {
    
    if(actual.length != expected.length) {
        throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
    }
    
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] != expected[i]) {
            throw new Error("Expected '" + expected + "' but got '" + actual + "'.");
        }
    }
}
