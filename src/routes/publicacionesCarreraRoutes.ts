import { Router } from "express";
import {archivosController} from "../controllers/publicacionController";
import multer from '../libs/multer';

class PublicacionCarreraRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
  
    
    this.router.get("/:id", archivosController.getPublicacionC);
    
  }
}
const publicacionCarreraRoutes=new PublicacionCarreraRoutes();
export default  publicacionCarreraRoutes.router;