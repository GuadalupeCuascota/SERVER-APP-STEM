import { Router } from 'express';
import {temaMateriaController} from '../controllers/temaMateriaController';

class TemaMateriaRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{

this.router.get('/',temaMateriaController.list);
this.router.get('/:id',temaMateriaController.getOne);
this.router.post('/',temaMateriaController.create);
this.router.delete('/:id',temaMateriaController.delete);


}
}
const temaMateriaRoutes=new TemaMateriaRoutes();
export default  temaMateriaRoutes.router;