// Функція для генерації масиву випадкових чисел
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

// Алгоритм для знаходження 6 найбільших елементів через сортування
function findSixLargestSorting(arr) {
  const result = [];

  for (let i = 0; i < Math.min(arr.length, 6); i++) {
    let maxIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[maxIndex];
    arr[maxIndex] = temp;

    result.push(arr[i]);
  }

  return result;
}

// Алгоритм для пошуку 6 найбільших елементів через порівняння
function findSixLargestComparison(arr) {
  const largestSix = arr.slice(0, 6);

  for (let i = 6; i < arr.length; i++) {
    let current = arr[i];
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

// Алгоритм для пошуку 6 найбільших елементів заміною найменших
function findSixLargestReplace(arr) {
  let largestSix = [];
  for (let i = 0; i < 6; i++) {
    let maxIndex = 0;
    let max = arr[maxIndex];
    for (let j = 1; j < arr.length; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIndex = j;
      }
    }
    largestSix.push(max);
    arr[maxIndex] = -10001; // Заміна знайденого максимуму на мінімальне можливе
  }
  return largestSix;
}
// ДУЖЕ ДУЖЕ ШВИДКИЙ код
function findSixLargestQuickSelect(arr) {
  const largestSix = Array(6).fill(-Infinity);

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (current > largestSix[5]) {
      let j = 5;

      // Знаходимо місце для вставки елемента
      while (j >= 0 && current > largestSix[j]) {
        largestSix[j + 1] = largestSix[j];
        j--;
      }

      // Вставка елемента
      largestSix[j + 1] = current;
    }
  }

  return largestSix;
}
// Функція для вимірювання часу виконання
function measureTime(func, arr) {
  const start = new Date().getTime();
  func(arr);
  const end = new Date().getTime();
  return end - start;
}

// Тестування для різних розмірів вхідних даних
const inputSizes = [10000, 100000, 1000000, 10000000, 100000000];

// Функція для виведення даних у вигляді таблиці
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

// Замінюємо фрагмент коду для виведення результатів
const resultData = [];

inputSizes.forEach((size) => {
  const randomArray = generateRandomArray(size);

  const sortingTime = [];
  const comparisonTime = [];
  const replaceTime = [];
  const quickSelectTime = [];

  // Проведення тестування для кожного методу 3 рази
  for (let i = 0; i < 3; i++) {
    sortingTime.push(measureTime(findSixLargestSorting, randomArray.slice()));
    comparisonTime.push(
      measureTime(findSixLargestComparison, randomArray.slice())
    );
    replaceTime.push(measureTime(findSixLargestReplace, randomArray.slice()));
    quickSelectTime.push(
      measureTime(findSixLargestQuickSelect, randomArray.slice())
    );
  }

  // Обчислення середнього часу виконання для кожного методу
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

  // Додавання результатів нового алгоритму в масив
  resultData.push({
    size,
    method1: averageSortingTime.toFixed(2),
    method2: averageComparisonTime.toFixed(2),
    method3: averageReplaceTime.toFixed(2),
    method4: averageQuickSelectTime.toFixed(2),
  });
  //   console.log(`Для розміру вхідних даних ${size}:`);
  //   console.log(`Середній час сортування: ${averageSortingTime} мс`);
  //   console.log(`Середній час порівняння: ${averageComparisonTime} мс`);
  //   console.log(`Середній час заміни: ${averageReplaceTime} мс`);
  //   console.log("---------------------------");
});

// Виведення таблиці з результатами
printTable(resultData);
