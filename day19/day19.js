const fs = require('fs')

let input = fs.readFileSync('day19.txt').toString().split('\n').map(item => item.replace('\r', '').split(''))

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