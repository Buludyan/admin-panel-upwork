import {detailsController} from './../Controllers/DetailsController';
import {Router} from 'express';
import {collegesController} from '../Controllers/CollegesController';

const router = Router();

router.post('/list', collegesController.getCollegesList);
router.post('/edit', detailsController.getCollegeDetails);

export {router};
