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
  let allErrors = {
    username: false,
    email: false,
    password: false,
    secondPassword: false,
    repeatPassword: false,
  };

  const { username, email, password, repeatPassword } = userInput;

  if (username.length === 0 || username === "" || username.length < 4)
    allErrors.username = "Please enter your username";
  if (email.length === 0 || email === "" || !email.trim().includes("@"))
    allErrors.email = "Please enter your email";
  if (password.length === 0 || password === "" || password.length < 4)
    allErrors.password = "Please enter a password";
  if (
    repeatPassword.length === 0 ||
    repeatPassword === "" ||
    repeatPassword !== password
  )
    allErrors.secondPassword = "Passwords don't match";

  const errorCount = countErrors(allErrors);
  return { allErrors, errorCount };
};

export const validateLoginForm = (userInput) => {
  let allErrors = {
    email: false,
    password: false,
  };

  const { email, password } = userInput;
  if (email.length === 0 || email === "" || !email.trim().includes("@"))
    allErrors.email = "Please enter your email!";
  if (password.length === 0 || password === "" || password.length < 4)
    allErrors.password = "Please enter your password!";

  const errorCount = countErrors(allErrors);

  return { allErrors, errorCount };
};

export const validateCreateForm = (userInput) => {
  const { name, category, year, description, price, image, material } =
    userInput;
  let allErrors = {
    name: false,
    category: false,
    material: false,
    year: false,
    price: false,
    description: false,
    image: false,
  };
  if (name === "" || name.length === 0)
    allErrors.name = "Please enter the name.";
  if (category === "" || category.length === 0)
    allErrors.category = "Please enter the category.";
  if (material === "" || material.length === 0)
    allErrors.material = "Please enter the material.";
  if (year === "" || year.length === 0 || year < 1950 || year > 2050)
    allErrors.year = "Please enter the year.";
  if (price === "" || price.length === 0 || price <= 0)
    allErrors.price = "Please enter the price.";
  if (description === "" || description.length === 0 || description < 10)
    allErrors.description = "Please enter a description.";
  if (image === "" || image.length === 0)
    allErrors.image = "Please enter an image URL.";

  const errorCount = countErrors(allErrors);
  return { allErrors, errorCount };
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
