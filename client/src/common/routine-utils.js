const categoryColorMap = [
  {
    type: 'home',
    color: '#a0a0ff'
  },
  {
    type: 'work',
    color: '#ffff7d'
  },
  {
    type: 'training',
    color: '#ff9898'
  }];

export const findCategoryColor = (category) => {
  return categoryColorMap.filter(val => val.type === category).map(val => val.color);
};

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
