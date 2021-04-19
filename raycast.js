class Raycast {
    constructor (ray_angle) {
        this.ray_angle_init = ray_angle;
        this.ray_distance = 64; 
        this.color = "#fa7d09";
    }
    update () {
        this.RAY_ANGLE = normalizeAngle(player.ANGLE - this.ray_angle_init);

        let yintercept, xintercept, ystep, xstep;

        let foundH = false;
        let hwallhitX = 0;
        let hwallhitY = 0;

        this.isHoriz = false;
        this.isVer = false;

        this.isFacingDown = this.RAY_ANGLE > 0 && this.RAY_ANGLE < Math.PI;
        this.isFacingUp= !this.isFacingDown;

        this.isFacingRight = this.RAY_ANGLE < 0.5 * Math.PI|| this.RAY_ANGLE > 1.5 * Math.PI;
        this.isFacingLeft = !this.isFacingRight;

        let ray_angle = this.RAY_ANGLE

       




        
        yintercept = (floor(player.y / SIZE) * SIZE);
        yintercept += (this.isFacingDown) ? SIZE : 0;
        xintercept = player.x + (yintercept-player.y) / Math.tan(ray_angle);

        ystep = SIZE;
        ystep *= this.isFacingUp ? -1 : 1;
        xstep = SIZE / Math.tan(this.RAY_ANGLE);
        xstep *= (this.isFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (this.isFacingRight && xstep < 0) ? -1 : 1;

        let nextHx = xintercept;
        let nextHy = yintercept;
        if (this.isFacingUp) nextHy--;
    
        while (nextHx >= 0 && nextHx <= WINDOW_WIDTH && nextHy >= 0 && nextHy <= WINDOW_HEIGHT) {
            if(map.matrix[floor(nextHx/SIZE)][floor(nextHy/SIZE)].value > 0) {
                foundH = true;
                this.wall_type = map.matrix[floor(nextHx/SIZE)][floor(nextHy/SIZE)].value;
                hwallhitX = nextHx;
                hwallhitY = nextHy
                break;
            }else {
                nextHx += xstep;
                nextHy += ystep;
            }
        }


        ///Vertical ##############################################################

        let foundV = false;
        let vwallhitX = 0;
        let vwallhitY = 0;
        
        xintercept = (floor(player.x / SIZE) * SIZE);
        xintercept += (this.isFacingRight) ? SIZE : 0;

        yintercept = player.y + (xintercept-player.x) * Math.tan(ray_angle);

        xstep = SIZE;
        xstep *= this.isFacingLeft ? -1 : 1;

        ystep = SIZE * Math.tan(this.RAY_ANGLE);
        ystep *= (this.isFacingUp && ystep > 0) ? -1 : 1;
        ystep *= (this.isFacingDown && ystep < 0) ? -1 : 1;

        let nextVx = xintercept;
        let nextVy = yintercept;

        if (this.isFacingLeft) nextVx--;
    
        while (nextVx >= 0 && nextVx <= WINDOW_WIDTH && nextVy >= 0 && nextVy <= WINDOW_HEIGHT) {
            if(map.matrix[floor(nextVx/SIZE)][floor(nextVy/SIZE)].value > 0) {
                foundV = true;
                this.wall_type = map.matrix[floor(nextVx/SIZE)][floor(nextVy/SIZE)].value;
                vwallhitX = nextVx;
                vwallhitY = nextVy
                break;
            }else {
                nextVx += xstep;
                nextVy += ystep;
            }
        }


        
        let hDistance = (foundH) ? dist(player.x, player.y, nextHx,nextHy) : Infinity;
        let vDistance = (foundV) ? dist(player.x, player.y, nextVx,nextVy) : Infinity;

        // this.ray_distance = (hDistance < vDistance) ? hDistance : vDistance;

        if (hDistance < vDistance) {
            this.ray_distance = hDistance;
            this.t_x = nextHx;
            this.t_y = nextHy;
            this.isHoriz = true;

            this.t_p = abs(floor(this.t_x / SIZE) * SIZE  - this.t_x  );
        }else {
            this.ray_distance = vDistance;
            this.t_x = nextVx;
            this.t_y = nextVy;
            this.isVer= true;

            this.t_p = abs(floor(this.t_y / SIZE) * SIZE  - this.t_y);
            
        }


    }
    render () {

        let x = Math.cos(this.RAY_ANGLE) * this.ray_distance;
        let y = Math.sin(this.RAY_ANGLE) * this.ray_distance;

        stroke(this.color);
        strokeWeight(1);
        line(player.x, player.y, player.x + x, player.y + y);
    }
}

function normalizeAngle(the_angle) {
    the_angle = the_angle % (2 * Math.PI)
    if (the_angle < 0) {
        the_angle = (2 * Math.PI ) * the_angle   
    }
    return the_angle;
}

