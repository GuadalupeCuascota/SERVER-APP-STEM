import { Router } from 'express';
import {autentificacionController} from '../controllers/autentificacionController';

class AutenticacionRoutes{
    public router: Router= Router();

    constructor(){
    this.config();
    }
    config(): void{
    this.router.get('/',);
    this.router.get('/:id',);
    this.router.post('/',autentificacionController.login);
    this.router.delete('/:id',);
    this.router.put('/:id',);
}
}
const autenticacionRoutes=new AutenticacionRoutes();
export default  autenticacionRoutes.router;