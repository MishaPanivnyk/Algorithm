// Функція для генерації масиву в заданому діапазоні
function generateArray(length, min, max) {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Функція для виводу елементів масиву у вказаному форматі
function formatArray(arr) {
  return arr
    .map((value, index) => `[cell - ${index}, value - ${value}]`)
    .join(",");
}

const length = 5; // Задана довжина масиву
const minRange = 1; // Мінімальне значення
const maxRange = 20; // Максимальне значення

const generatedArray = generateArray(length, minRange, maxRange);
const formattedResult = formatArray(generatedArray);

console.log(formattedResult);

// Функція для сортування масиву методом "Bubble sort"
function bubbleSort(arr, ascending) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (
        (ascending && arr[j] > arr[j + 1]) ||
        (!ascending && arr[j] < arr[j + 1])
      ) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Функція для сортування масиву методом "Insertion sort"
function insertionSort(arr, ascending) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (
      (ascending && j >= 0 && arr[j] > key) ||
      (!ascending && j >= 0 && arr[j] < key)
    ) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Функція для сортування масиву методом "Selection sort"
function selectionSort(arr, ascending) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (
        (ascending && arr[j] < arr[minIndex]) ||
        (!ascending && arr[j] > arr[minIndex])
      ) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// Приклад використання
const unsortedArray = generateArray(10, 1, 100); // Генеруємо несортований масив

console.log("Unsorted Array:", unsortedArray);
console.log("Bubble Sort (Ascending):", bubbleSort([...unsortedArray], true));
console.log("Bubble Sort (Descending):", bubbleSort([...unsortedArray], false));
console.log(
  "Insertion Sort (Ascending):",
  insertionSort([...unsortedArray], true)
);
console.log(
  "Insertion Sort (Descending):",
  insertionSort([...unsortedArray], false)
);
console.log(
  "Selection Sort (Ascending):",
  selectionSort([...unsortedArray], true)
);
console.log(
  "Selection Sort (Descending):",
  selectionSort([...unsortedArray], false)
);
