export const solution = [
  `
    // Creating a failed test
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
    })

    function isLeapYear() {
      return null;
    }
  `,
  `
    // Creating a minum code that passes the test
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
    });

    function isLeapYear() {
      return false;
    }
  `,
  `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
    });

    // Adding new failed tests
    test('Should be a leap year if year is divisible by 4', () => {
      expect(isLeapYear(1996)).toBe(false);
    });

    function isLeapYear() {
      return false;
    }
  `,
  `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
    });

    test('Should be a leap year if year is divisible by 4', () => {
      expect(isLeapYear(1996)).toBe(false);
    });

    // Modified the code to pass the test
    function isLeapYear() {
      return year % 4 === 0;
    }
  `,
];
