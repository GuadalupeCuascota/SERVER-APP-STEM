import { Router } from 'express';
import {mentoriasController} from '../controllers/mentorias-registroController';

class MentoriasRegistradasRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',mentoriasController.list);
this.router.get('/:id',mentoriasController.getOne);
this.router.post('/',mentoriasController.create);
this.router.delete('/:id',mentoriasController.delete);
this.router.put('/:id',mentoriasController.update);

}
}
const mentoriasRegistroRoutes=new MentoriasRegistradasRoutes;
export default  mentoriasRegistroRoutes.router;
