/*
    https://adventofcode.com/2017/day/20
    Part 1 Rank: 781
    Part 2 Rank: 668
*/

const fs = require('fs')
let input = fs.readFileSync('day20.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(', ').map(item => item.trim().split('=<').map(item => item.replace('>', '').split(',').map(num => (isNaN(parseInt(num))) ? num : parseInt(num)))))

function createParticleState(input){
    let particles = [];


    for(let i = 0; i < input.length; i++){
        if(input[i]){
            particles[i] = input[i][0][1]            
        }
    }

    return particles
}

function simulateTick(input){
    let state = [...input],
        closestToZero = Infinity,
        indexOfParticle = -1;

    state.forEach((particle, index) => {
        let position = particle[0][1]
            velocity = particle[1][1],
            acceleration = particle[2][1],
            x = 0,
            y = 1,
            z = 2;

            velocity[x] += acceleration[x]
            velocity[y] += acceleration[y]
            velocity[z] += acceleration[z]
            position[x] += velocity[x]
            position[y] += velocity[y]
            position[z] += velocity[z]

        let distanceFromZero = manhattenDistance(position)

        if(distanceFromZero < closestToZero){
            closestToZero = distanceFromZero
            indexOfParticle = index
        }
    })

    return [indexOfParticle, state]
}

function manhattenDistance(position){
    return Math.abs(position[0]) + Math.abs(position[1]) + Math.abs(position[2])
}

function simulation(input){
    let data = [...input],
        state = createParticleState(data),
        closestToZero = -1;

    for(let i = 0; i < 1000; i++){
        let tick = simulateTick(data)
        data = tick[1]
        state = createParticleState(data)
        closestToZero = tick[0]
    }

    return closestToZero
}

console.log('Part 1: ', simulation(input))

function simulateSophisticatedTick(input){
    let state = [...input],
        seen = {},
        destroyed= new Set()

    state.forEach((particle, index) => {
        if(particle !== false){    
            let position = particle[0][1]
                velocity = particle[1][1],
                acceleration = particle[2][1],
                x = 0,
                y = 1,
                z = 2;

            velocity[x] += acceleration[x]
            velocity[y] += acceleration[y]
            velocity[z] += acceleration[z]
            position[x] += velocity[x]
            position[y] += velocity[y]
            position[z] += velocity[z]

            if(isNaN(parseInt(seen[position]))){
                seen[position] = index
            }else{
                destroyed.add(index)
                destroyed.add(seen[position])
            } 
        }
    })

    destroyed.forEach(i => {
        state[i] = false
    })

    return [destroyed.size, state] 
}

function sophisticatedSimulation(input){
    let data = input,
        state = createParticleState(data),
        noCollisions = 0,
        previousLength = state.length,
        currentLength = state.length;

    while(noCollisions < 1000){
        let tick = simulateSophisticatedTick(data)
        data = tick[1]
        state = createParticleState(data)
        let filteredState = state.filter(item => item !== false)
        currentLength = filteredState.length;

        if(currentLength !== previousLength){
            noCollisions = 0
            previousLength = currentLength
        }else{
            noCollisions++
        }
    }

    return currentLength
}

input = fs.readFileSync('day20.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(', ').map(item => item.trim().split('=<').map(item => item.replace('>', '').split(',').map(num => (isNaN(parseInt(num))) ? num : parseInt(num)))))
console.log('Part 2: ', sophisticatedSimulation(input))