import { Router } from 'express';
import {consultasDashboardController} from '../controllers/consultas-dashboard';

class ConsultasDashoardLikesPerfilRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',consultasDashboardController.likesPorPerfil);


}
}
const consultasDashboardLikesPerfilEventosRoutes=new ConsultasDashoardLikesPerfilRoutes();
export default  consultasDashboardLikesPerfilEventosRoutes.router;