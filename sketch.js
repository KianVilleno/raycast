//GLOBAL VARS
const COLS = 20;
const ROWS = 20;
const SIZE = 32;
const WINDOW_WIDTH = ROWS*SIZE;
const WINDOW_HEIGHT = ROWS*SIZE;
const FOV = 60 * ( Math.PI / 180 );
const MINIMAP_SCALE = 0.2;
const WALL_STRIP_WIDTH = 1;
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;

let wall_sheet, wall_texture;
//MAINS
let map = new Map();
let player = new Player();
let rays = [];


let current = map.matrix[1][1]

function preload() {
	wallsheet = loadImage("walls.png");
	
}

function setup() {
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

	//creating rays for player;
	makeRays();
	walltexture = wallsheet.get(0,0,32,32);

	player.x = 1*SIZE + SIZE/2;
	player.y = 1*SIZE + SIZE/2;

	loadWallsPics();


}

function update () {
	player.update();
	
}

function draw() {
	background("#84a9ac");

	update();

	renderto3D();

	push();
	scale(MINIMAP_SCALE)
	map.render();
	rays_render();
	player.render();
	rays_update();
	pop();
	// logic();
	
	
}

function rays_render () {

	for (let i = 0; i < rays.length; i++) {
		rays[i].render();
	}

}

function rays_update () {
	for (let i = 0; i < rays.length; i++) {
		rays[i].update();
	}
}

function makeRays() {
	let ray_angle = FOV / 2 
	for (let i = 0; i < NUM_RAYS; i++) {
		let ray = new Raycast(ray_angle);
		rays.push(ray);
		ray_angle -= FOV / NUM_RAYS;
	}
}

function renderto3D() {
	for (let i = 0; i < rays.length; i++) {
		let ray = rays[i];
		let rayDistance = ray.ray_distance * Math.cos(ray.RAY_ANGLE - player.ANGLE);
		let distanceProjectionPlane = (WINDOW_WIDTH / 2) / Math.tan(FOV / 2)

		let wallStripHeight = (SIZE / rayDistance)  * distanceProjectionPlane;
		let wall_alpha = 20000 /rayDistance;


		//sky
		fill("#888888")
		noStroke();
		rect(
			i * WALL_STRIP_WIDTH,
			0,
			WALL_STRIP_WIDTH,
			WINDOW_HEIGHT - ((WINDOW_HEIGHT / 2 ) - (wallStripHeight / 2) + wallStripHeight)
		);

		//grass
		fill("#3f3f44")
		noStroke();
		rect(
			i * WALL_STRIP_WIDTH,
			WINDOW_HEIGHT - ((WINDOW_HEIGHT / 2 ) - (wallStripHeight / 2)),
			WALL_STRIP_WIDTH,
			WINDOW_HEIGHT - ((WINDOW_HEIGHT / 2 ) - (wallStripHeight / 2) + wallStripHeight)
		);

		//wall

		let wall_x = i * WALL_STRIP_WIDTH;
		let wall_y = (WINDOW_HEIGHT / 2 ) - (wallStripHeight / 2);
		let wall_w = WALL_STRIP_WIDTH;
		let wall_h =wallStripHeight

		if (ray.t_p) {
		let index_pic = floor(ray.t_p);
		let willpic;
		switch (ray.wall_type) {
			case 1:
			willpic = wallpics_2[index_pic];
			break;
			case 2:
				willpic = wallpics_2[index_pic];
			break;
			case 3:
				willpic = wallpics_2[index_pic];
			break;
		}

		image(willpic, wall_x, wall_y, wall_w, wall_h);
		noSmooth();
		}
		
		// fill(56, 62, 86, wall_alpha) 
		// noStroke();
		// rect(wall_x,wall_y,wall_w,wall_h)

		




	}
}