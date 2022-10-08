import {detailsController} from './../Controllers/DetailsController';
import {Router} from 'express';
import {collegesController} from '../Controllers/CollegesController';

const router = Router();

router.post('/list', collegesController.getCollegesList);
router.post('/college', detailsController.getCollegeData);
router.post('/edit', detailsController.getCollegeDetails);
router.post('/save', detailsController.saveCollegeDetails);

export {router};
