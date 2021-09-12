import { Router } from "express";
import {tipoPublicaciónController} from "../controllers/tipo-publicaciónController"
class  TipoPublicacionRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  
  config(): void {
    this.router.get("/",tipoPublicaciónController.list);
    this.router.get("/:id",tipoPublicaciónController.getOne);
    this.router.post("/", tipoPublicaciónController.create);
    this.router.delete("/:id",tipoPublicaciónController.delete);
    this.router.put("/:id",tipoPublicaciónController.update );
  }
  
}
const tipoPublicacionRoutes=new TipoPublicacionRoutes();
export default  tipoPublicacionRoutes.router;