// Функція для створення матриці заданої довжини
function createMatrix(rows, columns, minValue, maxValue) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const value =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}

// Функція для виведення матриці у вказаному форматі
function printMatrix(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  let header = "    ";
  for (let j = 0; j < numCols; j++) {
    header += `стовпець ${j + 1}     `;
  }
  console.log(header);

  for (let i = 0; i < numRows; i++) {
    let rowStr = `рядок ${i + 1}  `;
    for (let j = 0; j < numCols; j++) {
      rowStr += `${matrix[i][j]}              `;
    }
    console.log(rowStr);
  }
}
// Функція для циклічного зсуву матриці на k позицій вправо та на k догори
function cyclicShift(matrix, k) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const shiftedMatrix = new Array(rows);

  for (let i = 0; i < rows; i++) {
    const newRow = (i - k + rows) % rows;
    shiftedMatrix[newRow] = new Array(cols);

    for (let j = 0; j < cols; j++) {
      const newCol = (j - k + cols) % cols;
      shiftedMatrix[newRow][newCol] = matrix[i][j];
    }
  }

  return shiftedMatrix;
}

// Функція для знаходження суми елементів матриці, розміщених після третього елементу кожного рядка
function sumAfterThirdElement(matrix) {
  const sums = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 3; j < matrix[i].length; j++) {
      sum += matrix[i][j];
    }
    sums.push(sum);
  }
  return sums;
}

// Функція для віднімання від елементів кожного рядка матриці середнього арифметичного рядка
function subtractRowAverage(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    let sum = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
    }
    const average = sum / matrix[i].length;

    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j] - Math.round(average));
    }
    result.push(row);
  }
  return result;
}

// Функція для знаходження максимальних елементів у матриці та видалення відповідних рядків та стовпців
function removeWithMax(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const maxValues = new Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    maxValues[i] = Math.max(...matrix[i]);
  }

  let maxIndex = 0;
  for (let i = 1; i < maxValues.length; i++) {
    if (maxValues[i] > maxValues[maxIndex]) {
      maxIndex = i;
    }
  }

  matrix.splice(maxIndex, 1);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(maxIndex, 1);
  }

  return matrix;
}

// Функція для знаходження мінімального та максимального елементів у кожному стовпці та обміну їх
function swapWithMinAndMax(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let col = 0; col < numCols; col++) {
    let minVal = matrix[0][col];
    let maxVal = matrix[0][col];
    let minIndex = 0;
    let maxIndex = 0;

    for (let row = 1; row < numRows; row++) {
      if (matrix[row][col] < minVal) {
        minVal = matrix[row][col];
        minIndex = row;
      }
      if (matrix[row][col] > maxVal) {
        maxVal = matrix[row][col];
        maxIndex = row;
      }
    }

    const temp = matrix[minIndex][col];
    matrix[minIndex][col] = matrix[maxIndex][col];
    matrix[maxIndex][col] = temp;
  }

  return matrix;
}

// Функція для знаходження максимального значення в матриці та видалення рядку та стовпця, де воно знаходиться
function swapWithMinAndMax(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let col = 0; col < numCols; col++) {
    let minVal = matrix[0][col];
    let maxVal = matrix[0][col];
    let minIndex = 0;
    let maxIndex = 0;

    for (let row = 1; row < numRows; row++) {
      const currentVal = matrix[row][col];
      if (currentVal < minVal) {
        minVal = currentVal;
        minIndex = row;
      }
      if (currentVal > maxVal) {
        maxVal = currentVal;
        maxIndex = row;
      }
    }

    const temp = matrix[minIndex][col];
    matrix[minIndex][col] = matrix[maxIndex][col];
    matrix[maxIndex][col] = temp;
  }

  return matrix;
}

