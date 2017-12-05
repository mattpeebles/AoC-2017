let fs = require('fs')

let input = fs.readFileSync('input.txt').toString().split("\r").map(item => (item.match('\n')) ? item.replace("\n", ''): item ).map(arr => arr.split('\t'))

input.pop()

function corruptionCheckSum(input){
    let result = 0
    input.forEach(array =>{
        let largest = parseInt(array[0]),
            smallest = parseInt(array[0]);

        array.forEach(number => {   
            let num = parseInt(number)

            largest = Math.max(largest, num)
            smallest = Math.min(smallest, num)
        })

        result += largest - smallest

    })

    return result
}

let sortedInput = input.map(arr => arr.sort((a, b) => b - a))

function checkSumDivision(arr){
    let result = 0;
    arr.forEach(numbers => {
        for(let i = numbers.length - 1; i >= 0; i--){
            for(let j = 0; j < i; j++){
                if(numbers[j] % numbers[i] === 0){
                    result += (numbers[j]/numbers[i])
                    return;
                }
            }
        }
    })

    return result
}

console.log(checkSumDivision(sortedInput))
console.log(corruptionCheckSum(input))
