import { Router } from 'express';
import {agendarMentoriaController} from '../controllers/AgendarMentoriaController';

class SolicitudesMentoriaRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',agendarMentoriaController.listsolicitudes);
this.router.put('/:id',agendarMentoriaController.update);


}
}
const solicitudesMentoriaRoutes=new SolicitudesMentoriaRoutes;
export default  solicitudesMentoriaRoutes.router;