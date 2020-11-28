export const formValidation = (form, goal) => {
  let invalidInput = false;
  let index = 0;

  for (const property in goal) {
    if (form.children[index].classList.contains('invalid-field')) {
      form.children[index].classList.remove('invalid-field');
    }

    if (goal[property] === '') {
      form.children[index].classList.add('invalid-field');
      invalidInput = true;
    }
    index += 1;
  }

  return invalidInput;
};
