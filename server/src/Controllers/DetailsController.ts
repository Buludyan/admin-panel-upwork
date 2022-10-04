import {Request, Response} from 'express';
import * as fs from 'fs';
import path from 'path';
import {getCollegeInitialData} from '../Helpers/GetInitalData';
import {IDetails} from '../Interfaces/Interfaces';
const template: IDetails = require('../CollegesData/CollegeDetailsTemplate.json');

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
}

export const detailsController = new DetailsController();
