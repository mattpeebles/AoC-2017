const fs = require('fs')
let input = fs.readFileSync('day23.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(' '))

function createRegister(str){
    let register = {}

    for(let char in str){
        register[str[char]] = 0
    }
    
    return register
}


    //pt 1
function debugRegisterForMul(instruc){
    let register = createRegister('abcdefgh'),
        mulCount = 0;
    
    for(let i = 0; i < instruc.length; i++){
        let step = instruc[i]
            action = step[0],
            target = step[1],
            amount = (isNaN(parseInt(step[2]))) ? register[step[2]] : parseInt(step[2]);
        switch(action){
            case 'set':
                register[target] = amount
                break;
            case 'sub':
                register[target] -= amount
                break;
            case 'mul':
                register[target] *= amount
                mulCount++
                break;
            case 'jnz':
                if(register[target] !== 0){
                    i--
                    i += amount 
                }
                break;
        }
    }

    return mulCount
}

console.log(debugRegisterForMul(input))

/*
https://www.reddit.com/r/adventofcode/comments/7lms6p/2017_day_23_solutions/drnl3gg/
https://www.reddit.com/r/adventofcode/comments/7lms6p/2017_day_23_solutions/drnjwq7/

ridiculous infinite loop. Need to learn more about assembly code to solve it
*/



function modifyRegister(instruc){
    let register = createRegister('abcdefgh')
    register['a'] = 1;
    
    for(let i = 0; i < instruc.length; i++){
        let step = instruc[i]
            action = step[0],
            target = step[1],
            amount = (isNaN(parseInt(step[2]))) ? register[step[2]] : parseInt(step[2]),
            inLoop = false;

            console.log(i, step, action, target, amount, register[target])
        switch(action){
            case 'set':
                register[target] = amount
                break;
            case 'sub':
                register[target] -= amount
                break;
            case 'mul':
                register[target] *= amount
                break;
            case 'jnz':
                if(register[target] !== 0){
                    console.log(register[target])
                    i--
                    i += amount 
                }
                break;
        }
    }
    return register
}