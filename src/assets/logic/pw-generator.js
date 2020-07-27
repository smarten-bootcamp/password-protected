var pwLength;
var includeCapitalization;
var includeNumbers;
var rawSpecialChars;

promptUser();

var uniqueSpecialChars = cleanString();

var pw = generatePassword();

var userPassword = shuffleChars(pw);

alert(`Your password is ${userPassword}`);

// Method to prompt user for password requirements
function promptUser() {
  var validPwLength = false;

  // Gets input of number of chars and validates it.
  while (!validPwLength) {
    pwLength = parseInt(
      prompt(
        "How many characters would you like your password to be? (8-128 characters)"
      )
    );
    if (pwLength > 7 && pwLength < 129) {
      validPwLength = true;
    } else {
      alert(
        "Invalid input. Please enter an integer between or including 8 and 128."
      );
    }
  }

  // Retrieves whether or not the user wants capital letters, no need for validation
  includeCapitalization = confirm("Would you like to include capital letters?");

  // Retrieves whether or not the user wants numbers, no need for validation
  includeNumbers = confirm("Would you like to include numbers?");

  // Prompt retrieves special characters from the user
  rawSpecialChars = prompt(
    "Which special characters would you like to include? (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)"
  )
    .trim()
    .toLowerCase();
}

// Function to remove all non special characters, spaces and return only unique special characters
function cleanString() {
  var nonSpecialChars = "abcdefghijklmnopqrstuvwxyz1234567890 ".split("");
  var uniqueSpecialChars = [];

  for (var i = 0; i < nonSpecialChars.length; i++) {
    rawSpecialChars = rawSpecialChars.split(nonSpecialChars[i]).join("");
  }
  for (var i = 0; i < rawSpecialChars.length; i++) {
    if (!uniqueSpecialChars.includes(rawSpecialChars[i])) {
      uniqueSpecialChars.push(rawSpecialChars[i]);
    }
  }
  return uniqueSpecialChars.join("");
}

function generatePassword() {
  var lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  var upperAlphabet = "";
  var numberCharacters = "";

  if (includeCapitalization) {
    upperAlphabet = lowerAlphabet.toUpperCase();
  }
  if (includeNumbers) {
    numberCharacters = "1234567890";
  }

  var generatedPassword = getRandomChars(
    lowerAlphabet,
    upperAlphabet,
    numberCharacters
  );

  return generatedPassword;
}

// Function to retrieve the correct number of random characters for each character type
function getRandomChars(lowerAlphabet, upperAlphabet, numberCharacters) {
  var randomPassword = "";
  var index;
  var numCapitalLettersToInclude = (upperAlphabet.length = 0
    ? 0
    : Math.ceil(pwLength / 10));
  var numNumbersToInclude = (numberCharacters.length = 0
    ? 0
    : Math.ceil(pwLength / 10));
  var numSpecialCharsToInclude = uniqueSpecialChars.length;
  var numNormalLettersToInclude =
    pwLength -
    numCapitalLettersToInclude -
    numNumbersToInclude -
    numSpecialCharsToInclude;
  var passwordChars = [
    {
      charStr: lowerAlphabet,
      numChars: numNormalLettersToInclude,
    },
    {
      charStr: upperAlphabet,
      numChars: numCapitalLettersToInclude,
    },
    {
      charStr: numberCharacters,
      numChars: numNumbersToInclude,
    },
  ];
  console.log(passwordChars);

  for (j = 0; j < passwordChars.length; j++) {
    for (i = 0; i < passwordChars[j].numChars; i++) {
      index = Math.floor(Math.random() * passwordChars[j].charStr.length);
      randomPassword = randomPassword + passwordChars[j].charStr[index];
    }
  }

  randomPassword = randomPassword + uniqueSpecialChars;

  return randomPassword;
}

function shuffleChars(unrefinedPassword) {
  var refinedPassword = "";
  console.log(unrefinedPassword);
  console.log(typeof unrefinedPassword);
  var pwArray = Array.from(unrefinedPassword);
  var ctr = pwArray.length;
  for (i = 0; i < ctr; i++) {
    index = Math.floor(Math.random() * pwArray.length);
    refinedPassword = refinedPassword + pwArray[index];
    console.log(pwArray);
    pwArray.splice(index, 1);
    console.log(pwArray);
  }

  return refinedPassword;
}
