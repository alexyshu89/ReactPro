import capitalize from "lodash/capitalize";

export const capitalizeText = (text: string): string => {
  return capitalize(text);
};

export const reverseString = (text: string): string => {
  return text.split("").reverse().join("");
};
