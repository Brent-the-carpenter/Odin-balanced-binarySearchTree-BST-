const BsNode = require("./bs-nodeClass");

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array || array.length === 0) {
      return null;
    }
    const uniqueArray = [...new Set(array.sort((a, b) => a - b))];
    const mid = Math.floor(uniqueArray.length / 2);

    const root = new BsNode(uniqueArray[mid]);

    root.left = this.buildTree(uniqueArray.slice(0, mid));
    root.right = this.buildTree(uniqueArray.slice(mid + 1));
    return root;
  }

  insert(value, currentNode = this.root) {
    if (!currentNode) {
      this.root = new BsNode(value);
      return;
    }
    if (value < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = new BsNode(value);
      } else {
        this.insert(value, currentNode.left);
      }
    } else if (value > currentNode.data) {
      if (!currentNode.right) {
        currentNode.right = new BsNode(value);
      } else {
        this.insert(value, currentNode.right);
      }
    }
  }

  // eslint-disable-next-line consistent-return
  delete(value, currentNode = this.root, parent = null) {
    if (!currentNode) {
      return false;
    }
    if (value < currentNode.data) {
      this.delete(value, currentNode.left, currentNode);
    } else if (value > currentNode.data) {
      this.delete(value, currentNode.right, currentNode);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (currentNode.left !== null && currentNode.right !== null) {
        const successor = this.findMinValue(currentNode.right);
        currentNode.data = successor.data;
        this.delete(successor.data, currentNode.right, currentNode);
      } else {
        const replacement = currentNode.left || currentNode.right;
        if (currentNode === this.root) {
          this.root = replacement;
        } else if (currentNode === parent.left) {
          parent.left = replacement;
        } else {
          parent.right = replacement;
        }
      }
    }
  }

  // helper function for delete
  findMinValue(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) {
      return false;
    }
    if (currentNode.data === value) {
      return currentNode;
    }

    if (value < currentNode.data) {
      if (!currentNode.left) {
        return false;
      }
      return this.find(value, currentNode.left);
    }
    if (!currentNode.right) {
      return false;
    }
    return this.find(value, currentNode.right);
  }

  levelOrder(callback) {
    if (!this.root) return callback ? null : [];
    const queue = [this.root];
    const values = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.data);
      }
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return callback ? null : values;
  }

  calculateTreeHeight(node) {
    if (!node) return 0;
    const leftHeight = this.calculateTreeHeight(node.left);
    const rightHeight = this.calculateTreeHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  processLevel(node, level, callback, values) {
    if (!node) return null;
    if (level === 0) {
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
    } else {
      this.processLevel(node.left, level - 1, callback, values);
      this.processLevel(node.right, level - 1, callback, values);
    }
  }

  levelOrderRecursive(callback) {
    const height = this.calculateTreeHeight(this.root);
    const values = [];
    for (let i = 0; i < height; i += 1) {
      this.processLevel(this.root, i, callback, values);
    }
    return callback ? null : values;
  }

  inOrder(node, callback, values = []) {
    if (!node) {
      return callback ? null : values;
    }
    this.inOrder(node.left, callback, values);
    if (!callback) {
      values.push(node.data);
    } else {
      callback(node);
    }
    this.inOrder(node.right, callback, values);
    if (node === this.root && !callback) {
      return values;
    }
    return null;
  }

  preOrder(node, callback, values = []) {
    if (!node) return callback ? null : values;
    if (!callback) {
      values.push(node.data);
    } else {
      callback(node);
    }
    this.preOrder(node.left, callback, values);
    this.preOrder(node.right, callback, values);
    if (node === this.root && !callback) {
      return values;
    }
    return null;
  }

  postOrder(node, callback, values = []) {
    if (!node) return callback ? null : values;
    this.postOrder(node.left, callback, values);
    this.postOrder(node.right, callback, values);

    if (!callback) {
      values.push(node.data);
    } else {
      callback(node);
    }

    if (node === this.root && !callback) return values;
    return null;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree1 = new Tree(array1);
prettyPrint(tree1.root);
module.exports = Tree;
