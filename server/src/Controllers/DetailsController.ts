import {Request, Response} from 'express';
import * as fs from 'fs';
import path from 'path';
import {ICollege, IDetails} from '../Interfaces/Interfaces';
const template: IDetails = require('../CollegesData/CollegeDetailsTemplate.json');
const collegesData = require('../CollegesData/CollegesData.json');

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
        const keys = Object.keys(collegesData);
        let name;
        for (let i = 0; i < keys.length; ++i) {
          collegesData[keys[i]].map((college: ICollege) =>
            college.collegename.slice(
              college.collegename.indexOf('Id:') + 4,
              college.collegename.indexOf(')')
            ) === id
              ? (name = college.collegename)
              : null
          );
        }

        const data = {...template};
        if (name) {
          data.collegeName = name;
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
