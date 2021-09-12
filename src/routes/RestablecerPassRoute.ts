import { Router } from 'express';
import {usuariosController} from '../controllers/usuariosController';

class RestablecerPassRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{

this.router.put('/:id',usuariosController.RestablecerPass);

}
}
const restablacerPassRoutes=new RestablecerPassRoutes();
export default  restablacerPassRoutes.router;
