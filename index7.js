class Queue {
  constructor() {
    this.items = [];
  }

  // Додавання нового елемента до черги
  enqueue(item) {
    this.items.push(item);
  }

  // Повертає кількість елементів у черзі
  size() {
    return this.items.length;
  }

  // Видаляє та повертає перший елемент черги (FIFO)
  dequeue() {
    if (this.items.length === 0) {
      return null; // Черга пуста
    }
    return this.items.shift();
  }

  // Перевіряє, чи черга порожня
  isEmpty() {
    return this.items.length === 0;
  }

  // Виводить всі елементи черги
  print() {
    console.log(this.items);
  }
}

// Приклад використання
const myQueue = new Queue();

myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);

console.log("Кількість елементів у черзі: " + myQueue.size());

console.log("Перший елемент черги: " + myQueue.dequeue());

myQueue.print();
