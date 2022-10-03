import {Request, Response} from 'express';
import * as fs from 'fs';
import path from 'path';
import {ICollege, IDetails} from '../Interfaces/Interfaces';
const template: IDetails = require('../CollegesData/CollegeDetailsTemplate.json');
const collegesData = require('../CollegesData/CollegesData.json');
const distrcitsList = require('../Districts/Districts.json');

class DetailsController {
  getCollegeDetails(req: Request, res: Response) {
    try {
      const {id} = req.body;
      const filePath = path.join(
        __dirname,
        `../CollegesDetailsList/${id}.json`
      );
      const fileExist = fs.existsSync(filePath);

      if (!fileExist) {
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

        const data = {...template};
        if (name && city && state) {
          data.collegeName = name;
          data.address.city = city;
          data.address.state = state;
        } else {
          return res.json(`College with id ${id} not found`);
        }
        fs.writeFileSync(
          path.join(__dirname, `../CollegesDetailsList/${id}.json`),
          JSON.stringify(data)
        );
        return res.json(data);
      } else {
        console.log('File exists');
        const collegeDetails = require(`../CollegesDetailsList/${id}.json`);
        return res.json(collegeDetails);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const detailsController = new DetailsController();
