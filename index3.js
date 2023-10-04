// Функція для створення матриці заданої довжини зі значеннями в заданому діапазоні
function createMatrix(rows, cols, minValue, maxValue) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const randomValue =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      row.push(randomValue);
    }
    matrix.push(row);
  }
  return matrix;
}

// Функція для виведення матриці у вказаному форматі
function printMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Виведення заголовка стовпців
  const header = [];
  for (let j = 0; j < cols; j++) {
    header.push(`    стовпець ${j + 1}`);
  }
  console.log(header.join("\t"));

  // Виведення рядків матриці
  for (let i = 0; i < rows; i++) {
    const rowValues = matrix[i].map((value) => String(value));
    const rowString = `рядок ${i + 1}\t       ${rowValues.join("\t")}`;
    console.log(rowString);
  }
}

// Приклад використання:
// const rows = 3;
// const cols = 2;
// const minValue = -10;
// const maxValue = 10;

// const matrix = createMatrix(rows, cols, minValue, maxValue);
// printMatrix(matrix);

function cyclicShiftMatrix(matrix, k) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Зсув вправо
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const newIndex = (j + k) % cols;
      matrix[i][newIndex] = matrix[i][j];
    }
  }

  // Заповнення порожніх місць нулями
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (j < k) {
        matrix[i][j] = 0;
      }
    }
  }

  // Зсув вгору
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const newIndex = (i + k) % rows;
      matrix[newIndex][j] = matrix[i][j];
    }
  }

  // Заповнення порожніх місць нулями
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i < k) {
        matrix[i][j] = 0;
      }
    }
  }
}

function sumElementsAfterThird(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let sum = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 3; j < cols; j++) {
      // Починаємо з індексу 3 (четвертий елемент)
      sum += matrix[i][j];
    }
  }

  return sum;
}

function subtractRowMeans(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let i = 0; i < rows; i++) {
    const rowSum = matrix[i].reduce((acc, value) => acc + value, 0);
    const rowMean = rowSum / cols;

    for (let j = 0; j < cols; j++) {
      matrix[i][j] -= rowMean;
    }
  }
}

function findAndRemoveMaxElements(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Знаходження максимальних елементів у кожному стовпці
  const maxInCols = Array(cols).fill(Number.MIN_SAFE_INTEGER);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] > maxInCols[j]) {
        maxInCols[j] = matrix[i][j];
      }
    }
  }

  // Знаходження максимальних елементів у кожному рядку
  const maxInRows = matrix.map((row) => Math.max(...row));

  // Видалення рядків, які містять максимальні елементи
  for (let i = rows - 1; i >= 0; i--) {
    if (maxInRows[i] === Math.max(...maxInCols)) {
      matrix.splice(i, 1);
    }
  }

  // Видалення стовпців, які містять максимальні елементи
  const colsToDelete = maxInCols.reduce((acc, max, index) => {
    if (max === Math.max(...maxInCols)) {
      acc.push(index);
    }
    return acc;
  }, []);

  for (let i = colsToDelete.length - 1; i >= 0; i--) {
    for (let j = 0; j < matrix.length; j++) {
      matrix[j].splice(colsToDelete[i], 1);
    }
  }
}

const rows = 3;
const cols = 3;
const minValue = 10;
const maxValue = 100;
const k = 2; // Кількість позицій для зсуву

const matrix = createMatrix(rows, cols, minValue, maxValue);
console.log("Початкова матриця:");
printMatrix(matrix);

// cyclicShiftMatrix(matrix, k);
// console.log("Матриця після циклічного зсуву:");
// printMatrix(matrix);

const sum = sumElementsAfterThird(matrix);
console.log("Сума елементів після третього в кожному рядку:", sum);

// subtractRowMeans(matrix);
// console.log(
//   "Матриця після віднімання середнього арифметичного від кожного рядка:"
// );
// printMatrix(matrix);

findAndRemoveMaxElements(matrix);
console.log(
  "Матриця після видалення рядків та стовпців, що містять максимальні елементи:"
);
printMatrix(matrix);
