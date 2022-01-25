export const camelCaseToUnder_score = (str: string) =>
  str.replace(/([A-Z])/g, '_$1').toLowerCase();
