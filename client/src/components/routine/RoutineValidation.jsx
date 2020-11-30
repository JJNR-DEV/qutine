export const formValidation = (form, routine, selectedDays) => {
  let invalidInput = false;
  let index = 0;

  const newRoutineDetails = form.children[1].children;

  for (const property in routine) {
    if (newRoutineDetails[index].classList.contains('invalid-field')) {
      newRoutineDetails[index].classList.remove('invalid-field');
    }

    if (routine[property] === '') {
      newRoutineDetails[index].classList.add('invalid-field');
      invalidInput = true;
    }
    index += 1;
  }

  if (selectedDays.length === 0) {
    form.children[2].classList.add('invalid-field');
    invalidInput = true;
  } else if (form.children[2].classList.contains('invalid-field')) {
    form.children[2].classList.remove('invalid-field');
  }

  return invalidInput;
};
