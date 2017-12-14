//http://adventofcode.com/2017/day/14

let hash = require('./day10')

//hex-to-binary 
    let lookup = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
  };


    function hexToBinary(s) {
        var ret = '';
        for (var i = 0, len = s.length; i < len; i++) {
            ret += lookup[s[i]];
        }
        return ret;
    }
//

let list = []

for(let i = 0; i < 256; i++){
    list.push(i)
}

function calculateSquaresUsed(string){
    let used = 0;

    for(let i = 0; i < 128; i++){
        let hashString = `${string}-${i}`
        let {knot, dense, sparse, lengths} = hash
        let knotHash = knot(dense(sparse(list, lengths(hashString))))

        let row = hexToBinary(knotHash)

        for(let char in row){
            if(row[char] === '1'){
                used++
            }
        }
    }

    return used
}

console.log('Day 14 Part 1: ', calculateSquaresUsed('stpzcrnm')) //8250

function calculateRegions(string){
    let body = []
    for(let i = 0; i < 128; i++){
        let hashString = `${string}-${i}`
        let {knot, dense, sparse, lengths} = hash
        let knotHash = knot(dense(sparse(list, lengths(hashString))))

        let row = hexToBinary(knotHash)

        body.push(row.split(''))
    }

    let regions = 0;

    for(let i = 0; i < body.length; i++){
        for(let j = 0; j < body[i].length; j++){
            if(body[i][j] === '1'){
                queue = [[i, j]]

                while(queue.length > 0){
                    let indices = queue.shift(),
                        row = indices[0],
                        digit = indices[1];
                    
                    body[row][digit] = '_'

                    if(body[row][digit+1] == '1'){
                        queue.push([row, digit+1])
                        body[row][digit +1] = '_'
                    }

                    if(body[row][digit-1] == '1'){
                        queue.push([row, digit-1])
                           body[row][digit - 1] = '_'
                    }

                    if(body[row + 1] && body[row + 1][digit] == '1'){
                        queue.push([row+1, digit])
                        body[row+1][digit] = '_'
                    }

                    if(body[row - 1] && body[row - 1][digit] == '1'){
                        queue.push([row - 1, digit])
                        body[row - 1][digit] = '_'
                    }
                }

                regions++
            }
        }
    }
    return regions
}

console.log('Day 14 Part 2: ', calculateRegions('stpzcrnm')) //1113