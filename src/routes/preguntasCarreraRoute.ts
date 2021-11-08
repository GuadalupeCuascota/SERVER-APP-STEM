import { Router } from 'express';
import {testAptitudController} from '../controllers/test-aptitudcontroller';

class PreguntasCarreraRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',testAptitudController.listPeguntasCarrera);
}
}
const preguntasCarreraRoutes=new PreguntasCarreraRoutes ();
export default  preguntasCarreraRoutes.router;