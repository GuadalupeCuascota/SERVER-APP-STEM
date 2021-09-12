import { Router } from 'express';
import {mentoriasController} from '../controllers/mentorias-registroController';
class MentoriasUsuarioRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{

this.router.get("/:id",mentoriasController.getMentoriasUsuario);

}
}
const mentoriasUsuarioRoutes=new MentoriasUsuarioRoutes;
export default  mentoriasUsuarioRoutes.router;
