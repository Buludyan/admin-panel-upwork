import {ICollege} from './../Interfaces/Interfaces';
import {Request, Response} from 'express';
const collegesData = require('../CollegesData/CollegesData.json');

class CollegesController {
  getCollegesList(req: Request, res: Response) {
    try {
      const {status, district, category} = req.body;
      console.log(status === 'None');
      let request = [...collegesData[district]];
      if (category && category !== 'None') {
        request = request.filter((college: ICollege) =>
          college.SpecialisedIn.split(',').find(cat => cat === category)
        );
      }

      if (status !== 'None') {
        request = request.filter(
          (college: ICollege) => college.status === status
        );
      }

      return res.json(request);
    } catch (e) {
      console.log(e);
    }
  }
}

export const collegesController = new CollegesController();
