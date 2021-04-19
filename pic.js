// let wall_1,wall_2,wall_3,wall_4,wall_5,wall_6,wall_7,wall_8,wall_9,wall_10,
//     wall_11,wall_12,wall_13,wall_14,wall_15,wall_16,wall_17,wall_18,wall_19,wall_20,
//     wall_21,wall_22,wall_23,wall_24,wall_25,wall_26,wall_27,wall_28,wall_29,wall_30,
//     wall_31, wall_32;   


// function loadWallsPics () {
// wall_1 = wallsheet.get(1,0,1,32);
// wall_2 = wallsheet.get(2,0,1,32);
// wall_4 = wallsheet.get(3,0,1,32);
// wall_3 = wallsheet.get(4,0,1,32);
// wall_5 = wallsheet.get(5,0,1,32);
// wall_6 = wallsheet.get(6,0,1,32);
// wall_7 = wallsheet.get(7,0,1,32);
// wall_8 = wallsheet.get(8,0,1,32);
// wall_9 = wallsheet.get(9,0,1,32);
// wall_10 = wallsheet.get(10,0,1,32);

// wall_11 = wallsheet.get(11,0,1,32);
// wall_12 = wallsheet.get(12,0,1,32);
// wall_14 = wallsheet.get(13,0,1,32);
// wall_13 = wallsheet.get(14,0,1,32);
// wall_15 = wallsheet.get(15,0,1,32);
// wall_16 = wallsheet.get(16,0,1,32);
// wall_17 = wallsheet.get(17,0,1,32);
// wall_18 = wallsheet.get(18,0,1,32);
// wall_19 = wallsheet.get(19,0,1,32);
// wall_20 = wallsheet.get(20,0,1,32);

// wall_21 = wallsheet.get(21,0,1,32);
// wall_22 = wallsheet.get(22,0,1,32);
// wall_24 = wallsheet.get(23,0,1,32);
// wall_23 = wallsheet.get(24,0,1,32);
// wall_25 = wallsheet.get(25,0,1,32);
// wall_26 = wallsheet.get(26,0,1,32);
// wall_27 = wallsheet.get(27,0,1,32);
// wall_28 = wallsheet.get(28,0,1,32);
// wall_29 = wallsheet.get(29,0,1,32);
// wall_30 = wallsheet.get(30,0,1,32);

// wall_31 = wallsheet.get(31,0,1,32);
// wall_32 = wallsheet.get(32,0,1,32);
// }

let wallpics_1 = [];
let wallpics_2 = [];
let wallpics_3 = [];

function loadWallsPics() {
    for (let i =1; i <= 32; i++) {
        wallpics_1.push(wallsheet.get(i,0,1,32))
        wallpics_2.push(wallsheet.get(i+32,0,1,32))
        wallpics_3.push(wallsheet.get(i+64,0,1,32))
    }
}