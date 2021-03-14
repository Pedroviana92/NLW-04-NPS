import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendEmailService from '../services/SendEmailService';


class SendEmailController {
   async execute(req: Request, res: Response) {
       const {email, survey_id} = req.body
       const usersRepository = getCustomRepository(UsersRepository)
       const surveysRepository = getCustomRepository(SurveysRepository)
       const surveysUsersRespository = getCustomRepository(SurveysUsersRepository)

       const UserAlreadyExists = await usersRepository.findOne({email})
       if(!UserAlreadyExists) {
           return res.status(400).json({
               error: 'User does not exist'
           })
       }
       const survey = await surveysRepository.findOne({id: survey_id})
       if(!survey) {
           return res.status(400).json({
               error: 'Survey does not exist'
           })
       }

       const surveyUser = surveysUsersRespository.create({
           user_id: UserAlreadyExists.id,
           survey_id
       })
       await surveysUsersRespository.save(surveyUser)

       await SendEmailService.execute(email, survey.title, survey.description)

       return res.json(surveyUser)
   }
}

export {SendEmailController}