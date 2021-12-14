import { Router } from 'express';
import {cancelacionMentoriasController} from '../controllers/cancelacionMentoriasController';

class CancelacionMentoriasRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.put('/:id',cancelacionMentoriasController.updateRegistroMentoria);

}
}
const cancelacionMentoriasRoutes=new CancelacionMentoriasRoutes;
export default  cancelacionMentoriasRoutes.router;
