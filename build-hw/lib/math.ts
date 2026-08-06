import add from "lodash/add";

export const sum = (a: number, b: number): number => {
  return add(a, b);
};

export const square = (n: number): number => {
  return n * n;
};
