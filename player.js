class Player {
    constructor () {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_WIDTH / 2;
        this.size = 18;
        this.color = "#383e56"

        this.ANGLE = Math.PI * 2;
        this.LEFT_RIGHT_DIRECTION = 0;
        this.UP_DOWN_DIRECTION = 0;
        this.SPEED = 3;
        
    }
    render () {
        push();

        //The position
        translate(this.x, this.y);

        //rotate(this.ANGLE);

        //line direction
        stroke('#fa26a0');
        strokeWeight(2);
        line(0, 0, Math.cos(this.ANGLE)*30, Math.sin(this.ANGLE)*30);


        //Player
        noStroke();
        fill(this.color);
        ellipse(0, 0, this.size, this.size);

        pop();
    }

    update () {
        this.ANGLE += ( this.LEFT_RIGHT_DIRECTION * Math.PI / 180 ) * this.SPEED;
        if (!map.isWall()) {
        this.x += Math.cos(this.ANGLE) * this.UP_DOWN_DIRECTION * this.SPEED;
        this.y += Math.sin(this.ANGLE) * this.UP_DOWN_DIRECTION * this.SPEED;
        }else {
            this.x += Math.cos(this.ANGLE) * this.UP_DOWN_DIRECTION * this.SPEED * -5;
            this.y += Math.sin(this.ANGLE) * this.UP_DOWN_DIRECTION * this.SPEED * -5;
        }
    }
}