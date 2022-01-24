export function hyphenToUnderscoreTransformer(value): string {
  return value.replace(/-/g, '_');
}
