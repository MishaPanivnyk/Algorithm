function quickSort(arr, ascending) {
  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      if ((ascending && arr[j] <= pivot) || (!ascending && arr[j] >= pivot)) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  }

  function sort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      sort(arr, low, pi - 1);
      sort(arr, pi + 1, high);
    }
  }

  const low = 0;
  const high = arr.length - 1;
  sort(arr, low, high);

  return arr;
}

const arr = [5, 2, 9, 3, 6, 1, 8];
const sortedArr = quickSort(arr, false);
console.log(sortedArr);
