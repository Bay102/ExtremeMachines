
export const checkIfEmailExists = (users, email) => {
  if (  users.some(user => user.userEmail === email)) {
    return 'Email already exists'
  } else return false
}


export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return " Alphabetical letters only";
    }
  } else {
    return undefined;
  }
};

export const passwordLengthError = (value) =>
  value.length < 7 && value.length >= 1
    ? "Password must be at least 7 characters"
    : undefined;

export const matchingPasswords = (passwordState, confirmPasswordState) => {
  return confirmPasswordState !== passwordState
    ? "Passwords do not match"
    : undefined;
};

export const emailContains = (value) => {
  // const regex = /@/;
  const regex = /@.*\.com$/;
  if (value.length > 0) {
    if (regex.test(value)) {
      return undefined;
    } else return "Invalid Email Format";
  }
};

export const onlyNumberValidation = (value) => {
  const regex = /^[0-9]+$/;
  if (value.length > 0) {
    if (regex.test(value)) {
      return undefined;
    } else return "Numbers Only";
  }
};
