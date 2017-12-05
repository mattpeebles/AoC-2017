let fs = require('fs')

let input = fs.readFileSync('jumplist.txt').toString().split('\n').map(item => parseInt(item.replace('\r', '')))

function jumpList(arr){
    let index = 0,
        jump = arr[index]
        count = 0;
    
    while(jump !== undefined){
        count++
        if (arr[index] >= 3){
            arr[index]--
        }else{
            arr[index]++
        }
        index = index + jump
        jump = arr[index]
    }

    return count
}

console.log(jumpList(input))