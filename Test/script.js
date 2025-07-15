function capitalize(str) {
    // Title case
    return str[0].toUpperCase() + str.substring(1);
}

function reverseString(str) {
    // reverse string 
    return str.split("").reverse().join("");
}

class Calculator {

    add(a, b){
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    divide(a, b) {
        return a / b;
    }

    multiply(a, b) {
        return a * b;
    }

}

function caesarCipher(str, shift) {
  return str
    .split("")
    .map((char) => {
      // Check if character is a letter
      if (char.match(/[a-zA-Z]/)) {
        // Get the ASCII code
        const code = char.charCodeAt(0);

        // Determine if uppercase or lowercase
        const base = code >= 65 && code <= 90 ? 65 : 97; // A=65, a=97

        // Apply shift with wrapping (modulo 26)
        const shiftedCode = ((((code - base + shift) % 26) + 26) % 26) + base;

        return String.fromCharCode(shiftedCode);
      }

      // Return non-letter characters unchanged
      return char;
    })
    .join("");
}

function analyzeArray(arr) {
    let sum = 0, min = Infinity, max = -Infinity, length = arr.length;

    sum = arr.reduce((acc, num) => {
      min = Math.min(min, num);
      max = Math.max(max, num);
      return acc + num; 
    }, 0);
    const average = sum / length;
    return { average, min, max, length };
}

module.exports = { capitalize, reverseString, Calculator, caesarCipher, analyzeArray };