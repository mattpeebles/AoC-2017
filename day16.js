//https://adventofcode.com/2017/day/16

const fs = require('fs')
let instructions = fs.readFileSync('day16.txt').toString().trim().split(',').map(move => {
    let moveInfo = move.split('/')
    let moveName = moveInfo[0][0]
    moveInfo = moveInfo.map(item => item.split(''))
    moveInfo[0].splice(0,1)
    moveInfo = moveInfo.map(item => item.join(''))

    return [moveName, moveInfo]
}) //[dancemove, [index1, index2]]

let string = 'abcdefghijklmnop'

//pt 1
function dance(string, moves){
    let order = string.split('')
    for(let i = 0; i < moves.length; i++) {
        let move = moves[i]
            moveName = move[0]
            moveInfo = move[1]
        switch(moveName){
            case 's':
                let subOrder = order.slice(-parseInt(moveInfo[0]))
                order.splice(-parseInt(moveInfo[0]))
                order = [...subOrder, ...order]
              break;
            case 'p':
                let a = order.indexOf(moveInfo[0]),
                    b = order.indexOf(moveInfo[1])
                
                    order[a] = moveInfo[1]
                    order[b] = moveInfo[0]
                break;
            case 'x':
                let temp = order[parseInt(moveInfo[0])]
                order[parseInt(moveInfo[0])] = order[parseInt(moveInfo[1])]
                order[parseInt(moveInfo[1])] = temp 
                break;
        }

        if(order.indexOf(undefined) > - 1){
            return move
        }
    }

    return order.join('')
}

console.log('Part 1: ', dance(string, instructions))


//pt 2
function repeatDance(string, cycles){
    let letters = string,
        memo = {}
    for(let i = 0; i < cycles; i++){
        if(memo[letters]){
            return Object.keys(memo)[cycles % i]
                /*https://www.reddit.com/r/adventofcode/comments/7k572l/2017_day_16_solutions/drboovu/
                    originally had: letters = memo[letters]
                    so it would still cycle 1 billion times, 
                    this technique shorts it immediately. Sourced from python
                */
            }else{
                let temp = letters
                letters = dance(letters, instructions)
                memo[temp] = letters
        }
    }

    return letters
}
console.log('Part 2: ', repeatDance(string, 1000000000))
