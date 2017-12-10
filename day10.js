//http://adventofcode.com/2017/day/10

let fs = require('fs')

let instructions = fs.readFileSync('day10.txt').toString().split('')

let list = []

for(let i = 0; i < 256; i++){
    list.push(i)
}


//pt 1

function createHash(list, instructions){
    let copyArray = [...list]
        skipSize = 0,
        startIndex = 0,
        endIndex = null,
        tempArr = [];

    instructions.forEach(size => {
        for(let i = 0, j = startIndex; i < size; i++, j++){

            if(j == copyArray.length){
                j = 0
            }

            tempArr.push(copyArray[j])
            
            if(i == size - 1){
                endIndex = j
            }
        }
        
        tempArr.reverse()


        
            //placing reversed array in copy
        for(let i = 0, j = startIndex; i < size; i++, j++){
            if(j == copyArray.length){
                j = 0
            }

            copyArray[j] = tempArr[i]
        }

        //finding new start index
        for(let i = 0, j = startIndex + 1; i < (skipSize + size); i++, j++){
            if(j == copyArray.length){
                j = 0
            }

            if(i == skipSize + size - 1){
                startIndex = j
            }
        }
        skipSize++
        tempArr = [];
    })

    return copyArray
}


let hash = createHash(list, instructions)
console.log('Part 1: ', hash[0] * hash[1])


    //pt 2
    let inputString = fs.readFileSync('day10.txt').toString()
   
    function createLengthsASCIIString(input){
        return [...input.split('').map(char => char.charCodeAt(0)), 17, 31, 73, 47, 23]
    }

    function createSparseHashFromASCII(list, instructions){
        let copyArray = [...list]
            skipSize = 0,
            startIndex = 0,
            endIndex = null,
            tempArr = [];
    
        for(let c = 0; c < 64; c++){
            instructions.forEach(size => {
                for(let i = 0, j = startIndex; i < size; i++, j++){
        
                    if(j == copyArray.length){
                        j = 0
                    }
        
                    tempArr.push(copyArray[j])
                    
                    if(i == size - 1){
                        endIndex = j
                    }
                }
                
                tempArr.reverse()
        
        
                
                    //placing reversed array in copy
                for(let i = 0, j = startIndex; i < size; i++, j++){
                    if(j == copyArray.length){
                        j = 0
                    }
        
                    copyArray[j] = tempArr[i]
                }
        
                //finding new start index
                for(let i = 0, j = startIndex + 1; i < (skipSize + size); i++, j++){
                    if(j == copyArray.length){
                        j = 0
                    }
        
                    if(i == skipSize + size - 1){
                        startIndex = j
                    }
                }
                skipSize++
                tempArr = [];
            })
        }

        return copyArray
    }

    function generateDenseHash(hash){
        let denseHash = [],
            densedHash = 0,
            startIndex = 0;

        for(let i = 0; i < 16; i++){
            for(let c = 0, j = startIndex; c < 16; c++, j++){
                if(c == 0){
                    densedHash = hash[j]
                } else{
                    densedHash ^= hash[j]
                }

                if(c == 15){
                    startIndex = j + 1
                    denseHash.push(densedHash)
                }
            }
        }

        return denseHash
    }

    function generateKnotHash(denseHash){
        let hash = ''

        denseHash.forEach(num => {
            hash += (num.toString(16).length < 2 ) ? '0' + num.toString(16) : num.toString(16)
        })

        return hash
    }

    console.log('Part 2: ', generateKnotHash(generateDenseHash(createSparseHashFromASCII(list, createLengthsASCIIString(inputString)))))

    //tests
    console.log('Part 2 Tests:')
    console.log('   ', generateKnotHash(generateDenseHash(createSparseHashFromASCII(list, createLengthsASCIIString('AoC 2017')))) === '33efeb34ea91902bb2f59c9920caa6cd')
    console.log('   ',generateKnotHash(generateDenseHash(createSparseHashFromASCII(list, createLengthsASCIIString('')))) === 'a2582a3a0e66e6e86e3812dcb672a272')
    console.log('   ',generateKnotHash(generateDenseHash(createSparseHashFromASCII(list, createLengthsASCIIString('1,2,3')))) === '3efbe78a8d82f29979031a4aa0b16a9d')
    console.log('   ',generateKnotHash(generateDenseHash(createSparseHashFromASCII(list, createLengthsASCIIString('1,2,4')))) === '63960835bcdc130f0b66d7ff4f6a5a8e')

