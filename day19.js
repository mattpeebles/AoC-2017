//https://adventofcode.com/2017/day/19

const fs = require('fs')

let input = fs.readFileSync('day19.txt').toString().split('\n').map(item => item.replace('\r', '').split(''))


/*
             --- Part 1 ---
    --- Day 19: A Series of Tubes ---

    Somehow, a network packet got lost and ended up here. It's trying to follow a routing diagram (your puzzle input), but it's confused about where to go.

    Its starting point is just off the top of the diagram. Lines (drawn with |, -, and +) show the path it needs to take, starting by going down onto the only line connected to the top of the diagram. It needs to follow this path until it reaches the end (located somewhere within the diagram) and stop there.

    Sometimes, the lines cross over each other; in these cases, it needs to continue going the same direction, and only turn left or right when there's no other option. In addition, someone has left letters on the line; these also don't change its direction, but it can use them to keep track of where it's been. For example:

        |          
        |  +--+    
        A  |  C    
    F---|----E|--+ 
        |  |  |  D 
        +B-+  +--+ 

    Given this diagram, the packet needs to take the following path:

        Starting at the only line touching the top of the diagram, it must go down, pass through A, and continue onward to the first +.
        Travel right, up, and right, passing through B in the process.
        Continue down (collecting C), right, and up (collecting D).
        Finally, go all the way left through E and stopping at F.

    Following the path to the end, the letters it sees on its path are ABCDEF.

    The little packet looks up at you, hoping you can help it find the way. What letters will it see (in the order it would see them) if it follows the path? (The routing diagram is very wide; make sure you view it without line wrapping.)

    Your puzzle answer was HATBMQJYZ.
*/


function traceDiagram(input){
    let seen = '',
        direction = 'down';

        let queue = [];

    for(let i = 0; i < input.length; i++){
        let row = input[i]

        for(let j = 0; j < row.length; j++){
            let item = row[j]
            
            if(item == '|'){
                queue.push([i, j])

                while(queue.length > 0){
                    let indices = queue.shift(),
                        y = indices[0],
                        x = indices[1];
                                            

                    if(input[y] == undefined || input[y][x] == ' '){
                        return seen
                    }

                    if(input[y][x] == '+'){
                        if(direction == 'left' || direction == 'right'){
                            if(input[y-1][x] == '|' || input[y-1][x] !== ' '){
                                queue.push([y-1, x])
                                direction = 'up'
                            } else{
                                queue.push([y+1, x])
                                direction = 'down'
                            }
                        }

                        else if(direction == 'up' || direction == 'down'){
                            if(input[y][x+1] == '-' || input[y][x+1] !== ' '){
                                queue.push([y, x+1])
                                direction = 'right'
                            } else{
                                queue.push([y, x-1])
                                direction = 'left'
                            }
                        }
                    }

                    else if(input[y][x] == '|'){
                        if(direction == 'down'){
                            if(input[y+1][x] == '-'){
                                queue.push([y+2, x])
                            }
                            else{
                                queue.push([y+1, x])
                            }
                        }
                        else if(direction == 'up'){
                            if(input[y-1][x] == '-'){
                                queue.push([y-2, x])
                            }
                            else if(input[y-1][x] == undefined){
                                return seen
                            }else{
                                queue.push([y-1, x])
                            }
                        }
                        else if(direction == 'left' || direction == 'right'){
                            if(direction == 'left'){
                                queue.push([y, x-2])
                            }
                            if(direction == 'right'){
                                queue.push([y, x+2])
                            }
                        }
                    }

                    else if(input[y][x] == '-'){
                        if(direction == 'right'){
                            if(input[y][x+1] == '|'){
                                queue.push([y, x+2])
                            }
                            else if(input[y][x+1] == undefined){
                                return seen
                            }else{
                                queue.push([y, x+1])
                            }
                        }
                        else if(direction == 'left'){
                            if(input[y][x-1] == '|'){
                                queue.push([y, x-2])
                            }
                            else if(input[y][x-1] == undefined){
                                return seen
                            }else{
                                queue.push([y, x-1])
                            }
                        }
                        else if(direction == 'up' || direction == 'down'){
                            if(direction == 'up'){
                                queue.push([y-2, x])
                            }
                            if(direction == 'down'){
                                queue.push([y+2, x])
                            }
                        }
                    }

                    else if(input[y][x] !== ' '){
                        seen += input[y][x]

                        if(direction == 'up'){
                            queue.push([y-1, x])
                        }

                        if(direction == 'down'){
                            queue.push([y+1, x])
                        }

                        if(direction == 'left'){
                            queue.push([y, x-1])
                        }

                        if(direction == 'right'){
                            queue.push([y, x+1])
                        }
                    }
                }

                return seen
            }
        }
    }
    return seen
}

