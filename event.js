function keyPressed () {

    switch (key) {

        case "A": 
        player.LEFT_RIGHT_DIRECTION = -1;
        break;
        case "D": 
        player.LEFT_RIGHT_DIRECTION = 1;
        break;
        case "W": 
        player.UP_DOWN_DIRECTION = 1;
        break;
        case "S": 
        player.UP_DOWN_DIRECTION = -1;
        break;
    }

    

}

function keyReleased () {
    switch (key) {

        case "A": 
        player.LEFT_RIGHT_DIRECTION = 0;
        break;
        case "D": 
        player.LEFT_RIGHT_DIRECTION = 0;
        break;
        case "W": 
        player.UP_DOWN_DIRECTION = 0;
        break;
        case "S": 
        player.UP_DOWN_DIRECTION = 0;
        break;
    } 
}

function moveTo(val,dir) {
    if (dir == "up" || dir == "down") {
        player.UP_DOWN_DIRECTION = val;
    }else {
        player.LEFT_RIGHT_DIRECTION = val; 
    }
}

