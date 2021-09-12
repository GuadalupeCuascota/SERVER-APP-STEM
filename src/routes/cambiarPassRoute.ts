import { Router } from 'express';
import {usuariosController} from '../controllers/usuariosController';

class CambiarPassRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{

this.router.put('/:id',usuariosController.updatePass);
this.router.get('/:correo_electronico',usuariosController.RecuperarPass)
}
}
const cambiarPassRoutes=new CambiarPassRoutes();
export default  cambiarPassRoutes.router;
