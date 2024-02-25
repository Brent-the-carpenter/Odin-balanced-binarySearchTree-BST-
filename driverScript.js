const { Tree, prettyPrint } = require("./treeClass");

function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

function driverScript() {
  const arrayOfTen = generateRandomArray(10);
  const NumbersOver100 = [101, 102, 103, 104, 105];
  const BinaryTree = new Tree(arrayOfTen);

  console.log("Is the tree balanced?:", BinaryTree.isBalanced() ? "yes" : "no");

  console.log("level order:", BinaryTree.levelOrderRecursive());

  console.log("Pre-order:", BinaryTree.preOrder());

  console.log("Post-order:", BinaryTree.postOrder());

  console.log("In-order:", BinaryTree.inOrder());

  NumbersOver100.forEach((number) => BinaryTree.insert(number));

  console.log(
    "Is the tree now unbalanced?",
    BinaryTree.isBalanced() ? "no" : "yes"
  );

  BinaryTree.rebalance();

  console.log(
    "Is the tree now balanced after rebalancing?",
    BinaryTree.isBalanced() ? "yes" : "no"
  );

  console.log("level order:", BinaryTree.levelOrderRecursive());

  console.log("Pre-order:", BinaryTree.preOrder());

  console.log("Post-order:", BinaryTree.postOrder());

  console.log("In-order:", BinaryTree.inOrder());

  prettyPrint(BinaryTree.root);
}

driverScript();
