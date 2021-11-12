import { Router } from 'express';
import {mentoriasController} from '../controllers/mentorias-registroController';

class MentorasRegistroRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',mentoriasController.listMentoras);
 this.router.get('/:id',mentoriasController.getHorariosMentora);
}
}
const mentorasRegistroRoutes=new MentorasRegistroRoutes;
export default  mentorasRegistroRoutes.router;