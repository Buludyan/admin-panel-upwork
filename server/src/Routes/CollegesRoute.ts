import {Router} from 'express';
import {collegesController} from '../Controllers/CollegesController';

const router = Router();

router.post('/list', collegesController.getCollegesList);

export {router};
