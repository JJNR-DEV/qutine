export const formValidation = (...args) => {
  let invalidInput = false;
  args.forEach((field) => {
    if (field.classList.contains('invalid-field')) {
      field.classList.remove('invalid-field');
    }
    if (field.value === '') {
      field.classList.add('invalid-field');
      invalidInput = true;
    }
  });

  return invalidInput;
};
