export const getUniqId = (prefix = "_") =>
  prefix + Math.random().toString(36).substring(7);

export const areArraysEqual = (arr1, arr2) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);