console.log('Part 1: ', traceDiagram(input))


/*
        --- Part Two ---

    The packet is curious how many steps it needs to go.

    For example, using the same routing diagram from the example above...

        |          
        |  +--+    
        A  |  C    
    F---|--|-E---+ 
        |  |  |  D 
        +B-+  +--+ 

    ...the packet would go:

        6 steps down (including the first line at the top of the diagram).
        3 steps right.
        4 steps up.
        3 steps right.
        4 steps down.
        3 steps right.
        2 steps up.
        13 steps left (including the F it stops on).

    This would result in a total of 38 steps.

    How many steps does the packet need to go?

    Your puzzle answer was 16332.
*/

function countSteps(input){
    let count = 0,
        direction = 'down';

        let queue = [];

    for(let i = 0; i < input.length; i++){
        let row = input[i]

        for(let j = 0; j < row.length; j++){
            let item = row[j]
            
            if(item == '|'){
                queue.push([i, j])

                while(queue.length > 0){
                    let indices = queue.shift(),
                        y = indices[0],
                        x = indices[1];
                    
                    
                    //console.log(indices, direction)    
                        

                    if(input[y] == undefined || input[y][x] == ' '){
                        return count
                    }

                    count++

                    if(input[y][x] == '+'){
                        if(direction == 'left' || direction == 'right'){
                            if(input[y-1][x] == '|' || input[y-1][x] !== ' '){
                                queue.push([y-1, x])
                                direction = 'up'
                            } else{
                                queue.push([y+1, x])
                                direction = 'down'
                            }
                        }

                        else if(direction == 'up' || direction == 'down'){
                            if(input[y][x+1] == '-' || input[y][x+1] !== ' '){
                                queue.push([y, x+1])
                                direction = 'right'
                            } else{
                                queue.push([y, x-1])
                                direction = 'left'
                            }
                        }
                    }

                    else if(input[y][x] == '|'){
                        if(direction == 'down'){
                            if(input[y+1][x] == '-'){
                                count++
                                queue.push([y+2, x])
                            }
                            else{
                                queue.push([y+1, x])
                            }
                        }
                        else if(direction == 'up'){
                            if(input[y-1][x] == '-'){
                                count++
                                queue.push([y-2, x])
                            }
                            else if(input[y-1][x] == undefined){
                                return count
                            }else{
                                queue.push([y-1, x])
                            }
                        }
                        else if(direction == 'left' || direction == 'right'){
                            if(direction == 'left'){
                                count++
                                queue.push([y, x-2])
                            }
                            if(direction == 'right'){
                                count++
                                queue.push([y, x+2])
                            }
                        }
                    }

                    else if(input[y][x] == '-'){
                        if(direction == 'right'){
                            if(input[y][x+1] == '|'){
                                count++
                                queue.push([y, x+2])
                            }
                            else if(input[y][x+1] == undefined){
                                return count
                            }else{
                                queue.push([y, x+1])
                            }
                        }
                        else if(direction == 'left'){
                            if(input[y][x-1] == '|'){
                                count++
                                queue.push([y, x-2])
                            }
                            else if(input[y][x-1] == undefined){
                                return count
                            }else{
                                queue.push([y, x-1])
                            }
                        }
                        else if(direction == 'up' || direction == 'down'){
                            if(direction == 'up'){
                                count++
                                queue.push([y-2, x])
                            }
                            if(direction == 'down'){
                                count++
                                queue.push([y+2, x])
                            }
                        }
                    }

                    else if(input[y][x] !== ' '){
                        if(direction == 'up'){
                            queue.push([y-1, x])
                        }

                        if(direction == 'down'){
                            queue.push([y+1, x])
                        }

                        if(direction == 'left'){
                            queue.push([y, x-1])
                        }

                        if(direction == 'right'){
                            queue.push([y, x+1])
                        }
                    }
                }

                return count
            }
        }
    }
    return count
}

console.log('Part 2: ', countSteps(input))