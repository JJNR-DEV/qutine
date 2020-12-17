export const formValidation = goal => {
  let invalidInput = false;
  
  for (const property in goal) {
    invalidInput = handleProperties(property, goal[property]);
    if(invalidInput === true) return invalidInput;
  }

  return invalidInput;
};

const handleProperties = (propName, propVal) => {
  switch (propName) {
    case 'name':
      return classListOperator(document.querySelector('#goalName'), propVal);
    default:
      return classListOperator(document.querySelector('#goalCategory'), propVal);
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