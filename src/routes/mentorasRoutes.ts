import { Router } from 'express';
import {mentoriasController} from '../controllers/mentorias-registroController';

class MentorasRegistroRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',mentoriasController.listMentoras);
 this.router.get('/:id',mentoriasController.getHorariosMentora);
// this.router.post('/',mentoriasController.create);
// this.router.delete('/:id',mentoriasController.delete);
// this.router.put('/:id',mentoriasController.update);

}
}
const mentorasRegistroRoutes=new MentorasRegistroRoutes;
export default  mentorasRegistroRoutes.router;