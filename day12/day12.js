const fs = require('fs')

let input = fs.readFileSync('day12.txt').toString().trim().split('\r').map(item => item.replace('\n', '').split('<->').map(item => item.trim().split(',').map(item => item.trim())))

function createGroupMap(input){
    let pairs = {}

    input.forEach(item => {
        pairs[item[0]] = item[1]
    })
    return pairs
}

function groupByMember(group, member){
    let memberSet = new Set();
    let queue = [member];

    while(queue.length > 0){
        let num = queue.shift(),
            relation = group[num];

            memberSet.add(num)

            relation.forEach(item => {
                if(!memberSet.has(item)){
                    queue.push(item)
                }
            })
            
    }

    return memberSet;
}

console.log('Part 1: ', groupByMember(createGroupMap(input), '0').size)


function differetGroupsInInput(input){
    let groups = [],
        groupMap = createGroupMap(input)

    input.forEach(relationships => {
        let num = relationships[0][0],
            existsInPreviousGroup = false;

        
        for(let i = 0; i < groups.length; i++){
            if(groups[i].has(num)){
                existsInPreviousGroup = true
                return
            }
        }

        if(!existsInPreviousGroup){
            let newGroup = groupByMember(groupMap, num)

            groups.push(newGroup)
        }
    })

    return groups;
}

console.log('Part 2: ', differetGroupsInInput(input).length)