function traversal(graphObject, accumulatorFunction, initialAccumulator) {
  const adjacencyList = graphObject.adjacencyList;
  const nodes = graphObject.nodes;
  const visited = new Array(adjacencyList.length).fill(false);
  const visitedNodes = [];

  let accumulator = initialAccumulator;

  function explore(nodeIndex, parent, breadth, depth) {
    visited[nodeIndex] = true;

    const node = nodes[nodeIndex];

    const neighbors = adjacencyList[nodeIndex];
    let breadthCounter = 0;
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        explore(neighbor, nodeIndex, breadthCounter++, depth + 1);
      }
    }
    accumulator = accumulatorFunction({
      accumulator,
      node,
      nodeIndex,
      breadth,
      depth,
      parent,
      visited: visitedNodes,
    });
    visitedNodes.push(nodeIndex);
  }

  explore(0, -1, 0, 0);

  return accumulator;
}

function getNode(index) {
  const nodeChildren = graphObject.adjacencyList[index];

  return {
    getChildren() {
      return nodeChildren;
    },
  };
}

const accumulatorFunction = ({
  accumulator,
  nodeIndex,
  parent,
  depth,
  visited,
}) => {
  const isLeafNode = getNode(nodeIndex).getChildren().length === 0;

  const previousVisited = visited.length > 0 ? visited.slice(-1)[0] : null;

  const newAcc = [...accumulator];

  if (isLeafNode) {
    newAcc[nodeIndex] = {
      row: !previousVisited
        ? 0
        : newAcc[previousVisited].row + newAcc[previousVisited].width,
      column: depth,
      width: 1,
    };
  } else {
    const firstChild = getNode(nodeIndex).getChildren()[0];
    const lastChild =
      getNode(nodeIndex).getChildren()[
        getNode(nodeIndex).getChildren().length - 1
      ];

    newAcc[nodeIndex] = {
      row: newAcc[firstChild].row,
      column: depth,
      width:
        newAcc[lastChild].row +
        newAcc[lastChild].width -
        newAcc[firstChild].row,
    };
  }

  return newAcc;
};

const graphObject = {
  adjacencyList: [[1, 2], [3, 4], [5, 6], [], [7, 8], [], [], [], []],
  nodes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" },
    { name: "F" },
    { name: "G" },
    { name: "H" },
  ],
};

const res = [];

function layoutTree(root, row, col) {
  res[root] = { row, col };

  let currentCol = col;
  for (const child of graphObject.adjacencyList[root]) {
    currentCol += layoutTree(child, row + 1, currentCol);
  }

  return currentCol;
}

function f() {
  return traversal(
    graphObject,
    accumulatorFunction,
    new Array(graphObject.adjacencyList.length),
    false
  );
}
