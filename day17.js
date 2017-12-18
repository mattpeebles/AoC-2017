//https://adventofcode.com/2017/day/17

let steps = 354;

function LinkedList(){
    this.head = null;
    this.tail = null;
    
    this.createNode = function(value){
        return {
            value,
            next: null
        }
    }    

    this.insert_node = function(previous, node){
        
        if(previous == null || this.head == null){
            this.head = node
            this.tail = node
            node.next = node
        }
        else{
            let parent = this._find(previous)
            
            if(this.tail == parent){
                this.tail = node
                node.next = this.head
                parent.next = node
            }else{
                let temp = parent.next
                parent.next = node
                node.next = temp
            }
        }
    }

    this._find = function(item){
        let node = this.head

        while(node.value !== item){
            node = node.next
        }

        return node
    }
}

function createCircularBuffer(steps, size){
    let buffer = new LinkedList(),
        currentNode = null;

    
    
    for(let i = 0; i <= size; i++){
        let node = buffer.createNode(i)
        if(i == 0){
            buffer.insert_node(null, node)
            currentNode = node
        }

        else{
            for(let i = 0; i < steps; i++){
                currentNode = currentNode.next
            }

            buffer.insert_node(currentNode.value, node)
            currentNode = node
        }
    }

    return buffer
}

//pt 1
console.log('Part 1: ', createCircularBuffer(steps, 2017)._find(2017).next.value)


//pt 2
//resource : https://www.reddit.com/r/adventofcode/comments/7kc0xw/2017_day_17_solutions/drd73mz/

let index = 0,
    result;

    for(let i = 0; i < 5E7; i++){
        index = (index + steps + 1) % (i + 1)
        if(index == 0){
            result = i + 1
        }
    }

console.log('part 2: ', result)