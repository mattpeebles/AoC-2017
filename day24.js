//http://adventofcode.com/2017/day/24

const fs = require('fs')

let input = fs.readFileSync('day24.txt').toString().trim().split('\n').map(item => item.replace('\r', '').split('/'))

let pieces = availablePieces(input)

function availablePieces(input){
    let pieces = {};

    for(let i = 0; i < input.length; i++){
        let piece = input[i],
            port1 = piece[0],
            port2 = piece[1];

        if(!pieces[port1]){
            pieces[port1] = [JSON.stringify(piece)]
        }else{
            pieces[port1].push(JSON.stringify(piece))
        }

        if(!pieces[port2]){
            pieces[port2] = [JSON.stringify(piece)]
        }else{
            pieces[port2].push(JSON.stringify(piece))
        }
    }

    return pieces
}

/*
        --- Day 24: Electromagnetic Moat ---

    The CPU itself is a large, black building surrounded by a bottomless pit. Enormous metal tubes extend outward from the side of the building at regular intervals and descend down into the void. There's no way to cross, but you need to get inside.

    No way, of course, other than building a bridge out of the magnetic components strewn about nearby.

    Each component has two ports, one on each end. The ports come in all different types, and only matching types can be connected. You take an inventory of the components by their port types (your puzzle input). Each port is identified by the number of pins it uses; more pins mean a stronger connection for your bridge. A 3/7 component, for example, has a type-3 port on one side, and a type-7 port on the other.

    Your side of the pit is metallic; a perfect surface to connect a magnetic, zero-pin port. Because of this, the first port you use must be of type 0. It doesn't matter what type of port you end with; your goal is just to make the bridge as strong as possible.

    The strength of a bridge is the sum of the port types in each component. For example, if your bridge is made of components 0/3, 3/7, and 7/4, your bridge has a strength of 0+3 + 3+7 + 7+4 = 24.

    For example, suppose you had the following components:

    0/2
    2/2
    2/3
    3/4
    3/5
    0/1
    10/1
    9/10

    With them, you could make the following valid bridges:

        0/1
        0/1--10/1
        0/1--10/1--9/10
        0/2
        0/2--2/3
        0/2--2/3--3/4
        0/2--2/3--3/5
        0/2--2/2
        0/2--2/2--2/3
        0/2--2/2--2/3--3/4
        0/2--2/2--2/3--3/5

    (Note how, as shown by 10/1, order of ports within a component doesn't matter. However, you may only use each port on a component once.)

    Of these bridges, the strongest one is 0/1--10/1--9/10; it has a strength of 0+1 + 1+10 + 10+9 = 31.

    What is the strength of the strongest bridge you can make with the components you have available?

    Your puzzle answer was 1868.
*/


function matchPiece(number, piecesCollection){
    let JSONpiece = piecesCollection[number];

    return JSONpiece
}

    //piece will be json
function removePiece(JSONpiece, subPieces){
    
    let newPiecesSet = deepCopyPieces(subPieces)
        piece = JSON.parse(JSONpiece),
        port1 = piece[0],
        port2 = piece[1];

    newPiecesSet[port1].splice(newPiecesSet[port1].indexOf(JSONpiece), 1)
    newPiecesSet[port2].splice(newPiecesSet[port2].indexOf(JSONpiece), 1)

    return newPiecesSet
}

function deepCopyPieces(object){
    let newObject = {}

    for(let key in object){
        let newArray = []

        object[key].forEach(item => newArray.push(item))

        newObject[key] = newArray
    }

    return newObject
}

function bridgeStrength(bridge){
    return bridge.reduce((a,b) => parseInt(a) + parseInt(b))
}

function bridgeCombinations(pieces){
    let firstPiece = matchPiece('0', pieces),
        bridges = [];
    
    firstPiece.forEach(JSONpiece => {
        let subPieces = deepCopyPieces(pieces)
        subPieces = removePiece(JSONpiece, subPieces)
        let subBridge = JSON.parse(JSONpiece)
                    
        if(subBridge[0] !== '0'){
            let temp = subBridge[0]
            subBridge[0] = subBridge[1]
            subBridge[1] = temp
        }
        newBridges = buildBridge(subPieces, [subBridge])
        
        bridges = [...bridges, ...newBridges]
    })

    return bridges
}

    /*
        bridge is an array of numbers with the last number being the free port
        pieces is an object of the available pieces

    */
function buildBridge(piecesCollection, bridges){
    let newBridges = [];

    bridges.forEach(bridge => {
        let lastPort = bridge[bridge.length -1],
            matchingPieces = matchPiece(lastPort.toString(), piecesCollection);
        
        if(matchingPieces.length == 0){
            newBridges.push(bridge)
        }else{
            matchingPieces.forEach(JSONpiece => {
                let subPieces = deepCopyPieces(piecesCollection)

                subPieces = removePiece(JSONpiece, subPieces) 
                
                let subBridge = JSON.parse(JSONpiece)
                            
                if(subBridge[0] !== lastPort){
                    let temp = subBridge[0]
                    subBridge[0] = subBridge[1]
                    subBridge[1] = temp
                }
                
                let combinedBridge = [...bridge, ...subBridge]
                    pieceBridge = buildBridge(subPieces, [combinedBridge]);
                
                newBridges = [...newBridges, ...pieceBridge]
            })
        }
    })

    return newBridges
}

function largestBridgeStrength(bridges){
    let largest = 0;

    bridges.forEach(bridge => largest = Math.max(largest, bridgeStrength(bridge)))

    return largest
}

let pieceCollection = Object.assign({}, pieces)

let bridges = bridgeCombinations(pieceCollection)
console.log('Part 1: ', largestBridgeStrength(bridges))

/*
        --- Part Two ---

    The bridge you've built isn't long enough; you can't jump the rest of the way.

    In the example above, there are two longest bridges:

        0/2--2/2--2/3--3/4
        0/2--2/2--2/3--3/5

    Of them, the one which uses the 3/5 component is stronger; its strength is 0+2 + 2+2 + 2+3 + 3+5 = 19.

    What is the strength of the longest bridge you can make? If you can make multiple bridges of the longest length, pick the strongest one.

    Your puzzle answer was 1841.
*/
function longestBridge(bridges){
    let longest = 0,
        longestBridge = undefined;

    bridges.forEach(bridge => {
        let bridgeLength = bridge.length

        if(bridgeLength > longest){
            longest = bridgeLength
            longestBridge = bridge
        }else if(bridgeLength == longest){
            if(bridgeStrength(bridge) > bridgeStrength(longestBridge)){
                longest = bridge.length
                longestBridge = bridge
            }
        }
    })

    return bridgeStrength(longestBridge)
}

console.log('Part 2: ', longestBridge(bridges))
