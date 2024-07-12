import { getMonthDays, getMonthStart } from './tasks.calculator';

describe('getMonthDays', () => {
  it('should return the number of days in a month', () => {
    expect(getMonthDays(2022, 0)).toBe(31); // January 2022 has 31 days
    expect(getMonthDays(2022, 1)).toBe(28); // February 2022 has 28 days
    expect(getMonthDays(2022, 11)).toBe(31); // December 2022 has 31 days
  });
});

describe('getMonthStart', () => {
  it('should return the day of the week for the start of a month', () => {
    expect(getMonthStart(2022, 0)).toBe(6); // January 2022 starts on a Friday (0 is Sunday, 6 is Saturday)
    expect(getMonthStart(2022, 1)).toBe(2); // February 2022 starts on a Tuesday
    expect(getMonthStart(2022, 11)).toBe(4); // December 2022 starts on a Thursday
  });
});

