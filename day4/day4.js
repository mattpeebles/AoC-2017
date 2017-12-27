let fs = require('fs')
let input = fs.readFileSync('input2.txt').toString().split('\n').map(arr => arr.split(' ').map(item => item.replace('\r', '')))

input.pop()

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}


function uniquePhrases(input){
    let result = 0;

    input.forEach(arr => {
        let seen = [],
            dup = false;
        
        arr.forEach(item => {
            let letterMap = {}
            
            for(let i = 0; i < item.length; i++){
                let lett = item[i]
                if(letterMap[lett]){
                    letterMap[lett]++
                }else{
                    letterMap[lett] = 1
                }
            }
            
            if(seen.filter(arr => isEquivalent(arr, letterMap)).length > 0){
                dup = true
            }else{
                seen.push(letterMap)
            }
        })

        if(!dup){
            result++
        }
    })

    return result
}



console.log(input.length)
console.log(uniquePhrases(input))