// Функція для видалення рядків та стовпців, що містять багато максимумів
function removeWithMultipleMaxValues(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const maxCountsInRows = new Array(numRows).fill(0);
  const maxCountsInCols = new Array(numCols).fill(0);

  // Знаходимо кількість максимальних значень в кожному рядку та стовпці
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const value = matrix[i][j];
      if (value === Math.max(...matrix[i])) {
        maxCountsInRows[i]++;
      }
      if (value === Math.max(...matrix.map((row) => row[j]))) {
        maxCountsInCols[j]++;
      }
    }
  }

  // Знаходимо максимальну кількість максимальних значень в рядках та стовпцях
  const maxCountInRows = Math.max(...maxCountsInRows);
  const maxCountInCols = Math.max(...maxCountsInCols);

  // Створюємо нову матрицю без рядків та стовпців з максимальною кількістю максимальних значень
  const newMatrix = [];
  for (let i = 0; i < numRows; i++) {
    if (maxCountsInRows[i] < maxCountInRows) {
      const newRow = [];
      for (let j = 0; j < numCols; j++) {
        if (maxCountsInCols[j] < maxCountInCols) {
          newRow.push(matrix[i][j]);
        }
      }
      newMatrix.push(newRow);
    }
  }

  return newMatrix;
}

// Функція для обміну рядка та стовпця з максимумом і мінімумом
function swapWithMaxAndMin(matrix) {
  let maxVal = -Infinity;
  let maxRow, maxCol;
  let minVal = Infinity;
  let minRow, minCol;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] > maxVal) {
        maxVal = matrix[i][j];
        maxRow = i;
        maxCol = j;
      }
      if (matrix[i][j] < minVal) {
        minVal = matrix[i][j];
        minRow = i;
        minCol = j;
      }
    }
  }

  const tempRow = matrix[maxRow].slice();
  matrix[maxRow] = matrix[minRow].slice();
  matrix[minRow] = tempRow;

  for (let i = 0; i < matrix.length; i++) {
    const temp = matrix[i][maxCol];
    matrix[i][maxCol] = matrix[i][minCol];
    matrix[i][minCol] = temp;
  }

  return matrix;
}

// Використання функцій
const rows = 4;
const columns = 5;
const minValue = 0;
const maxValue = 10;
const matrix = createMatrix(rows, columns, minValue, maxValue);
console.log("Початкова матриця:");
printMatrix(matrix);

const k = 2;

// Завдання 1

// const shiftedMatrix = cyclicShift(matrix, k);
// console.log("Матриця після циклічного зсуву:");
// printMatrix(shiftedMatrix);

// Завдання 2

// const sums = sumAfterThirdElement(matrix);
// console.log("Суми елементів після третього в кожному рядку:");
// console.log(sums);

// Завдання 3

// const subtractedMatrix = subtractRowAverage(matrix);
// console.log("Матриця після віднімання середнього арифметичного рядка:");
// printMatrix(subtractedMatrix);

// Завдання 4

// const matrixWithoutMax = removeWithMax(matrix);
// console.log("Матриця без рядків та стовпців із максимальними елементами:");
// printMatrix(matrixWithoutMax);

// Завдання 5

// const matrixWithSwappedColumns = swapWithMinAndMax(matrix);
// console.log(
//   "Матриця з поміняними стовпцями з мінімальним і максимальними елементами:"
// );
// printMatrix(matrixWithSwappedColumns);

// Завдання 6

// const matrixWithoutMaxValue = removeWithMaxValue(matrix);
// console.log("Матриця без рядка та стовпця з максимальним значенням:");
// printMatrix(matrixWithoutMaxValue);

// Завдання 7

// const matrixWithoutMultipleMaxValues = removeWithMultipleMaxValues(matrix);
// console.log(
//   "Матриця без рядків та стовпців з багатьма максимальними елементами:"
// );
// printMatrix(matrixWithoutMultipleMaxValues);

// Завдання 8

const matrixWithSwappedMaxAndMin = swapWithMaxAndMin(matrix);
console.log(
  "Матриця з поміняними рядком і стовпцем з максимальним і мінімальним значеннями:"
);
printMatrix(matrixWithSwappedMaxAndMin);
