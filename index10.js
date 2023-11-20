// Генерація випадкового масиву заданого розміру
function generateRandomArray(size) {
  const min = -10000;
  const max = 10000;
  const randomArray = [];

  for (let i = 0; i < size; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNum);
  }

  return randomArray;
}

// Спосіб 1: Сортування для знаходження шести найбільших елементів
function findSixLargestSorting(arr) {
  return arr.sort((a, b) => b - a).slice(0, 6);
}

// Спосіб 2: Запам'ятовування 6 найбільших елементів
function findSixLargestMemoization(arr) {
  const largestSix = arr.slice(0, 6).sort((a, b) => b - a);

  for (let i = 6; i < arr.length; i++) {
    const current = arr[i];

    if (current > largestSix[5]) {
      let j = 5;
      while (j >= 0 && current > largestSix[j]) {
        largestSix[j + 1] = largestSix[j];
        j--;
      }
      largestSix[j + 1] = current;
    }
  }

  return largestSix;
}

// Спосіб 3: Знаходження 6 найбільших елементів 6 разів
function findSixLargestSixTimes(arr) {
  const largestSix = [];

  for (let k = 0; k < 6; k++) {
    let maxIndex = 0;
    let max = arr[maxIndex];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        maxIndex = i;
      }
    }

    largestSix.push(max);
    arr[maxIndex] = -10001; // Встановлюємо мінімальне можливе значення, щоб його не розглядати в подальших ітераціях
  }

  return largestSix;
}

function findSixLargestQuickSelect(arr) {
  const largestSix = arr.slice(0, 6).sort((a, b) => b - a);

  for (let i = 6; i < arr.length; i++) {
    let current = arr[i];

    // Використання бінарного пошуку для знаходження місця вставки нового елемента
    if (current > largestSix[5]) {
      let insertIndex = binarySearch(largestSix, current, 0, 5);

      // Зсув елементів для вставки нового елемента
      for (let j = 5; j > insertIndex; j--) {
        largestSix[j] = largestSix[j - 1];
      }

      largestSix[insertIndex] = current;
    }
  }

  return largestSix;
}

// Бінарний пошук використовується для знаходження місця вставки нового елемента
function binarySearch(arr, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}

// Функція для вимірювання часу виконання заданої функції на заданому масиві
function measureTime(func, arr) {
  const start = Date.now();
  func(arr);
  const end = Date.now();
  return end - start;
}

// Розміри вхідних даних для вимірювань часу
const inputSizes = [10000, 100000, 1000000, 10000000, 100000000];

// Масив для зберігання результатів вимірювань
const resultData = [];

// Проведення вимірювань для кожного розміру вхідних даних
inputSizes.forEach((size) => {
  const randomArray = generateRandomArray(size);

  const sortingTime = measureTime(findSixLargestSorting, randomArray);
  const memoizationTime = measureTime(findSixLargestMemoization, randomArray);
  const sixTimesTime = measureTime(findSixLargestSixTimes, randomArray);
  const quickSelectTime = measureTime(findSixLargestQuickSelect, randomArray);

  resultData.push({
    size,
    sortingTime,
    memoizationTime,
    sixTimesTime,
    quickSelectTime,
  });
});

// Виведення результатів у вигляді таблиці
console.log(
  "| Розмір вхідних даних | Спосіб 1 (Сортування) | Спосіб 2 (Масив) | Спосіб 3 (Максимальні елементи) | Спосіб 4 (QuickSelect) |"
);
console.log(
  "|----------------------|------------------------|------------------|----------------------------------|------------------------|"
);

resultData.forEach((row) => {
  console.log(
    `| ${row.size}               | ${row.sortingTime} мс                   | ${row.memoizationTime} мс               | ${row.sixTimesTime} мс                       | ${row.quickSelectTime} мс                  |`
  );
});
