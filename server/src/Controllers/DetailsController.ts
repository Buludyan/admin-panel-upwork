import {Request, Response} from 'express';
import * as fs from 'fs';
import path from 'path';

class DetailsController {
  getCollegeDetails(req: Request, res: Response) {
    try {
      const {id} = req.body;
      const filePath = path.join(__dirname, `../DetailsData/${id}.json`);
      const fileExist = fs.existsSync(filePath);

      if (!fileExist) {
        return res.json('File does not exist');
      } else {
        console.log('File exists');
        const collegeDetails = require(`../DetailsData/${id}.json`);
        return res.json(collegeDetails);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const detailsController = new DetailsController();
