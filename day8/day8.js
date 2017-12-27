let fs = require('fs')

let input = fs.readFileSync('day8.txt').toString('').split('\r').map(item => item.replace('\n', '').split(' '))

input.pop()

/* input map
---Consequent
0 - register to be changed
1 - increment or decrement
2 - number to increrment or decrement by

--Antecedent
3 - if
4 - register 'string'
5 - operation '==, <=, etc'
6 - requirement 'number'
*/

//largest value

function createRegister(input){
    let register = {}
    let count = 0;
    input.forEach(item => {
        count++

        if(!register[item[0]]){
            register[item[0]] = 0
        }
    })

    return register
}

    //pt 1
function findLargestAfterInstruction(input){
    let largest = 0,
        register = createRegister(input);
    
    input.forEach(conditional => {
        let bool = null;

        switch(conditional[5]){
            case '==':
                bool = (register[conditional[4]] == parseInt(conditional[6])) ? true : false
                break;
            case '!=':
                bool = (register[conditional[4]] != parseInt(conditional[6])) ? true : false
                break;
            case '<':
                bool = (register[conditional[4]] < parseInt(conditional[6])) ? true : false
                break;
            case '>':
                bool = (register[conditional[4]] > parseInt(conditional[6])) ? true : false
                break;
            case '<=':
                bool = (register[conditional[4]] <= parseInt(conditional[6])) ? true : false
                break;
            case '>=':
                bool = (register[conditional[4]] >= parseInt(conditional[6])) ? true : false
                break;
        }


        if(bool){
            switch(conditional[1]){
                case 'inc':
                    register[conditional[0]] += parseInt(conditional[2])
                    break;
                case 'dec':
                    register[conditional[0]] -= parseInt(conditional[2])
                    break;    
            }
        }        
    })

    for(let key in register){
        largest = Math.max(register[key], largest)
    }

    return largest
    
}

console.log('Part 1: ', findLargestAfterInstruction(input)) //3880


    //pt 2
function findLargestDuringInstruction(input){
    let largest = 0,
        register = createRegister(input);
    
    input.forEach(conditional => {
        let bool = null;

        switch(conditional[5]){
            case '==':
                bool = (register[conditional[4]] == parseInt(conditional[6])) ? true : false
                break;
            case '!=':
                bool = (register[conditional[4]] != parseInt(conditional[6])) ? true : false
                break;
            case '<':
                bool = (register[conditional[4]] < parseInt(conditional[6])) ? true : false
                break;
            case '>':
                bool = (register[conditional[4]] > parseInt(conditional[6])) ? true : false
                break;
            case '<=':
                bool = (register[conditional[4]] <= parseInt(conditional[6])) ? true : false
                break;
            case '>=':
                bool = (register[conditional[4]] >= parseInt(conditional[6])) ? true : false
                break;
        }


        if(bool){
            switch(conditional[1]){
                case 'inc':
                    register[conditional[0]] += parseInt(conditional[2])
                    break;
                case 'dec':
                    register[conditional[0]] -= parseInt(conditional[2])
                    break;    
            }
        }        

        largest = Math.max(register[conditional[0]], largest)
        
    })

    return largest
    
}

console.log('Part 2: ', findLargestDuringInstruction(input)) //5035