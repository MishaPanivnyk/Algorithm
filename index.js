// Метод для генерування масиву заданої довжини в заданому діапазоні
function generateArray(length, min, max) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randomValue = Math.floor(Math.random() * (max - min)) + min;
    arr.push(`елемент_${i + 1}_значення_${randomValue}`);
  }
  return arr;
}

// Метод для виведення елементів масиву у вказаному форматі
function printArray(arr) {
  const formattedArray = arr.map((element, index) => `[${element}]`);
  return formattedArray.join(", ");
}

// Порахувати кількість та суму парних елементів масиву, що знаходяться в заданому діапазоні.
function countAndSumEvenNumbers(arr, min, max) {
  let count = 0;
  let sum = 0;

  for (const element of arr) {
    const value = parseInt(element.split("_").pop(), 10);
    if (value >= min && value <= max && value % 2 === 0) {
      count++;
      sum += value;
    }
  }

  return { count, sum };
}

// середнє арифметичне елементів масиву та кількість елементів
function calculateAverage(arr) {
  let sum = 0;
  const values = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const val = parseInt(element.split("_").pop(), 10);
    sum += val;
    values.push(val);
  }

  const average = sum / values.length;
  const countAboveAverage = values.filter((val) => val > average).length;

  return { average, countAboveAverage };
}

// Утворити третій масив як попарну суму елементів двох масивів однакової довжини.
function createSumArray(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Масиви мають бути однакової довжини");
  }

  const sumArray = [];
  for (let i = 0; i < arr1.length; i++) {
    const value1 = parseInt(arr1[i].split("_").pop(), 10);
    const value2 = parseInt(arr2[i].split("_").pop(), 10);
    sumArray.push(value1 + value2);
  }

  return sumArray;
}

// Утворити третій масив як конкатенацію двох масивів різної довжини.
function concatenateArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

// В масиві поміняти місцями максимум та мінімум.
function swapMinMax(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const maxIndex = arr.indexOf(Math.max(...arr));
  const minIndex = arr.indexOf(Math.min(...arr));
  const temp = arr[maxIndex];
  arr[maxIndex] = arr[minIndex];
  arr[minIndex] = temp;

  return arr;
}

// Масив поділити на два масиви: з додатніх та від’ємних елементів.
function splitArrayBySign(arr) {
  const positiveArray = arr.filter((element) => {
    const value = parseInt(element.split("_").pop(), 10);
    return value > 0;
  });

  const negativeArray = arr.filter((element) => {
    const value = parseInt(element.split("_").pop(), 10);
    return value < 0;
  });

  return { positiveArray, negativeArray };
}

// З масиву видалити дублікати максимума та мінімума.
function removeDuplicates(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return arr.filter((element) => {
    const value = parseInt(element.split("_").pop(), 10);
    return value !== max && value !== min;
  });
}

// Визначити середні арифметичні двох масивів. Утворити третій масив з
// елементів обидвох масивів, що знаходяться в межах між значеннями
// середніх арифметичних.
function calculateAverageThirdArray(arr1, arr2) {
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < arr1.length; i++) {
    const value = parseInt(arr1[i].split("_").pop(), 10);
    sum1 += value;
  }

  for (let i = 0; i < arr2.length; i++) {
    const value = parseInt(arr2[i].split("_").pop(), 10);
    sum2 += value;
  }

  const average1 = sum1 / arr1.length;
  const average2 = sum2 / arr2.length;
  const thirdArray = [];

  for (let i = 0; i < arr1.length; i++) {
    const value = parseInt(arr1[i].split("_").pop(), 10);
    if (value >= average1 && value <= average2) {
      thirdArray.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    const value = parseInt(arr2[i].split("_").pop(), 10);
    if (value >= average1 && value <= average2) {
      thirdArray.push(arr2[i]);
    }
  }
  return thirdArray;
}
const arr1 = generateArray(3, -100, 100);
const arr2 = generateArray(3, -50, 50);

console.log("Масив 1:", printArray(arr1));
console.log("Масив 2:", printArray(arr2));
// const countAndSum = countAndSumEvenNumbers(arr1, -50, 50);
// console.log(
//   `Кількість парних елементів в діапазоні: ${countAndSum.count}, Сума: ${countAndSum.sum}`
// );

const averageAndCountAboveAverage = calculateAverage(arr1);
console.log(
  `Середнє арифметичне: ${averageAndCountAboveAverage.average}, Кількість елементів більших за середнє: ${averageAndCountAboveAverage.countAboveAverage}`
);

// const sumArray = createSumArray(arr1, arr2);
// console.log("Масив з попарною сумою елементів двох масивів:", sumArray);

const concatenatedArray = concatenateArrays(arr1, arr2);
console.log("Конкатенований масив:", printArray(concatenatedArray));

// console.log(
//   "Масив після обміну місцями максимума та мінімума:",
//   printArray(swapMinMax([...arr1]))
// );

// const { positiveArray, negativeArray } = splitArrayBySign(arr1);
// console.log("Масив додатніх елементів:", printArray(positiveArray));
// console.log("Масив від'ємних елементів:", printArray(negativeArray));

// console.log(
//   "Масив після видалення дублікатів максимума та мінімума:",
//   printArray(removeDuplicates([...arr1]))
// );

const thirdArray = calculateAverageThirdArray(arr1, arr2);
console.log("Третій масив:", printArray(thirdArray));
