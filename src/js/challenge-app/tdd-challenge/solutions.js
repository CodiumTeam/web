export const help = [
  {
    explanation:
      'Hemos creado un nuevo fichero <strong>help.test.js</strong> <strong>con un primer tests en rojo</strong>',
    code: `
    // Creating a failed test
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1997)).toBe(false);
    })

    function isLeapYear() {
      return null;
    }
  `,
  },
  {
    explanation:
      'Hemos añadido el código más sencillo posible para que el <strong>test se ponga en verde</strong>',
    code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1997)).toBe(false);
    });

    // Creating a minum code that passes the test
    function isLeapYear() {
      return false;
    }
  `,
  },
  {
    explanation: 'Añadimos un <strong>nuevo test en rojo</strong>',
    code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1997)).toBe(false);
    });

    // Adding new failed tests
    test('Should be a leap year if year is divisible by 4', () => {
      expect(isLeapYear(1996)).toBe(true);
    });

    function isLeapYear() {
      return false;
    }
  `,
  },
  {
    explanation:
      'Modificamos el código de producción para que se ponga <strong>el nuevo test en verde</strong>',
    code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1997)).toBe(false);
    });

    test('Should be a leap year if year is divisible by 4', () => {
      expect(isLeapYear(1996)).toBe(true);
    });

    // Modified the code to pass the test
    function isLeapYear(year) {
      return year % 4 === 0;
    }
  `,
  },
];

export const solution = {
  explanation:
    'Hemos añadido la <strong>solución</strong> de la kata en el fichero <strong>solution.test.js</strong>',
  code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1997)).toBe(false);
    })

    test('Should be a leap year if year is divisible by 4', () => {
      expect(isLeapYear(1996)).toBe(true);
    });

    test('Should be a leap year if year is divisible by 400', () => {
      expect(isLeapYear(1600)).toBe(true);
    });

    test('Should not be a leap year if year is divisible by 100 but not by 400', () => {
      expect(isLeapYear(1800)).toBe(false);
    });

    function isLeapYear(year) {
      if (isMultipleOf(year, 400)) {
        return true;
      }

      if (isMultipleOf(year, 100)) {
        return false;
      }

      return isMultipleOf(year, 4);
    }

    function isMultipleOf(year, multipleOf) {
      return year % multipleOf == 0;
    }

  `,
};
