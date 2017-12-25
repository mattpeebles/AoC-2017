//http://adventofcode.com/2017/day/23

const fs = require('fs')
let input = fs.readFileSync('day23.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(' '))


/*
        --- Day 23: Coprocessor Conflagration ---

    You decide to head directly to the CPU and fix the printer from there. As you get close, you find an experimental coprocessor doing so much work that the local programs are afraid it will halt and catch fire. This would cause serious issues for the rest of the computer, so you head in and see what you can do.

    The code it's running seems to be a variant of the kind you saw recently on that tablet. The general functionality seems very similar, but some of the instructions are different:

        set X Y sets register X to the value of Y.
        sub X Y decreases register X by the value of Y.
        mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
        jnz X Y jumps with an offset of the value of Y, but only if the value of X is not zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)

        Only the instructions listed above are used. The eight registers here, named a through h, all start at 0.

    The coprocessor is currently set to some kind of debug mode, which allows for testing, but prevents it from doing any meaningful work.

    If you run the program (your puzzle input), how many times is the mul instruction invoked?

    Your puzzle answer was 3025.
*/
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
        --- Part Two ---

    Now, it's time to fix the problem.

    The debug mode switch is wired directly to register a. You flip the switch, which makes register a now start at 1 when the program is executed.

    Immediately, the coprocessor begins to overheat. Whoever wrote this program obviously didn't choose a very efficient implementation. You'll need to optimize the program if it has any hope of completing before Santa needs that printer working.

    The coprocessor's ultimate goal is to determine the final value left in register h once the program completes. Technically, if it had that... it wouldn't even need to run the program.

    After setting register a to 1, if the program were to run to completion, what value would be left in register h?

    Your puzzle answer was 915.

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