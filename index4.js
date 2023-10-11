function quickSort(arr, ascending) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(Math.random() * arr.length)];

  const left = [];
  const right = [];
  const equal = [];

  for (const element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }

  if (ascending) {
    return [
      ...quickSort(left, ascending),
      ...equal,
      ...quickSort(right, ascending),
    ];
  } else {
    return [
      ...quickSort(right, ascending),
      ...equal,
      ...quickSort(left, ascending),
    ];
  }
}

// Приклад використання
const arr = [8, 2, 11, 6, 9, 5, 12, 4];
const ascendingSort = quickSort(arr.slice(), true);
const descendingSort = quickSort(arr.slice(), false);

console.log("За зростанням:", ascendingSort);
console.log("За спаданням:", descendingSort);
