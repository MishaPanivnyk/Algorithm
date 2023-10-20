class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  // Видалити елемент з вершини стеку і повернути його значення
  pop() {
    if (!this.top) return null;
    const data = this.top.data;
    this.top = this.top.next;
    this.length--;
    return data;
  }

  // Переглянути елемент на вершині стеку без видалення
  peek() {
    return this.top ? this.top.data : null;
  }

  // Очистити стек
  clear() {
    this.top = null;
    this.length = 0;
  }

  // Отримати кількість елементів у стеці
  count() {
    return this.length;
  }

  // Перетворити стек у рядок (без видалення елементів)
  toString() {
    let current = this.top;
    let result = "";
    while (current) {
      result += current.data + " ";
      current = current.next;
    }
    return result.trim();
  }
}
// Приклад використання
const stack = new Stack();
stack.push("Misha");
stack.push("Oleg");
stack.push("Oleksandr");

console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Stack after pop:", stack.toString());
stack.push("Dmytro");
console.log("Count:", stack.count());
// stack.clear();
console.log("Stack after clear:", stack.toString());
