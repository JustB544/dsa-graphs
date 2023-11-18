class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let v of vertex.adjacent){
      v.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const seen = new Set();
    const stack = [start];
    let cur;
    const arr = []
    while (stack.length !== 0){
      cur = stack[stack.length-1];
      stack.pop();
      seen.add(cur);
      arr.push(cur.value);
      for (let v of cur.adjacent){
        if (!seen.has(v) && !stack.includes(v)){
          stack.push(v);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const seen = new Set([start]);
    let prev = [];
    let cur = [start];
    const arr = [];
    while (cur.length !== 0){
      prev = cur;
      cur = [];
      for (let v1 of prev) {
        arr.push(v1.value);
        for (let v2 of v1.adjacent){
          if (!seen.has(v2) && !cur.includes(v2)){
            cur.push(v2);
            seen.add(v2);
          }
        }
      }
    }
    return arr;
  }
}

module.exports = {Graph, Node}