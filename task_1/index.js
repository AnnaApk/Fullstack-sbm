import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const decoded = encoded.map((el) => {
  for (let key in el) {
    if (
      key == "groupId" ||
      key == "service" ||
      key == "formatSize" ||
      key == "ca"
    ) { } else {
      const letter = el[key];
      if (translations[letter] !== undefined) {
        el[key] = translations[letter];
      }
    }
  }
  return el;
});

console.log(decoded)
