//http://adventofcode.com/2017/day/21

//have yet to solve



const fs = require('fs')

let input = fs.readFileSync('day21.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(' => ').map(item => item.split('/').map(item => item.split(''))))

function rotate(array){
    let result = []
    if(array.length % 2 == 0){
        for(let i = 0; i < 2; i++){
            result.push([])
        }

        result[0][0] = array[1][0]
        result[0][1] = array[0][0]
        result[1][1] = array[0][1]
        result[1][0] = array[1][1]

    }
    else{
        for(let i = 0; i < 3; i++){
            result.push([])
        }

            //diagonal
        result[0][0] = array[2][0]
        result[0][2] = array[0][0]
        result[2][2] = array[0][2]
        result[2][0] = array[2][2]

        result[1][1] = array[1][1]
            //cardinal
        result[1][2] = array[0][1]
        result[2][1] = array[1][2]
        result[1][0] = array[2][1]
        result[0][1] = array[1][0]
    }

    return result
}

function flipHoriz(array){
    let result = []

    array.forEach(row => result.push(row.reverse()))
    return result
}

function flipVert(array){
    let result = []

    array.forEach((row, index) => {
        result[Math.abs(index - (array.length - 1))] = row.reverse()
    })

    return result
}

function createRuleBook(input){
    let rulebook = {}
    input.forEach(rule => {
        let pattern = rule[0],
            output = rule[1];
        
            for(let i = 0; i < 4; i++){
                let key = JSON.stringify(pattern)
                if(!rulebook[key]){
                    rulebook[key] = output
                }

                key = JSON.stringify(flipHoriz(pattern))
                if(!rulebook[key]){
                    rulebook[key] = output
                }

                key = JSON.stringify(flipVert(pattern))
                if(rulebook[key]){
                    rulebook[key] = output
                }
                pattern = rotate(pattern)
            }
    })

    return rulebook
}

function splitSquare(picture, num){
    let pictureCopy = [...picture]
    let result = []
    while(pictureCopy.length){
        let section = [];
        for(let i = 0; i < num; i++){
            let row = pictureCopy[i].splice(0, num)
            section.push(row)
        }

        result.push(section)
        section = []
        pictureCopy = pictureCopy.filter(item => item.length !== 0)
    }

    return result
}

function combineSquare(left = [], right = []){
    let result = []
    for(let i = 0; i < right.length; i++){
        if(left.length == 0){
            result[i] = [...right[i]]
        }else{
            result[i] = [...left[i], ...right[i]]            
        }
    }
    return result
}

function expand(start, rulebook){
    let brokenPicture;
        sectionCount = 0;

    if(start.length % 2 == 0){
        brokenPicture = splitSquare(start, 2)
        sectionCount = start.length / 2
    }else{
        brokenPicture = splitSquare(start, 3)
        sectionCount = start.length / 3
    }

    let expandedPicture = []
    brokenPicture.forEach((picture, index) => {
        let output = rulebook[JSON.stringify(picture)];
        expandedPicture[index] = output
    })
    
    let combinedExpanded = []
    let section = 0

    while(section < sectionCount){
        for(let i = 0; i < sectionCount; i++){
            combinedExpanded[section] = combineSquare(combinedExpanded[section], expandedPicture[i + section])
        }
        section++
    }

    let result = []

    combinedExpanded.forEach(section => {
        section.forEach(row => result.push(row))
    })

    console.log(result.length)
    return result
}

function fractal(start, count, rulebook){
    let picture = start;
    for(let i = 0; i < count; i++){
        picture = expand(picture, rulebook)
    }

    return picture
}
let start = '.#./..#/###'.split('/').map(item => item.split(''))

//[[row1], [row2], [row3]...]
let count = 0;
let rulebook = createRuleBook(input)

fractal(start, 5, rulebook).forEach(row => {
    row.forEach(pixel => {
        if(pixel === '#'){
            count++
        }
    })
})

console.log(count) //answer should be 2536879