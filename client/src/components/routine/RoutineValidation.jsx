export const formValidation = (routine, selectedDays) => {
  let invalidInput = false;

  for (const property in routine) {
    console.log(property)
    console.log(routine[property])
    invalidInput = handleProperties(property, routine[property]);
    if(invalidInput === true) return invalidInput;
  }

  if (selectedDays.length === 0) {
    document.querySelector('.selectionDays').classList.add('invalid-field');
    invalidInput = true;
  } else if (document.querySelector('.selectionDays').classList.contains('invalid-field')) {
    document.querySelector('.selectionDays').classList.remove('invalid-field');
  }

  return invalidInput;
};

const handleProperties = (propName, propVal) => {
  switch (propName) {
    case 'name':
      return classListOperator(document.querySelector('#routineName'), propVal);
    case 'category':
      return classListOperator(document.querySelector('#routineCategory'), propVal);
    case 'sTime':
      return classListOperator(document.querySelector('#routineStime'), propVal);
    default:
      return classListOperator(document.querySelector('#routineDuration'), propVal);
  }
}

const classListOperator = (e, val) => {
  if (e.classList.contains('invalid-field')) {
    e.classList.remove('invalid-field');
  }

  if (val === '') {
    e.classList.add('invalid-field');
    return true;
  }
  return false
}
