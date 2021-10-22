import { Router } from 'express';
import {mentoriasController} from '../controllers/mentorias-registroController';

class TipoMentoriasRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',mentoriasController.listporTipo);


}
}
const tipoMentoriasRoutes=new TipoMentoriasRoutes
;
export default  tipoMentoriasRoutes.router;
