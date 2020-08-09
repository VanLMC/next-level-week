import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';


//define no ts o tipo scheduleItem e as propriedades que tera
interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
}


export default class ClassesController {

    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;


        if(!filters.subject || !filters.week_day || !filters.time){
            return response.status(400).json({
                error: "missing filters to search classes"
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const Classes = await db('classes')
        .whereExists(function () {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
            .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=' ,'users.id')
        .select(['classes.*', 'users.*']);


        return response.json(Classes);


        response.send();
    }

    async create(request: Request, response: Response) { 
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        
        const trx = await db.transaction(); //serve para inserir todos os objetos relacionados no banco em uma so transacao
    try{
       const insertedUsersIds = await trx('users').insert({
           name: name,
           avatar: avatar,
           whatsapp: whatsapp,
           bio: bio
       })
    
       const user_id = insertedUsersIds[0] //o insert retorna sempre um array. Por isso seleciona-se o primeiro indice
    
       const insertedClassesIds = await trx('classes').insert({
           subject,
           cost,
           user_id,
       })
    
       const class_id = insertedClassesIds[0]
       const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
           return {
               class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            };
       })
    
       await trx('class_schedule').insert(classSchedule)
    
       await trx.commit(); //executa as operacoes
    
        return response.status(201).send();
        } catch(err){
            console.log(err)
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    
    }
}