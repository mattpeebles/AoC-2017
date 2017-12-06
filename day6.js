//http://adventofcode.com/2017/day/6

let input = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5]


//Part 1
function redistri(arr){
    let memArr = [...arr],
        highest = memArr[0],
        highIndex = 0,
        count = 0;
      
    let seen = {};

    while(true){
            
            //find highest number, if duplicate - keep lowest indexed highest number
        for(let i = 0; i < memArr.length; i++){
            let num = memArr[i];
            if(num > highest){
                highest = num;
                highIndex = i;
            };
        };

        memArr[highIndex] = 0;

        let startIndex = highIndex + 1;

        while(highest !== 0){
            
            if(startIndex > (memArr.length - 1)){
                startIndex = 0;
            };
            memArr[startIndex] += 1;
            highest--;
            startIndex++

        };

        count++

        if(seen[memArr]){
            return count;
        }else{
            seen[memArr] = 1;        
        };
    }
}

console.log(redistri(input))

 //pt2
function redistriLoopCount(arr){
    let memArr = [...arr],
        highest = memArr[0],
        highIndex = 0,
        count = 0;
      
    let seen = {};

    while(true){
            
            //find highest number, if duplicate - keep lowest indexed highest number
        for(let i = 0; i < memArr.length; i++){
            let num = memArr[i];
            if(num > highest){
                highest = num;
                highIndex = i;
            };
        };

        memArr[highIndex] = 0;

        let startIndex = highIndex + 1;

        while(highest !== 0){
            
            if(startIndex > (memArr.length - 1)){
                startIndex = 0;
            };
            memArr[startIndex] += 1;
            highest--;
            startIndex++

        };

            //cycled through loop twice
        if(seen[memArr] == 2){
            return count;
        }

            //we've found the loop so we begin incrementing count
        if(seen[memArr]){
            seen[memArr]++
            count++
        }
        else{
            seen[memArr] = 1;        
        };
    }
}

console.log(redistriLoopCount(input))