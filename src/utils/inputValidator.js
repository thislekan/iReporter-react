import validator from 'validator';

const validateFields = (payload, route) => {
  let errorMessage;

  const emptyEmailCheck = validator.isEmpty(payload.email);
  if (emptyEmailCheck) {
    errorMessage = 'Email address cannot be empty';
    return errorMessage;
  }

  const emptyPasswordCheck = validator.isEmpty(payload.password);
  if (emptyPasswordCheck) {
    errorMessage = 'Please provide a valid password';
    return errorMessage;
  }

  const emailCheck = validator.isEmail(payload.email);
  if (!emailCheck) {
    errorMessage = 'Please provide a valid email';
    return errorMessage;
  }

  if (route === '/signup') {
    const emptyFirstNameCheck = validator.isEmpty(payload.firstName);
    if (emptyFirstNameCheck) {
      errorMessage = 'Your first name is required';
      return errorMessage;
    }
    const emptyLastNameCheck = validator.isEmpty(payload.lastName);
    if (emptyLastNameCheck) {
      errorMessage = 'Your last name is required';
      return errorMessage;
    }

    const emptyPasswordConfirmCheck = validator.isEmpty(payload.confirmPassword.trim());
    if (emptyPasswordConfirmCheck) {
      errorMessage = 'Your password cannot be empty';
      return errorMessage;
    }

    if (payload.password !== payload.confirmPassword) {
      errorMessage = 'Your password does not macth. Please try again';
      return errorMessage;
    }
  }

  return true;
};

export default validateFields;
