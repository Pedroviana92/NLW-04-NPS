import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SendEmailController } from './controllers/SendEmailController'
const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailController = new SendEmailController()

router.post('/users', userController.create)
router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)
router.post('/sendEmail', sendEmailController.execute)

export { router };