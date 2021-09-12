import { Router } from 'express';
import {solicitudMentoriaController} from '../controllers/solicitud-mentoriaController';

class SolicitudMentoriaRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',solicitudMentoriaController.list);
this.router.get('/:id',solicitudMentoriaController.getOne);
this.router.post('/',solicitudMentoriaController.create);
this.router.delete('/:id',solicitudMentoriaController.delete);
this.router.put('/:id',solicitudMentoriaController.update);

}
}
const solicitudMentoriaRoutes=new SolicitudMentoriaRoutes();
export default  solicitudMentoriaRoutes.router;