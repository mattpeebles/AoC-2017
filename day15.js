//http://adventofcode.com/2017/day/15

function generator(num, factor){
    return (num * factor) % 2147483647
}

function compare(aStart, aDivisor, bStart, bDivisor, cycles){
    let queue = [[aStart, bStart]],
        count = 0,
        matches = 0;

    while(count < cycles && queue.length > 0){
        let pair = queue.shift(),
            a = generator(pair[0], aDivisor)
            b = generator(pair[1], bDivisor);
        queue.push([a, b])

        if((a & 0xFFFF) == (b & 0xFFFF)){
            matches++
        }
        count++
    }
    return matches
}

console.log('Part 1: ', compare(512, 16807, 191, 48271, 40000000))

function sophisticatedGenerator(num, factor, multiple){
    let val = (num * factor) % 2147483647

    return (val % multiple == 0) ? val : sophisticatedGenerator(val, factor, multiple)
}

function sophisticatedCompare(aStart, aDivisor, aMultiple, bStart, bDivisor, bMultiple, cycles){
    let queue = [[aStart, bStart]],
    count = 0,
    matches = 0;

    while(count < cycles && queue.length > 0){
        let pair = queue.shift(),
            a = sophisticatedGenerator(pair[0], aDivisor, aMultiple),
            b = sophisticatedGenerator(pair[1], bDivisor, bMultiple);
        queue.push([a, b])

        if((a & 0xFFFF) == (b & 0xFFFF)){
            matches++
        }

        count++
    }

    return matches
}

console.log('Part 2: ', sophisticatedCompare(512, 16807, 4, 191, 48271, 8, 5000000))
