export const formValidation = (form, goal) => {
  let invalidInput = false;
  let index = 0;
  
  const newGoalDetails = form.children[2].children;

  for (const property in goal) {
    if (newGoalDetails[index].classList.contains('invalid-field')) {
      newGoalDetails[index].classList.remove('invalid-field');
    }

    if (goal[property] === '') {
      newGoalDetails[index].classList.add('invalid-field');
      invalidInput = true;
    }
    index += 1;
  }

  return invalidInput;
};
