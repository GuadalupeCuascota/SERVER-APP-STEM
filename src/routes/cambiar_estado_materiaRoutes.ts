import { Router } from 'express';
import {materiasController} from '../controllers/materiasController';

class CambiarEstadoMateriaRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.put('/:id',materiasController.updateEstadoMateria);

}
}
const cambiarEstadoMateria=new CambiarEstadoMateriaRoutes;
export default  cambiarEstadoMateria.router;
