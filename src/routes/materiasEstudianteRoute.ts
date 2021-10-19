import { Router } from 'express';
import {materiasController} from '../controllers/materiasController';
import {mentoriasController} from '../controllers/mentorias-registroController';
class MateriasEstudianteRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.get('/:id',materiasController.getMateriasPorCarrera);
this.router.put('/:id',mentoriasController.updateRegistroMentoria);

}
}
const materiasEstudianteRoutes=new MateriasEstudianteRoutes();
export default  materiasEstudianteRoutes.router;
