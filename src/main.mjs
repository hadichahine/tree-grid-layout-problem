function traversal(graphObject, accumulatorFunction, initialAccumulator) {
  const adjacencyList = graphObject.adjacencyList;
  const visited = new Array(adjacencyList.length).fill(false);
  const visitedNodes = [];

  let accumulator = initialAccumulator;

  function explore(nodeIndex, parent, breadth, depth) {
    visited[nodeIndex] = true;

    const neighbors = adjacencyList[nodeIndex];
    let breadthCounter = 0;
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        explore(neighbor, nodeIndex, breadthCounter++, depth + 1);
      }
    }
    accumulator = accumulatorFunction({
      graphObject,
      accumulator,
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

const accumulatorFunction = ({
  graphObject,
  accumulator,
  nodeIndex,
  depth,
  visited,
}) => {
  function getNode(index) {
    const nodeChildren = graphObject.adjacencyList[index];

    return {
      getChildren() {
        return nodeChildren;
      },
    };
  }

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

function solution(graphObject) {
  return traversal(
    graphObject,
    accumulatorFunction,
    new Array(graphObject.adjacencyList.length),
    false
  ).map(({ column, row }) => ({ column, row }));
}

export default solution;
