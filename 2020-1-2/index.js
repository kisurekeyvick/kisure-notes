function Queue() { 
    var items = []; 

    this.enqueue = function(element){ 
        items.push(element); 
    }; 

    this.dequeue = function(){ 
        return items.shift(); 
    }; 

    this.front = function(){ 
        return items[0]; 
    };

    this.isEmpty = function(){ 
        return items.length == 0; 
    }; 

    this.clear = function(){ 
        items = []; 
    }; 

    this.size = function(){ 
        return items.length; 
    }; 

    this.print = function(){ 
        console.log(items.toString()); 
    }; 
}

function Dictionary() {
    let items = {};

    this.has = function(key) {
        return key in items;
    }

    this.set = function(key, value) {
        items[key] = value;
    }

    this.remove = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }

        return false;
    }

    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    }

    this.values = function() {
        let values = [];
        for (let k in items) {
            values.push(items[k]);
        }

        return values;
    }
}

function Graph() {
    // 数组用于存储图中所有顶点的名字
    const vertices = [];
    let adjList = new Dictionary();

    // 向图中添加一个新的顶点
    this.addVertex = function(v) {
        vertices.push(v);
        // 在邻接表中，设置顶点v作为键对应的字典值为一个空数组
        adjList.set(v, []);
    }

    /**
     * 这个方法接受两个顶点作为参数。
     * 首先，通过将w加入到v的邻接表中，我们添加了一条自顶点v到顶点w的边。
     */
    this.addEdge = function(v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }

    this.toString = function() {
        let s = '';
        for (var i=0; i<vertices.length; i++) {
            s += vertices[i] + ' -> '; 
            var neighbors = adjList.get(vertices[i]);
            for (var j=0; j<neighbors.length; j++) {
                s += neighbors[j] + ' '; 
            }
            s += '\n'; //{13}
        }

        return s;
    }

    var initializeColor = function(){ 
     var color = []; 
     for (var i=0; i<vertices.length; i++){ 
         color[vertices[i]] = 'white'; //{1}
     } 
         return color; 
    };

    this.bfs = function(v, callback){ 
        var color = initializeColor(); //{2}
        console.log('color!!!:',color);
        queue = new Queue(); //{3}
        queue.enqueue(v); //{4}

        while (!queue.isEmpty()) { //{5}
            var u = queue.dequeue(), //{6}
            neighbors = adjList.get(u); //{7}
            color[u] = 'grey'; // {8}
            
            for (var i=0; i<neighbors.length; i++){ // {9}
                var w = neighbors[i]; // {10}
                if (color[w] === 'white'){ // {11}
                    color[w] = 'grey'; // {12}
                    queue.enqueue(w); // {13}
                } 
            }
    
            color[u] = 'black'; // {14}
            if (callback) { // {15}
                callback(u); 
            } 
        } 
    };

    this.dfs = function(callback) {
        var initializeColor = function(){ 
            const color = []; 
            for (var i = 0; i<vertices.length; i++) { 
                color[vertices[i]] = 'white'; //{1} 
            } 
            return color; 
        };
    
        var dfsVisit = function(u, color, callback){ 
            color[u] = 'grey'; //{5} 
            if (callback) { //{6} 
                callback(u); 
            } 
            var neighbors = adjList.get(u); //{7} 
            for (var i=0; i<neighbors.length; i++){ //{8} 
                var w = neighbors[i]; //{9} 
                if (color[w] === 'white'){ //{10} 
                    dfsVisit(w, color, callback); //{11} 
                } 
            } 
            color[u] = 'black'; //{12} 
        };
    
        var color = initializeColor();
    
        for (var i=0; i<vertices.length; i++){ //{2} 
            if (color[vertices[i]] === 'white'){ //{3} 
                dfsVisit(vertices[i], color, callback); //{4} 
            } 
        }
    }
}

function printNode(value){ //{16} 
 console.log('Visited vertex: ' + value); //{17} 
}

var graph = new Graph(); 
var myVertices = ['A','B','C','D','E','F','G','H','I']; //{7} 
for (var i=0; i<myVertices.length; i++){ //{8} 
 graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'B'); //{9} 
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('C', 'D'); 
graph.addEdge('C', 'G'); 
graph.addEdge('D', 'G'); 
graph.addEdge('D', 'H'); 
graph.addEdge('B', 'E'); 
graph.addEdge('B', 'F'); 
graph.addEdge('E', 'I');

console.log(graph.toString());

// graph.bfs(myVertices[0], printNode);
graph.dfs(printNode);