// Elements
const passwordResult = document.getElementById("result");
const passwordLength = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowerCaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

// Generator Functions
const generateLowerCase = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const generateUpperCase = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const generateNumber = function () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const generateSymbols = function () {
  const symbols = "!@#$%^&*{}()[]<>";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatorFuncs = {
  lower: generateLowerCase,
  upper: generateUpperCase,
  number: generateNumber,
  symbol: generateSymbols,
};

const generatePassword = function (lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const generators = lower + upper + number + symbol;

  const generatorArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (gen) => Object.values(gen)[0]
  );

  if (generators === 0) return;

  for (let i = 0; i < length; i += generators) {
    generatorArr.forEach((gen) => {
      const funcName = Object.keys(gen)[0];
      console.log(funcName);

      generatedPassword += generatorFuncs[funcName]();
    });
  }
  const finalResult = generatedPassword.slice(0, length);
  return finalResult;
};

generateBtn.addEventListener("click", function () {
  const length = +passwordLength.value;
  const isLower = lowerCaseEl.checked;
  const isUpper = uppercaseEl.checked;
  const isNumber = numbersEl.checked;
  const isSymbol = symbolsEl.checked;
  passwordResult.innerText = generatePassword(
    isLower,
    isUpper,
    isNumber,
    isSymbol,
    length
  );
});

copyBtn.addEventListener("click", function () {
  const textArea = document.createElement("textarea");
  const password = passwordResult.innerText;

  if (!password) return;

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password Copied");
});
