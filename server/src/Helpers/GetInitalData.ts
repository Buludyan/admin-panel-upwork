const collegesData = require('../CollegesData/CollegesData.json');
const distrcitsList = require('../Districts/Districts.json');
import {ICollege} from '../Interfaces/Interfaces';

export const getCollegeInitialData = (id: string) => {
  const distKeys: string[] = Object.keys(collegesData);
  const stateKeys: string[] = Object.keys(distrcitsList);
  let name = '';
  let city = '';
  let state = '';

  for (let i = 0; i < distKeys.length; ++i) {
    collegesData[distKeys[i]].map((college: ICollege) => {
      if (
        college.collegename.slice(
          college.collegename.indexOf('Id:') + 4,
          college.collegename.indexOf(')')
        ) === id
      ) {
        name = college.collegename;
        city = distKeys[i];
      }
    });
  }

  for (let i = 0; i < stateKeys.length; ++i) {
    const list = distrcitsList[stateKeys[i]];
    if (list.find((dist: string) => dist === city)) {
      state = stateKeys[i];
    }
  }

  return {name, state, city};
};
