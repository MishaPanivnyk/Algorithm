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
function LargestSorting(arr) {
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
function LargestComparison(arr) {
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
function LargestReplace(arr) {
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
function QuickSelect(arr) {
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
    "| Розмір вхідних даних | Спосіб 1 (Сортування)                       | Спосіб 2 (Масив)                  | Спосіб 3 (Максимальні елементи)            | Спосіб 4 (QuickSelect)|"
  );
  console.log(
    "|----------------------|------------------------------------------------------|------------------------------------------------|-----------------------------------------------------------------|"
  );

  data.forEach((row) => {
    console.log(
      `| ${row.size}         | ${row.method1} мс (${row.method1_1}, ${row.method1_2}, ${row.method1_3})               | ${row.method2} мс (${row.method2_1}, ${row.method2_2}, ${row.method2_3})           | ${row.method3} мс (${row.method3_1}, ${row.method3_2}, ${row.method3_3})                       | ${row.method4} мс (${row.method4_1}, ${row.method4_2}, ${row.method4_3})|`
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
    sortingTime.push(measureTime(LargestSorting, randomArray));
    comparisonTime.push(measureTime(LargestComparison, randomArray));
    replaceTime.push(measureTime(LargestReplace, randomArray));
    quickSelectTime.push(measureTime(QuickSelect, randomArray));
  }

  // Обчислення середнього часу та часів для кожного методу
  let sumSortingTime = 0;
  let method1_1 = sortingTime[0];
  let method1_2 = sortingTime[1];
  let method1_3 = sortingTime[2];
  for (let i = 0; i < sortingTime.length; i++) {
    sumSortingTime += sortingTime[i];
    method1_1 = Math.min(method1_1, sortingTime[i]);
    method1_2 = Math.max(method1_2, sortingTime[i]);
  }
  const averageSortingTime = sumSortingTime / sortingTime.length;

  let sumComparisonTime = 0;
  let method2_1 = comparisonTime[0];
  let method2_2 = comparisonTime[1];
  let method2_3 = comparisonTime[2];
  for (let i = 0; i < comparisonTime.length; i++) {
    sumComparisonTime += comparisonTime[i];
    method2_1 = Math.min(method2_1, comparisonTime[i]);
    method2_2 = Math.max(method2_2, comparisonTime[i]);
  }
  const averageComparisonTime = sumComparisonTime / comparisonTime.length;

  let sumReplaceTime = 0;
  let method3_1 = replaceTime[0];
  let method3_2 = replaceTime[1];
  let method3_3 = replaceTime[2];
  for (let i = 0; i < replaceTime.length; i++) {
    sumReplaceTime += replaceTime[i];
    method3_1 = Math.min(method3_1, replaceTime[i]);
    method3_2 = Math.max(method3_2, replaceTime[i]);
  }
  const averageReplaceTime = sumReplaceTime / replaceTime.length;

  let sumQuickSelectTime = 0;
  let method4_1 = quickSelectTime[0];
  let method4_2 = quickSelectTime[1];
  let method4_3 = quickSelectTime[2];
  for (let i = 0; i < quickSelectTime.length; i++) {
    sumQuickSelectTime += quickSelectTime[i];
    method4_1 = Math.min(method4_1, quickSelectTime[i]);
    method4_2 = Math.max(method4_2, quickSelectTime[i]);
  }
  const averageQuickSelectTime = sumQuickSelectTime / quickSelectTime.length;

  // Додавання результатів до масиву
  resultData.push({
    size,
    method1: averageSortingTime.toFixed(2),
    method1_1: method1_1.toFixed(2),
    method1_2: method1_2.toFixed(2),
    method1_3: method1_3.toFixed(2),
    method2: averageComparisonTime.toFixed(2),
    method2_1: method2_1.toFixed(2),
    method2_2: method2_2.toFixed(2),
    method2_3: method2_3.toFixed(2),
    method3: averageReplaceTime.toFixed(2),
    method3_1: method3_1.toFixed(2),
    method3_2: method3_2.toFixed(2),
    method3_3: method3_3.toFixed(2),
    method4: averageQuickSelectTime.toFixed(2),
    method4_1: method4_1.toFixed(2),
    method4_2: method4_2.toFixed(2),
    method4_3: method4_3.toFixed(2),
  });
});

// Виведення результатів у вигляді таблиці
printTable(resultData);
