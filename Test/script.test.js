const {
  capitalize,
  reverseString,
  Calculator,
  caesarCipher,
  analyzeArray,
} = require("./script.js");

test("Test case 1: Title case check by calling capitalize()", () => {
  expect(capitalize("hello World!")).toBe("Hello World!");
});

test("Test case 2: Reverse string check by calling reverseString()", () => {
  expect(reverseString("Hello World!")).toBe("!dlroW olleH");
});


test("Test case 3: Calculator operations", () => {
    const calculator = new Calculator();
    expect(calculator.add(4, 2)).toBe(6);
    expect(calculator.subtract(4, 2)).toBe(2);
    expect(calculator.divide(4, 2)).toBe(2);
    expect(calculator.multiply(4, 2)).toBe(8);
});

test("Test case 4: Caesar Cipher()", () => {
  expect(caesarCipher("Hello World!", 3)).toBe("Khoor Zruog!");
});
  
test("Test case 5: Analyze Array()", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});