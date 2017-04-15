/*
const state = {
  undo: { isAvailable: true },
  redo: { isAvailable: false, changes: { test: "test" } }
};

console.log(state);

const newState = Object.assign({}, state, {redo: {isAvailable: true}});

console.log(newState);
*/

const promises = [
  Promise.resolve("abc"),
  Promise.resolve("def"),
  Promise.resolve("xyz")
];

Promise.all(promises).then(data => console.log(data));
