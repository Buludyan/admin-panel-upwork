import {ICollege} from './../Interfaces/Interfaces';
import {Request, Response} from 'express';
const collegesData = require('../CollegesData/CollegesData.json');

class CollegesController {
  getCollegesList(req: Request, res: Response) {
    try {
      const {district, category} = req.body;
      let request = [...collegesData[district]];
      if (category && category !== 'None') {
        request = request.filter(
          (college: ICollege) => college.SpecialisedIn === category
        );
      }
      return res.json(request);
    } catch (e) {
      console.log(e);
    }
  }
}

export const collegesController = new CollegesController();
