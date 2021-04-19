//GLOBAL VARS
let COLS = 15;
let ROWS = 15;
const SIZE = 32;
let WINDOW_WIDTH = COLS * SIZE;
let WINDOW_HEIGHT = ROWS * SIZE;
const FOV = 60 * (Math.PI / 180);
const MINIMAP_SCALE = 0.2;
const WALL_STRIP_WIDTH = 1;
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;

let wall_sheet, wall_texture;
//MAINS
let map = new Map();
let player = new Player();
let rays = [];

let current = map.matrix[1][1];

function preload() {
  wallsheet = loadImage("walls.png");
}

function setup() {
  if (WINDOW_WIDTH >= window.innerWidth) {
    COLS = Math.floor(window.innerWidth / SIZE) - 1;
    ROWS = COLS;
    WINDOW_WIDTH = COLS * SIZE;
    WINDOW_HEIGHT = ROWS * SIZE;
  }

  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  //creating rays for player;
  makeRays();
  walltexture = wallsheet.get(0, 0, 32, 32);

  player.x = 1 * SIZE + SIZE / 2;
  player.y = 1 * SIZE + SIZE / 2;

  loadWallsPics();

  if (mobileCheck()) {
    document.querySelector(".mobile-controls").style.display = "block";
    
  }else {
    document.querySelector(".info-comp").style.display = "block";
  }
}

function update() {
  player.update();
}

function draw() {
  background("#84a9ac");

  update();

  renderto3D();

  push();
  scale(MINIMAP_SCALE);
  map.render();
  rays_render();
  player.render();
  rays_update();
  pop();
  // logic();
}

function rays_render() {
  for (let i = 0; i < rays.length; i++) {
    rays[i].render();
  }
}

function rays_update() {
  for (let i = 0; i < rays.length; i++) {
    rays[i].update();
  }
}

function makeRays() {
  let ray_angle = FOV / 2;
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
    let distanceProjectionPlane = WINDOW_WIDTH / 2 / Math.tan(FOV / 2);

    let wallStripHeight = (SIZE / rayDistance) * distanceProjectionPlane;
    let wall_alpha = 20000 / rayDistance;

    //sky
    fill("#888888");
    noStroke();
    rect(
      i * WALL_STRIP_WIDTH,
      0,
      WALL_STRIP_WIDTH,
      WINDOW_HEIGHT -
        (WINDOW_HEIGHT / 2 - wallStripHeight / 2 + wallStripHeight)
    );

    //grass
    fill("#3f3f44");
    noStroke();
    rect(
      i * WALL_STRIP_WIDTH,
      WINDOW_HEIGHT - (WINDOW_HEIGHT / 2 - wallStripHeight / 2),
      WALL_STRIP_WIDTH,
      WINDOW_HEIGHT -
        (WINDOW_HEIGHT / 2 - wallStripHeight / 2 + wallStripHeight)
    );

    //wall

    let wall_x = i * WALL_STRIP_WIDTH;
    let wall_y = WINDOW_HEIGHT / 2 - wallStripHeight / 2;
    let wall_w = WALL_STRIP_WIDTH;
    let wall_h = wallStripHeight;

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

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
