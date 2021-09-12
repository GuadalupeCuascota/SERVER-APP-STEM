import { Router } from 'express';
import {consultasDashboardController} from '../controllers/consultas-dashboard';

class ConsultaMentoriasRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',consultasDashboardController.NromentoriasAgend);


}
}
const consultaMentoriaRoutes=new ConsultaMentoriasRoutes();
export default  consultaMentoriaRoutes.router;