import { Router } from 'express';
import {carrerasficaController} from '../controllers/carreras-ficaController';
import multer from '../libs/multer';

class CarrerasFicaRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',carrerasficaController.list);
this.router.get('/:id',carrerasficaController.getOne);
this.router.post('/',multer.single('ruta_archivo'),carrerasficaController.create);

this.router.delete('/:id',carrerasficaController.delete);
this.router.put('/:id',multer.single('ruta_archivo'),carrerasficaController.update);

}
}
const carrerasficaRoutes=new CarrerasFicaRoutes();
export default  carrerasficaRoutes.router;


