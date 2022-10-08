import {Request, Response} from 'express';
import * as fs from 'fs';
import path from 'path';
import {changeInitialData, getCollegeInitialData} from '../Helpers/InitalData';
import {ICollege, IDetails} from '../Interfaces/Interfaces';
const template: IDetails = require('../CollegesData/CollegeDetailsTemplate.json');
const collegesData = require('../CollegesData/CollegesData.json');

class DetailsController {
  getCollegeData(req: Request, res: Response) {
    const {id} = req.body;
    const distKeys: string[] = Object.keys(collegesData);
    let collegeData = {};

    for (let i = 0; i < distKeys.length; ++i) {
      collegesData[distKeys[i]].map((college: ICollege) => {
        if (
          college.collegename.slice(
            college.collegename.indexOf('Id:') + 4,
            college.collegename.indexOf(')')
          ) === id
        ) {
          collegeData = college;
        }
      });
    }

    return res.json(collegeData);
  }

  getCollegeDetails(req: Request, res: Response) {
    try {
      const {id} = req.body;
      const filePath = path.join(
        __dirname,
        `../CollegesDetailsList/${id}.json`
      );
      const fileExist = fs.existsSync(filePath);

      if (!fileExist) {
        const {name, state, city} = getCollegeInitialData(id);

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

  saveCollegeDetails(req: Request, res: Response) {
    try {
      const {details, college, id} = req.body;

      const newCollegesData = changeInitialData(id, college);

      fs.writeFileSync(
        path.join(__dirname, `../CollegesData/CollegesData.json`),
        JSON.stringify(newCollegesData)
      );

      fs.writeFileSync(
        path.join(__dirname, `../CollegesDetailsList/${id}.json`),
        JSON.stringify(details)
      );

      res.json('Successfully saved');
    } catch (e) {
      console.log(e);
    }
  }
}

export const detailsController = new DetailsController();
