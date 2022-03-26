const isArrayInArray = (arr, item) => {
  const itemAsString = JSON.stringify(item);

  const contains = arr.some((ele) => JSON.stringify(ele) === itemAsString);
  return contains;
};

const clearDisplay = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export { isArrayInArray, clearDisplay };
