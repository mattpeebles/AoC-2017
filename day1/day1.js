let fs = require('fs')

let input = fs.readFileSync('day1.txt').toString().split('')

    //pt 1
function captcha(arr){
    let count = 0;

    for(let i = 0; i < arr.length; i++){
        let j = i + 1
        
        if(i == arr.length - 1){
            j = 0
        }

        if(arr[i] == arr[j]){
            count += parseInt(arr[i])
        }
    }

    return count
}

console.log(captcha(input))

    //pt 2
function halfwayCaptcha(arr){
    let jump = Math.floor(arr.length / 2),
        count = 0;

    for(let i = 0; i < arr.length; i++){
        
        let j = i + jump

        if(j > arr.length - 1){
            j = Math.abs((arr.length) - i - jump)
        }

        if(arr[i] == arr[j]){
            count += parseInt(arr[i])
        } 
    }

    return count
}

console.log(halfwayCaptcha(input))