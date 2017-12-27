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
