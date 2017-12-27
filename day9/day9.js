let fs = require('fs');

let input = fs.readFileSync('day9.txt').toString()

    //pt 1
function removeGarbage(input){
    let copyString = input.split(''),
        garbageStart = null,
        cancelled = false; //turn cancel on if ! is seen, skip next character and immediately turn this off
    for(let i = 0; i < copyString.length; i++){
        if(cancelled){
            cancelled = false
        }else{
            let currentChar = copyString[i]

            if(currentChar === '<' && garbageStart === null){                
                garbageStart = i //location of '<'
            }

            if(currentChar === '>'){
                let startIndex = garbageStart
                copyString.splice(startIndex, i - (startIndex - 1))

                i = startIndex - 1
                garbageStart = null
            }

            if(currentChar === '!'){
                cancelled = true
            }

        }
    }

    return copyString.join('')
}

function countLevels(input){
    let inputArr = input.split(''),
        count = 0,
        levelTotal = 0;

    for(let i = 0; i < inputArr.length; i++){
        let char = inputArr[i]
        if(char == '{'){
            count++
        }

        if(char == '}'){
            levelTotal += count
            count--
        }
    }

    return levelTotal
}

console.log('Part 1: ', countLevels(removeGarbage(input)))


    // pt 2
function numOfNonCancelledCharsInGarbage(input){
    let copyString = input.split(''),
        garbageStart = false,
        amountRemoved = 0;

    for(let i = 0; i < copyString.length; i++){
        let currentChar = copyString[i]

        if(currentChar === '!'){
            i++
        }else{
            if(garbageStart){
                if(currentChar === '!'){
                    i++
                }
                else if(currentChar === '>'){
                    garbageStart = false
                }
                else{
                    amountRemoved++
                } 
            }else{
                if(currentChar == '<'){
                    garbageStart = true
                }
            }
        }
    }

    return amountRemoved
}

console.log('Part 2: ', numOfNonCancelledCharsInGarbage(input))