import { Router } from 'express';
import {materiasController} from '../controllers/materiasController';

class MateriasEstudianteRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.get('/:id',materiasController.getMateriasPorCarrera);


}
}
const materiasEstudianteRoutes=new MateriasEstudianteRoutes();
export default  materiasEstudianteRoutes.router;
