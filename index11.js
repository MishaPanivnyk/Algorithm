class Node {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToStart(data) {
    const newNode = new Node(data, null, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++;
  }

  addToEnd(data) {
    const newNode = new Node(data, this.tail, null);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  removeFirst() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
  }

  removeLast() {
    if (!this.tail) {
      return;
    }
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  getByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  insertAtIndex(index, data) {
    if (index < 0 || index > this.length) {
      return;
    }
    if (index === 0) {
      this.addToStart(data);
    } else if (index === this.length) {
      this.addToEnd(data);
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      const newNode = new Node(data, current, current.next);
      current.next.prev = newNode;
      current.next = newNode;
      this.length++;
    }
  }

  getMax() {
    if (!this.head) {
      return null;
    }
    let max = this.head.data;
    let current = this.head.next;
    while (current) {
      if (current.data > max) {
        max = current.data;
      }
      current = current.next;
    }
    return max;
  }

  getMin() {
    if (!this.head) {
      return null;
    }
    let min = this.head.data;
    let current = this.head.next;
    while (current) {
      if (current.data < min) {
        min = current.data;
      }
      current = current.next;
    }
    return min;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getCount() {
    return this.length;
  }

  insertArrayAtIndex(index, dataArray) {
    if (index < 0 || index > this.length) {
      return;
    }
    for (let i = 0; i < dataArray.length; i++) {
      this.insertAtIndex(index + i, dataArray[i]);
    }
  }
}

// Пример использования:

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.addToEnd(1);
doublyLinkedList.addToEnd(2);
doublyLinkedList.addToEnd(3);
doublyLinkedList.addToEnd(4);

console.log("Original list:");
doublyLinkedList.print();

console.log("Max value:", doublyLinkedList.getMax());
console.log("Min value:", doublyLinkedList.getMin());

doublyLinkedList.insertAtIndex(2, 10);

console.log("List after inserting 10 at index 2:");
doublyLinkedList.print();

doublyLinkedList.removeFirst();

console.log("List after removing the first element:");
doublyLinkedList.print();

doublyLinkedList.removeLast();

console.log("List after removing the last element:");
doublyLinkedList.print();

console.log("Number of elements in the list:", doublyLinkedList.getCount());

const newArray = [20, 30, 40];
doublyLinkedList.insertArrayAtIndex(1, newArray);

console.log("List after inserting array at index 1:");
doublyLinkedList.print();
