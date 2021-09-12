"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionController_1 = require("../controllers/publicacionController");
const multer_1 = __importDefault(require("../libs/multer"));
class PublicacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", publicacionController_1.archivosController.listP);
        this.router.get("/:id", publicacionController_1.archivosController.getOne);
        this.router.post("/", multer_1.default.single('ruta_archivo'), publicacionController_1.archivosController.create); //antes de procesar pasa por multer para saber si hay un archivo 
        this.router.delete("/:id", publicacionController_1.archivosController.delete);
        this.router.put("/:id", multer_1.default.single('ruta_archivo'), publicacionController_1.archivosController.update);
    }
}
const publicacionRoutes = new PublicacionRoutes();
exports.default = publicacionRoutes.router;
