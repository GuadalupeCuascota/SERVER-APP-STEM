import { Router } from 'express';
import {cancelacionMentoriasController} from '../controllers/cancelacionMentoriasController';

class CancelacionMentoriasEstRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.put('/:id',cancelacionMentoriasController.cancelarMentoriaEst);

}
}
const cancelacionMentoriasEstRoutes=new CancelacionMentoriasEstRoutes;
export default  cancelacionMentoriasEstRoutes.router;
