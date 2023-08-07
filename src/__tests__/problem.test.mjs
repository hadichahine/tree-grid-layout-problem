import solution from "../main.mjs";

test("test simple graph root and 2 leaf nodes", () => {
  const graphObject = {
    adjacencyList: [[1, 2], [], []],
  };

  expect(solution(graphObject)).toStrictEqual([
    {
      column: 0,
      row: 0,
    },
    {
      column: 1,
      row: 0,
    },
    {
      column: 1,
      row: 1,
    },
  ]);
});

test("test graph with root and 2 children each having a leaf node", () => {
  const graphObject = {
    adjacencyList: [[1, 2], [3], [4], [], []],
  };

  expect(solution(graphObject)).toStrictEqual([
    { column: 0, row: 0 },
    { column: 1, row: 0 },
    { column: 1, row: 1 },
    { column: 2, row: 0 },
    { column: 2, row: 1 },
  ]);
});

test("test graph with root and 2 children first having 2 children causing a push", () => {
  const graphObject = {
    adjacencyList: [[1, 2], [3, 5], [4], [], [], []],
  };

  expect(solution(graphObject)).toStrictEqual([
    {
      column: 0,
      row: 0,
    },
    {
      column: 1,
      row: 0,
    },
    {
      column: 1,
      row: 2,
    },
    {
      column: 2,
      row: 0,
    },
    {
      column: 2,
      row: 2,
    },
    {
      column: 2,
      row: 1,
    },
  ]);
});
