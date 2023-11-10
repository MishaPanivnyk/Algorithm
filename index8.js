class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Додавання елемента
  insert(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Видалення елемента
  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const minRight = this.findMinNode(node.right);
      node.data = minRight.data;
      node.right = this.removeNode(node.right, minRight.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  // Перевірити наявність елемента (знайти)
  contains(data) {
    return this.search(this.root, data);
  }

  search(node, data) {
    if (node === null) {
      return false;
    }
    if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return true;
    }
  }

  // Вивести всі елементи (ін-ордер обхід)
  inorder() {
    const result = [];
    this.inorderTraverse(this.root, result);
    return result;
  }

  inorderTraverse(node, result) {
    if (node !== null) {
      this.inorderTraverse(node.left, result);
      result.push(node.data);
      this.inorderTraverse(node.right, result);
    }
  }

  // Вивести найбільший елемент
  findMax() {
    if (this.root === null) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }

  // Вивести найменший елемент
  findMin() {
    if (this.root === null) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  // Вивести кількість
  size() {
    return this.sizeRecursive(this.root);
  }

  sizeRecursive(node) {
    if (node === null) {
      return 0;
    }
    return 1 + this.sizeRecursive(node.left) + this.sizeRecursive(node.right);
  }
}

const tree = new BinaryTree();

tree.insert(10);
tree.insert(5);
tree.insert(15);

console.log(tree.contains(10)); // true
console.log(tree.contains(7)); // false

tree.remove(10);

console.log(tree.contains(10)); // false

console.log(tree.inorder()); // [5, 15]
console.log(tree.findMin()); // 5
console.log(tree.findMax()); // 15
console.log(tree.size()); // 2
