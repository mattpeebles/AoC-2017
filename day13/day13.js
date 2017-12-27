const fs = require('fs')

let input = fs.readFileSync('day13.txt').toString().trim().split('\r').map(item => item.replace('\n', '').split(':').map(item => item.trim()))

function buildFireWall(input){
    let firewall = {}

    input.forEach(item => {
        let level = item[0],
            depth = parseInt(item[1]);

        firewall[level] = depth
    })
    
    return firewall

}


function trackSeverity(firewall, delay = 0){
    let severity = 0,
        count = 0,
        maxLevel = Math.max(...Object.keys(firewall));

    for(let i = delay; i < maxLevel; i++){
        let depth = firewall[i.toString()],
            picosecond = 0,
            scannerIndex = 0,
            backwards = false
        
        if(depth !== undefined){
            for(let j = 0; j < count; j++){
                    
                    //check to see if previous increment made index equal to depth - 1, if so
                    // we need to decrement
                    //must be checked before backwards bool check otherwise depth - 1 is checked twice
                if(scannerIndex >= depth - 1){
                    backwards = true
                }
                
                if(!backwards){
                    scannerIndex++
                }

                if(backwards){
                    scannerIndex--
                }

                if(scannerIndex < 1){
                    scannerIndex = 0
                    backwards = false
                }
            }

            if(scannerIndex == 0){
                severity += i * depth
            }
        }
        count++
    }

    return severity
}


console.log('Part 1: ', trackSeverity(buildFireWall(input), 0))


//pt 2
//EXTREMELY SLOW
function delay(firewall){
    let delay = 0,
        severity = trackSeverity(firewall, delay);
    
    while(severity > 0){
        severity = trackSeverity(firewall, delay + 1)
    }

    return delay
}

console.log('Part 2: ', delay(buildFireWall(input)))