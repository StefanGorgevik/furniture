const countErrors = (errors) => {
  let errorCount = 0;
  for (let err in errors) {
    if (errors[err]) {
      errorCount++;
    }
  }
  return errorCount;
};

export const validateRegisterForm = (userInput) => {
  const { username, email, password, repeatPassword } = userInput;

  if (username.length === 0 || username === "" || username.length < 4) {
    return "Please enter your username";
  } else if (
    email.length === 0 ||
    email === "" ||
    !email.trim().includes("@")
  ) {
    return "Please enter a correct email!";
  } else if (password.length === 0 || password === "" || password.length < 4) {
    return "Please enter a password";
  } else if (password.length < 6) {
    return "Password should be at least 6 characters!";
  } else if (
    repeatPassword.length === 0 ||
    repeatPassword === "" ||
    repeatPassword !== password
  ) {
    return "Passwords don't match";
  } else {
    return "";
  }
};

export const validateLoginForm = (userInput) => {
  const { email, password } = userInput;
  if (email.length === 0 || email === "" || !email.trim().includes("@")) {
    return "Please enter your email!";
  } else if (password.length === 0) {
    return "Please enter your password!";
  } else if (password.length > 1 && password.length < 6) {
    return "Password should be at least 6 characters!";
  } else {
    return "";
  }
};

export const validateCreateForm = (userInput) => {
  const { name, category, year, description, price, image, material } =
    userInput;

  if (name === "" || name.length === 0) {
    return "Please enter the name.";
  } else if (material === "" || material.length === 0) {
    return "Please enter the material.";
  } else if (image === "" || image.length === 0) {
    return "Please enter an image URL.";
  } else if (category === "" || category.length === 0) {
    return "Please enter the category.";
  } else if (year === "" || year.length === 0 || year < 1950 || year > 2050) {
    return "Please enter the year.";
  } else if (price === "" || price.length === 0 || price <= 0) {
    return "Please enter the price.";
  } else if (
    description === "" ||
    description.length === 0 ||
    description < 10
  ) {
    return "Please enter a description.";
  } else {
    return "";
  }
};

export const validateCheckoutForm = (userInput) => {
  const { cardName, cardNumber, expiryMonth, expiryYear, cvv } = userInput;

  let allErrors = {
    cardName: false,
    cardNumber: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
  };

  if (cardName.length === 0 || cardName === "" || cardName.length < 4)
    allErrors.cardName = "Enter card name!";
  if (cardNumber.length === 0 || cardNumber === "" || cardNumber.length < 4)
    allErrors.cardNumber = "Enter card number!";
  if (expiryMonth.length === 0 || expiryMonth === "" || expiryMonth.length < 2)
    allErrors.expiryMonth = "Enter card expiry month!";
  if (expiryYear.length === 0 || expiryYear === "")
    allErrors.expiryYear = "Enter card expiry year";
  if (cvv.length === 0 || cvv === "" || cvv.length < 3)
    allErrors.cvv = "Enter card CCV";

  const errorCount = countErrors(allErrors);
  return { allErrors, errorCount };
};

export const validateChangePWForm = (userInput) => {
  const { currentPassword, newPassword, repeatPassword } = userInput;

  let allErrors = {
    currentPassword: false,
    newPassword: false,
    repeatPassword: false,
  };

  if (currentPassword.trim().length === 0) {
    allErrors.currentPassword = "Please enter your current password";
  }
  if (newPassword.trim().length === 0) {
    allErrors.newPassword = "Please enter a new password";
  }
  if (repeatPassword.trim().length === 0) {
    allErrors.repeatPassword = "Please repeat the new password";
  }

  const errorCount = countErrors(allErrors);
  return { allErrors, errorCount };
};
