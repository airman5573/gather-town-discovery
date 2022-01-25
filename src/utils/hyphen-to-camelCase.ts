export const hyphenToCamelCase = (str: string) =>
  str.replace(/-./g, (m) => m[1].toUpperCase());
