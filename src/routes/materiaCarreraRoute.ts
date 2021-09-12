import { Router } from 'express';
import {materiasCarreraController} from '../controllers/materiaCarreraController';

class MateriasCarreraRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',materiasCarreraController.list);
this.router.get('/:id',materiasCarreraController.getOne);
this.router.post('/',materiasCarreraController.create);
this.router.delete('/:id',materiasCarreraController.delete);
this.router.put('/:id',materiasCarreraController.update);

}
}
const materiasCarreraRoutes=new MateriasCarreraRoutes();
export default  materiasCarreraRoutes.router;
