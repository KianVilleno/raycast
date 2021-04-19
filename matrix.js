

class Map {
    constructor () {
        this.matrix = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1],
            [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        this.createObjects();
    }

    isWall () {
        let playerX = floor(player.x / SIZE);
        let playerY = floor(player.y / SIZE);
        let wall = (this.matrix[playerX][playerY].value == 1);
        return wall;
    }

    createObjects () {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                //let cell = this.matrix[i][j];
                let rnd = Math.floor(Math.random() * 3) + 1;
                let cell = (Math.random(1) < 0.3) ? rnd : 0;
                if (i == 0 || j == 0 || i == ROWS - 1 || j == COLS - 1) cell = 1;
                if (i == 1 && j == 1) cell = 0;
                this.matrix[i][j] = new Cell (i,j,SIZE,cell);
            }    
        }
    }

    render () {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                this.matrix[i][j].draw();
            }    
        }
    }


}

class Cell {

    constructor (i,j,size,value) {

        this.i = i;
        this.j = j;
        this.size = size;
        this.x = this.i * this.size;
        this.y = this.j * this.size;
        this.value = value;
        this.color = null;

    }

    draw () {
        
        switch (this.value) {
            case 0: 
            this.color = '#e4e3e3'
            break;
            case 1: 
            this.color = '#393e46'
            break;
            case 2: 
            this.color = '#393e46'
            break;
            case 3: 
            this.color = '#393e46'
            break;
            
        }
        stroke('#393e46');
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    checkForNeighbors () {

		this.neighbors = []

        let grid = map.matrix;

        let left,right,top,bottom;

        if (this.i - 1 > 0) { 
            let cell = grid[this.i - 1][this.j];
         
            left = cell;
            cell.dir = "left"
           
        };
		if (this.i + 1 < ROWS - 1) {
            let cell = grid[this.i + 1][this.j];
          
            right = cell;
            cell.dir = "right"
          
        }
		if (this.j -1 > 0)  {
            let cell = grid[this.i][this.j -1 ]
          
            top = cell;
            cell.dir = "top"
          

        }
  
		if (this.j + 1 < COLS -1)  {
            let cell = grid[this.i][this.j + 1];
           
            bottom = cell
            cell.dir = "left"
         
        }

		if (left != undefined && !left.visited ) this.neighbors.push(left);
		if (right != undefined && !right.visited ) this.neighbors.push(right);
		if (top != undefined  && !top.visited ) this.neighbors.push(top);
		if (bottom != undefined && !bottom.visited) this.neighbors.push(bottom);
        return this.neighbors;
	}

}


stack = [];

function logic () {
	
	current.visited = true;
    current.checkForNeighbors();
    
    current.value = 0;

	if (current.neighbors.length > 0) {
	
	let randomUnvistedNeighbor = int(random(current.neighbors.length));
    let next = current.neighbors[randomUnvistedNeighbor];
    
    next.value = 0;

	stack.push(current);
	next.visited = true;
	current = next;	

	}else if (stack.length > 0) {

		let revisitedCell = stack.pop();
		current = revisitedCell;

	}


}