const fs = require('fs')

function turingMachine(steps){
    let cursorIndex = 0,
        tape = [],
        state = 'A',
        count = steps;

    while(count > 0){
        currentValue = tape[cursorIndex];
        
        switch(state){
            case 'A':
                tape[cursorIndex] = 1
 
                if(!currentValue){
                    cursorIndex++
                    state = 'B'
                }else{
                    cursorIndex--
                    state = 'E'
                }
                break;
            case 'B':
                tape[cursorIndex] = 1;
                
                if(!currentValue){
                    cursorIndex++
                    state = 'C'
                }else{
                    cursorIndex++
                    state = 'F'
                }
                break;
            case 'C':
                if(!currentValue){
                    tape[cursorIndex] = 1
                    cursorIndex--
                    state = 'D'
                }
                else{
                    tape[cursorIndex] = 0
                    cursorIndex++
                    state = 'B'
                }
                break;
            case 'D':
                if(!currentValue){
                    tape[cursorIndex] = 1
                    cursorIndex++
                    state = 'E'
                }
                else{
                    tape[cursorIndex] = 0
                    cursorIndex--
                    state = 'C'
                }            
                break;
            case 'E':
                if(!currentValue){
                    tape[cursorIndex] = 1
                    cursorIndex--
                    state = 'A'
                }
                else{
                    tape[cursorIndex] = 0
                    cursorIndex++
                    state = 'D'
                }
                break;
            case 'F':
                tape[cursorIndex] = 1
                cursorIndex++

                if(!currentValue){
                    state = 'A'
                }
                else{
                    state = 'C'
                }
                break;
        }

        count--
    }

    for(let key in tape){
        if(key < 0){
            tape.unshift(tape[key])
            delete tape[key]
        }
    }

    return tape
}

const checksum = (a) => a.reduce((a, b) => a + b)

console.log('Part 1: ', checksum(turingMachine(12459852)))
