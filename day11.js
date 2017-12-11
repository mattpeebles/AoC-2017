let fs = require('fs')
let input = fs.readFileSync('day11.txt').toString('utf-8').trim('').split(',');

/*REQUIRED SIGNIFICANT HELP
https://www.redblobgames.com/grids/hexagons/
https://www.reddit.com/r/adventofcode/comments/7izym2/2017_day_11_solutions/dr2p74e/
    distance formula
        function cube_distance(a, b):
            return max(abs(a.x - b.x), abs(a.y - b.y), abs(a.z - b.z))
    starting point is 0, so we just need to consider the end point
*/


//pt 1

function distanceCube(coords){
    return coords.map(Math.abs).reduce((a, b) => Math.max(a, b))
        //math.map does not require lambda on Math.abs as the (num) => Math.abs(num) is implied
}

function shortestRoute(input){
    let directions = {
        'n': [-1, 1, 0],
        'ne': [0, 1, -1],
        'se': [1, 0, -1],
        's': [1, -1, 0],
        'sw': [0, -1, 1],
        'nw': [-1, 0, 1]
    },
    coords = [0, 0, 0];
    
    for(let dir of input){
        coords = coords.map((coord, i) => coord + directions[dir][i])
    }

    return distanceCube(coords)
}


console.log('Part 1: ', shortestRoute(input))


//Pt 2
function greatestDistance(input){
    let directions = {
        'n': [-1, 1, 0],
        'ne': [0, 1, -1],
        'se': [1, 0, -1],
        's': [1, -1, 0],
        'sw': [0, -1, 1],
        'nw': [-1, 0, 1]
    },
    coords = [0, 0, 0],
    maxDistance = -Infinity;

    for(let dir of input){
        coords = coords.map((x, i) => x + directions[dir][i])
        maxDistance = Math.max(maxDistance, distanceCube(coords))
    }

    return maxDistance
}

console.log('Part 2: ', greatestDistance(input))