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

function findSixLargestSorting(arr) {
  if (arr.length <= 6) {
    return arr;
  }

  const largestSix = [];
  for (let i = 0; i < 6; i++) {
    let maxIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    largestSix.push(arr[i]);
  }

  return largestSix;
}

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

function findSixLargestReplace(arr) {
  for (let i = 0; i < 6; i++) {
    let maxIndex = i;
    let max = arr[maxIndex];
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIndex = j;
      }
    }
    [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
  }

  return arr.slice(0, 6);
}

function findSixLargestQuickSelect(arr) {
  const largestSix = Array(6).fill(-Infinity);

  for (let i = 0; i < arr.length; i++) {
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

function measureTime(func, arr) {
  const start = Date.now();
  func(arr);
  const end = Date.now();
  return end - start;
}

const inputSizes = [10000, 100000, 1000000, 10000000, 100000000];

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

const resultData = [];

inputSizes.forEach((size) => {
  const randomArray = generateRandomArray(size);

  const sortingTime = [];
  const comparisonTime = [];
  const replaceTime = [];
  const quickSelectTime = [];

  for (let i = 0; i < 3; i++) {
    sortingTime.push(measureTime(findSixLargestSorting, randomArray));
    comparisonTime.push(measureTime(findSixLargestComparison, randomArray));
    replaceTime.push(measureTime(findSixLargestReplace, randomArray));
    quickSelectTime.push(measureTime(findSixLargestQuickSelect, randomArray));
  }

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

  resultData.push({
    size,
    method1: averageSortingTime.toFixed(2),
    method2: averageComparisonTime.toFixed(2),
    method3: averageReplaceTime.toFixed(2),
    method4: averageQuickSelectTime.toFixed(2),
  });
});

printTable(resultData);
