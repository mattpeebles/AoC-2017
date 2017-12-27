//http://adventofcode.com/2017/day/7

let fs = require('fs')

let input = fs.readFileSync('day7.txt').toString().split("\r").map(item => item.replace('\n', '').split('->').map(item => item.trim().replace('(', '').replace(')', '').split(' ').map(item => item.replace(',', ''))))
input.pop()

// pt 1
function buildRelationshipObject(input){
    let relationshipMap = {};
    
        input.forEach(line => {
            
            let elementInfo = line[0],
                elementName = elementInfo[0],
                elementWeight = elementInfo[1],
                childInfo = (line[1] !== undefined) ? line[1] : [];
    
            if(!relationshipMap[elementName]){
                relationshipMap[elementName] = {'parentCount': 0, 'parent': null, 'name': elementName, 'weight': parseInt(elementWeight, 10), 'children': childInfo}
            }else{
                relationshipMap[elementName]['children'] = childInfo
                relationshipMap[elementName]['weight'] = parseInt(elementWeight, 10)
            };
    
            if(childInfo !== undefined){
                childInfo.forEach(child => {
                    if(relationshipMap[child]){
                        relationshipMap[child]['parentCount']++
                        relationshipMap[child]['parent'] = elementName
                    }else{
                        relationshipMap[child] = {'parentCount': 1, 'parent': elementName, 'name': child, 'weight': 0, 'children': []};
                    }
                })
    
            }
        })

    return relationshipMap
}

function findRoot(input){
    let relationships = buildRelationshipObject(input)

    for(let key in relationships){
        if(relationships[key]['parentCount'] === 0){
           return key
        }
    }
}
console.log('Part 1: ', findRoot(input))


    //pt 2
function Tree(){
    this.head = null

    this.createNode = function(name, weight, parent){
        return {
            name,
            weight,
            parent,
            children: []
        }

    }

    this.insertNode = function(parent, leaf){
        if(parent === null){
            this.head = leaf
        }

        else {
            let node = this._find(parent)
            
            node.children.push(leaf)
        }
    }

    this._find = function(name){
        let node = this.head;
        let values = [];

        values.push(node)

        while(values.length > 0){
            let value = values.shift()

            if(value.name === name){
                return value
            }

            if(value.children.length > 0){
                value.children.forEach(child => {
                    values.push(child)
                })                
            }
        }

        return null
    }
}

function buildTreeFromInput(input){
    let relationships = buildRelationshipObject(input),
        rootName = findRoot(input),
        tree = new Tree(),
        values = [relationships[rootName]];
        
    while(values.length > 0){
        let value = values.shift()
        if(value.children.length > 0){
            value.children.forEach(child => {
                values.push(relationships[child])
            })
        }

        let node = tree.createNode(value.name, value.weight, value.parent)

        tree.insertNode(value.parent, node)
    }

    return tree
}

function addWeights(tree){
    let weights = []

    if(tree.children.length < 1){
        return tree.weight
    }

    tree.children.forEach(child => {
        weights.push(addWeights(child))
    })

        //adds children weights together and the parent weight
    return weights.reduce((a, b) => a + b) + tree.weight
}

function findUnbalanced(tree){
   
    if(tree.children.length < 1){
        return tree.parent
    }

    let weights = []

    tree.children.forEach(child => {
        let weight = addWeights(child)
        weights.push({'name': child.name, weight})
    })
    

    let unevenWeight,
        seenWeightMap = {};

    weights.forEach(item => {
        if(seenWeightMap[item.weight]){
            seenWeightMap[item.weight]++
        }else{
            seenWeightMap[item.weight] = 1
        }
    })

    for(let key in seenWeightMap){
        if(seenWeightMap[key] == 1 ){
            unevenWeight = parseInt(key)
        }
    }

    
    let uneven = weights.filter(item => item.weight === unevenWeight)[0]
    
        //if undefined our most recent tree input is the one that needs changing
    if(uneven == undefined){
        return tree
    }

    return findUnbalanced(tree.children.filter(child => child.name === uneven.name)[0])

}

let inputTree = buildTreeFromInput(input)

function adjustWeight(input){
    let inputTree = buildTreeFromInput(input),
        wrongWeight = findUnbalanced(inputTree.head);
        wrongWeightSibs = inputTree._find(wrongWeight.parent).children,
        weights = {};

    wrongWeightSibs.forEach(sib => {
        let weight = addWeights(sib)

        if(weights[weight]){
            weights[weight]++
        } else{
            weights[weight] = 1
        }
    })

    let diff = Math.abs(parseInt(Object.keys(weights)[0]) - parseInt(Object.keys(weights)[1]))

    return wrongWeight.weight - diff
}

console.log('Part 2: ', adjustWeight(input))