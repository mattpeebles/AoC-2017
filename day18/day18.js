const fs = require('fs')

let input = fs.readFileSync('day18.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(' '))

function buildRegister(input, program){
    let register = {}
    
    input.forEach(instruc => {
        if(instruc[0] !== 'jgz'){
            let value = instruc[1]
    
            if(!register[value]){
                register[value] = 0
            }
        }
    })

    if(program !== undefined){
        register['p'] = program
    }

    return register
}

function playLastRecovered(input){
    let register = buildRegister(input),
        lastSound = null,
        count =0;
    for(let i = 0; i < input.length; i++){
        let instruction = input[i],
            action = instruction[0],
            key = instruction[1],
            amount = (isNaN(parseInt(instruction[2]))) ? register[instruction[2]] : parseInt(instruction[2]);

        switch(action){
            case 'snd':
                lastSound = register[key]
                break;
            case 'set': 
                register[key] = amount
                break;
            case 'add':
                register[key] += amount
                break;
            case 'mul':
                register[key] *= amount
                break;
            case 'mod':
                register[key] = register[key] % amount
                break;
            case 'rcv':
                if(register[key] !== 0){
                    return lastSound
                }
                break;
            case 'jgz':
                if(register[key] > 0){
                    i--
                    i += amount
                }
                break;
        }
        count++
    }

    console.log(register, count)
}

console.log("Part 1: ", playLastRecovered(input))

let ProgramGen = function(name){
    return {
        name,
        partner: null,
        register: buildRegister(input, name),
        instructions: input,
        status: true,
        queue: [],
        currentInstruction: 0,
        amountSent: 0,
        
        receive: function(value){
            this.queue.push(value)
            
            if(!this.status){
                this.status = true;
                this.run()
            }
        },

        update: function(key){
            if(this.queue.length > 0){
                let value = this.queue.shift()
                this.register[key] = value;
            }else{
                this.status = false
            }
        },

        send: function(value){
           return this.partner.receive(value)
        },

        run: function(){
            for(let i = this.currentInstruction; i < this.instructions.length; i++, this.currentInstruction++){
                if(!this.status){
                    return;
                }
                
                let instruction = this.instructions[i],
                    action = instruction[0],
                    key = instruction[1],
                    amount = (isNaN(parseInt(instruction[2]))) ? this.register[instruction[2]] : parseInt(instruction[2]);
                    
                switch(action){
                    case 'snd':  
                        let value = (isNaN(parseInt(instruction[1]))) ? this.register[instruction[1]] : parseInt(instruction[1]);
                        this.amountSent++                        
                        this.send(value)
                        break;
                    case 'set': 
                        this.register[key] = amount
                        break;
                    case 'add':
                        this.register[key] += amount
                        break;
                    case 'mul':
                        this.register[key] *= amount
                        break;
                    case 'mod':
                        this.register[key] = this.register[key] % amount
                        break;
                    case 'rcv':
                        this.update(key)
                        if(!this.status){
                            return
                        }
                        break;
                    case 'jgz':
                        if(parseInt(key) > 0 || this.register[key] > 0){
                            this.currentInstruction--
                            i--
                            this.currentInstruction += amount
                            i += amount
                        }
                        break;
                }
            }
            this.status = false
        }
    }
}

//pt2
function duet(){
    let program0 = ProgramGen(0)
    let program1 = ProgramGen(1)

    program0.partner = program1
    program1.partner = program0

    program0.run()
    program1.run()

    if(!program0.status && !program1.status){
        return program1.amountSent
    }
}

console.log('Part 2: ', duet())