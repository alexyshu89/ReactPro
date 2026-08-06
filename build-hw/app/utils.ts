export function usedFunction(): string {
  return "Эта функция используется и попадет в бандл!";
}

export function unusedFunction(): string {
  return "Эта функция не используется и будет удалена с помощью Tree Shaking!";
}
