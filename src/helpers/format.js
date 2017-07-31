// @flow
export function currency (num: number): string {
  return `$${(num / 100).toFixed(2)}`;
}
