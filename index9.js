// Функція для генерації випадкового масиву заданого розміру
function generateRandomArray(size) {
  const min = -10000;
  const max = 10000;
  const randomArray = [];

  for (let i = 0; i < size; i++) {
    // Генерація випадкового числа у діапазоні від min до max
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNum);
  }

  return randomArray;
}

// Спосіб 1: Сортування для знаходження шести найбільших елементів
function findSixLargestSorting(arr) {
  if (arr.length <= 6) {
    return arr;
  }

  const largestSix = [];
  for (let i = 0; i < 6; i++) {
    let maxIndex = i;

    // Пошук найбільшого елемента залишкового масиву
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    // Підміна елементів для сортування
    [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    largestSix.push(arr[i]);
  }

  return largestSix;
}

// Спосіб 2: Використання порівнянь для вставки елементів у масив шести найбільших
function findSixLargestComparison(arr) {
  const largestSix = arr.slice(0, 6);

  for (let i = 6; i < arr.length; i++) {
    let current = arr[i];

    // Порівняння та вставка нового елемента у відсортований масив шести найбільших
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

// Спосіб 3: Порівняння та заміна для знаходження шести найбільших елементів
function findSixLargestReplace(arr) {
  for (let i = 0; i < 6; i++) {
    let maxIndex = i;
    let max = arr[maxIndex];

    // Пошук найбільшого елемента та його заміна
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIndex = j;
      }
    }

    // Підміна елементів для знаходження шести найбільших
    [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
  }

  return arr.slice(0, 6);
}

// Спосіб 4: QuickSelect для знаходження шести найбільших елементів
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

// Функція для виведення результатів вимірювань у вигляді таблиці
function printTable(data) {
  console.log(
    "| Розмір вхідних даних | Спосіб 1 (Сортування) | Спосіб 2 (Масив) | Спосіб 3 (Максимальні елементи) | Спосіб 4 (QuickSelect) |"
  );
  console.log(
    "|----------------------|------------------------|------------------|----------------------------------|------------------------|"
  );

  data.forEach((row) => {
    console.log(
      `| ${row.size}               | ${row.method1} мс                   | ${row.method2} мс               | ${row.method3} мс                       | ${row.method4} мс                  |`
    );
  });
}

// Масив для зберігання результатів вимірювань
const resultData = [];

// Проведення вимірювань для кожного розміру вхідних даних
inputSizes.forEach((size) => {
  const randomArray = generateRandomArray(size);

  const sortingTime = [];
  const comparisonTime = [];
  const replaceTime = [];
  const quickSelectTime = [];

  // Вимірювання часу для кожного методу три рази
  for (let i = 0; i < 3; i++) {
    sortingTime.push(measureTime(findSixLargestSorting, randomArray));
    comparisonTime.push(measureTime(findSixLargestComparison, randomArray));
    replaceTime.push(measureTime(findSixLargestReplace, randomArray));
    quickSelectTime.push(measureTime(findSixLargestQuickSelect, randomArray));
  }

  // Обчислення середнього часу для кожного методу
  let sumSortingTime = 0;
  for (let i = 0; i < sortingTime.length; i++) {
    sumSortingTime += sortingTime[i];
  }
  const averageSortingTime = sumSortingTime / sortingTime.length;

  let sumComparisonTime = 0;
  for (let i = 0; i < comparisonTime.length; i++) {
    sumComparisonTime += comparisonTime[i];
  }
  const averageComparisonTime = sumComparisonTime / comparisonTime.length;

  let sumReplaceTime = 0;
  for (let i = 0; i < replaceTime.length; i++) {
    sumReplaceTime += replaceTime[i];
  }
  const averageReplaceTime = sumReplaceTime / replaceTime.length;

  let sumQuickSelectTime = 0;
  for (let i = 0; i < quickSelectTime.length; i++) {
    sumQuickSelectTime += quickSelectTime[i];
  }
  const averageQuickSelectTime = sumQuickSelectTime / quickSelectTime.length;

  // Додавання результатів до масиву
  resultData.push({
    size,
    method1: averageSortingTime.toFixed(2),
    method2: averageComparisonTime.toFixed(2),
    method3: averageReplaceTime.toFixed(2),
    method4: averageQuickSelectTime.toFixed(2),
  });
});

// Виведення результатів у вигляді таблиці
printTable(resultData);
