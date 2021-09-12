import { Router } from 'express';
import {carrerasficaController} from '../controllers/carreras-ficaController';

class CarrerasFicaRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',carrerasficaController.list);
this.router.get('/:id',carrerasficaController.getOne);
this.router.post('/',carrerasficaController.create);
this.router.delete('/:id',carrerasficaController.delete);
this.router.put('/:id',carrerasficaController.update);

}
}
const carrerasficaRoutes=new CarrerasFicaRoutes();
export default  carrerasficaRoutes.router;


