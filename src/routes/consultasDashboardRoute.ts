import { Router } from 'express';
import {consultasDashboardController} from '../controllers/consultas-dashboard';

class ConsultasDashoardRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',consultasDashboardController.NroEstudiantesMes);


}
}
const consultasDashboardRoutes=new ConsultasDashoardRoutes();
export default  consultasDashboardRoutes.router;

