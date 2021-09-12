import { Router } from 'express';
import {agendarMentoriaController} from '../controllers/AgendarMentoriaController';

class AgendarMentoriaRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',agendarMentoriaController.list);
this.router.get('/:id',agendarMentoriaController.getOne);
this.router.post('/',agendarMentoriaController.create);
this.router.delete('/:id',agendarMentoriaController.delete);
this.router.put('/:id',agendarMentoriaController.update);

}
}
const agendarMentoriaRoutes=new AgendarMentoriaRoutes;
export default  agendarMentoriaRoutes.router;