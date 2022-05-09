export const solutions = [
  {
    explanation:
      'Hemos creado un nuevo fichero <strong>help.test.js</strong> <strong>con un primer tests en rojo</strong>',
    code: `
    // Creating a failed test
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
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
      expect(isLeapYear(1999)).toBe(false);
    });

    // Creating a minum code that passes the test
    function isLeapYear() {
      return false;
    }
  `,
  },
  {
    explanation: 'Hemos añadido un <strong>nuevo test en rojo</strong>',
    code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
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
      'Modificamos el código de producción para que se ponga<strong>el nuevo test en verde</strong>',
    code: `
    test('Should not be a leap year if year is not divisible by 4', () => {
      expect(isLeapYear(1999)).toBe(false);
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
