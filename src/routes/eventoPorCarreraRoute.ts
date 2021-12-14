import { Router } from 'express';
import {consultasDashboardController} from '../controllers/consultas-dashboard';

class ConsultasDashoardEventoCarreraRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',consultasDashboardController.eventosPorCarrera);


}
}
const consultasDashboardEventosCarreraRoutes=new ConsultasDashoardEventoCarreraRoutes();
export default  consultasDashboardEventosCarreraRoutes.router;