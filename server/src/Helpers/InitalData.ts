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
      if (college.collegename.slice(name.length - 8, name.length - 1) === id) {
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

export const changeInitialData = (id: string, college: ICollege) => {
  const distKeys: string[] = Object.keys(collegesData);

  for (let i = 0; i < distKeys.length; ++i) {
    collegesData[distKeys[i]] = collegesData[distKeys[i]].map(
      (col: ICollege) => {
        if (
          col.collegename.slice(
            col.collegename.length - 8,
            col.collegename.length - 1
          ) === id
        ) {
          col = college;
          return col;
        } else {
          return col;
        }
      }
    );
  }

  return collegesData;
};
