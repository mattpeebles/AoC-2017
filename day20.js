/*
    https://adventofcode.com/2017/day/20
    Part 1 Rank: 781
    Part 2 Rank: 668
*/

const fs = require('fs')
let input = fs.readFileSync('day20.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split(', ').map(item => item.trim().split('=<').map(item => item.replace('>', '').split(',').map(num => (isNaN(parseInt(num))) ? num : parseInt(num)))))

/*
                --- Part 1 ---
        --- Day 20: Particle Swarm ---

    Suddenly, the GPU contacts you, asking for help. Someone has asked it to simulate too many particles, and it won't be able to finish them all in time to render the next frame at this rate.

    It transmits to you a buffer (your puzzle input) listing each particle in order (starting with particle 0, then particle 1, particle 2, and so on). For each particle, it provides the X, Y, and Z coordinates for the particle's position (p), velocity (v), and acceleration (a), each in the format <X,Y,Z>.

    Each tick, all particles are updated simultaneously. A particle's properties are updated in the following order:

        Increase the X velocity by the X acceleration.
        Increase the Y velocity by the Y acceleration.
        Increase the Z velocity by the Z acceleration.
        Increase the X position by the X velocity.
        Increase the Y position by the Y velocity.
        Increase the Z position by the Z velocity.

    Because of seemingly tenuous rationale involving z-buffering, the GPU would like to know which particle will stay closest to position <0,0,0> in the long term. Measure this using the Manhattan distance, which in this situation is simply the sum of the absolute values of a particle's X, Y, and Z position.

    For example, suppose you are only given two particles, both of which stay entirely on the X-axis (for simplicity). Drawing the current states of particles 0 and 1 (in that order) with an adjacent a number line and diagram of current X positions (marked in parenthesis), the following would take place:

    p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
    p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>                         (0)(1)

    p=< 4,0,0>, v=< 1,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
    p=< 2,0,0>, v=<-2,0,0>, a=<-2,0,0>                      (1)   (0)

    p=< 4,0,0>, v=< 0,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
    p=<-2,0,0>, v=<-4,0,0>, a=<-2,0,0>          (1)               (0)

    p=< 3,0,0>, v=<-1,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
    p=<-8,0,0>, v=<-6,0,0>, a=<-2,0,0>                         (0)   

    At this point, particle 1 will never be closer to <0,0,0> than particle 0, and so, in the long run, particle 0 will stay closest.

    Which particle will stay closest to position <0,0,0> in the long term?

    Your puzzle answer was 170.
*/

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


/*
        --- Part Two ---

    To simplify the problem further, the GPU would like to remove any particles that collide. Particles collide if their positions ever exactly match. Because particles are updated simultaneously, more than two particles can collide at the same time and place. Once particles collide, they are removed and cannot collide with anything else after that tick.

    For example:

    p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
    p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
    p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>    (0)   (1)   (2)            (3)
    p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>

    p=<-3,0,0>, v=< 3,0,0>, a=< 0,0,0>    
    p=<-2,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
    p=<-1,0,0>, v=< 1,0,0>, a=< 0,0,0>             (0)(1)(2)      (3)   
    p=< 2,0,0>, v=<-1,0,0>, a=< 0,0,0>

    p=< 0,0,0>, v=< 3,0,0>, a=< 0,0,0>    
    p=< 0,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
    p=< 0,0,0>, v=< 1,0,0>, a=< 0,0,0>                       X (3)      
    p=< 1,0,0>, v=<-1,0,0>, a=< 0,0,0>

    ------destroyed by collision------    
    ------destroyed by collision------    -6 -5 -4 -3 -2 -1  0  1  2  3
    ------destroyed by collision------                      (3)         
    p=< 0,0,0>, v=<-1,0,0>, a=< 0,0,0>

    In this example, particles 0, 1, and 2 are simultaneously destroyed at the time and place marked X. On the next tick, particle 3 passes through unharmed.

    How many particles are left after all collisions are resolved?

    Your puzzle answer was 571.
*/

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