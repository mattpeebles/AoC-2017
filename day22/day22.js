const fs = require('fs')

let input = fs.readFileSync('day22.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(''))

function createCleanCellRow(num){
    let row = []

    for(let i = 0; i < num; i++){
        row.push('.')
    }

    return row
}

function burst(direction, grid, currentCell){
    let infected = false;

    currentDirection = direction
      
        //up right down left
    directions = [[-1, 0], [0, 1],[1, 0],[0, -1]];

    let y = currentCell[0],
        x = currentCell[1];
    
        if(grid[y][x] === '#'){
            currentDirection++
            if(currentDirection == 4){
                currentDirection = 0
            }

            grid[y][x] = '.'
        }else{
            currentDirection--
            if(currentDirection < 0){
                currentDirection = 3
            }

            grid[y][x] = '#'
            infected = true
        }
        
        let adjust = directions[currentDirection]

        currentCell[0] = adjust[0] + currentCell[0]
        currentCell[1] = adjust[1] + currentCell[1]

        if(!grid[currentCell[0]]){
            let newRow = createCleanCellRow(grid[0].length)
            if(currentCell[0] < 0){
                grid.unshift(newRow)
                currentCell[0] = 0
            }else{
                grid.push(newRow)
            }
        }

        if(grid[currentCell[0]][currentCell[1]] == undefined){
            if(currentCell[1] < 0){
                grid.forEach(row => row.unshift('.'))
                currentCell[1] = 0
            }else{
                grid.forEach(row => row.push('.'))
            }
        }
          
        return [currentDirection, grid, currentCell, infected]
}

function virus(grid, bursts){
    let startCell = [Math.floor(grid.length / 2), Math.floor(grid[0].length/ 2)],
        direction = 0,
        numInfected = 0;

    for(let i = 0; i < bursts; i++){
        let resultOfBurst = burst(direction, grid, startCell)

        direction = resultOfBurst[0]
        grid = resultOfBurst[1]
        startCell = resultOfBurst[2]
        numInfected += (resultOfBurst[3]) ? 1 : 0
    }

    return numInfected
}

console.log('Part 1: ', virus(input, 10000))

function sophisticatedBurst(direction, grid, currentCell){
    let infected = false,
        currentDirection = direction,
      
        //up right down left
        directions = [[-1, 0], [0, 1],[1, 0],[0, -1]];

    let y = currentCell[0],
        x = currentCell[1];
            
        if(grid[y][x] === '#'){
            currentDirection++
            if(currentDirection == 4){
                currentDirection = 0
            }

            grid[y][x] = 'F'
        }
        else if(grid[y][x] === 'W'){
            grid[y][x] = '#'
            infected = true            
        }
        else if(grid[y][x] === 'F'){
            grid[y][x] = '.'

            currentDirection -= 2
            if(currentDirection < 0){
                switch(currentDirection){
                    case -2:
                        currentDirection = 2
                        break;
                    case -1: 
                        currentDirection = 3
                        break;
                }
            }
        }
        else{
            currentDirection--
            if(currentDirection < 0){
                currentDirection = 3
            }

            grid[y][x] = 'W'
        }
        
        let adjust = directions[currentDirection]
        currentCell[0] = adjust[0] + currentCell[0]
        currentCell[1] = adjust[1] + currentCell[1]

        if(!grid[currentCell[0]]){
            let newRow = createCleanCellRow(grid[0].length)
            if(currentCell[0] < 0){
                grid.unshift(newRow)
                currentCell[0] = 0
            }else{
                grid.push(newRow)
            }
        }

        if(grid[currentCell[0]][currentCell[1]] == undefined){
            if(currentCell[1] < 0){
                grid.forEach(row => row.unshift('.'))
                currentCell[1] = 0
            }else{
                grid.forEach(row => row.push('.'))
            }
        }
        
        return [currentDirection, grid, currentCell, infected]
}

function betterVirus(grid, bursts){
    let startCell = [Math.floor(grid.length / 2), Math.floor(grid[0].length/ 2)],
        direction = 0,
        numInfected = 0;


    for(let i = 0; i < bursts; i++){
        let resultOfBurst = sophisticatedBurst(direction, grid, startCell)

        direction = resultOfBurst[0]
        grid = resultOfBurst[1]
        startCell = resultOfBurst[2]
        numInfected += (resultOfBurst[3]) ? 1 : 0
    }

    return numInfected
}

input = fs.readFileSync('day22.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(''))

console.log('Part 2: ', betterVirus(input, 10000000))