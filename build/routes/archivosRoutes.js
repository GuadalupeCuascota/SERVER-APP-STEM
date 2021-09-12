"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivosController_1 = require("../controllers/archivosController");
const multer_1 = __importDefault(require("../libs/multer"));
class ArchivosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", archivosController_1.archivosController.list);
        this.router.get("/:id", archivosController_1.archivosController.getOne);
        this.router.post("/", multer_1.default.single('file'), archivosController_1.archivosController.create); //antes de procesar pasa por multer para saber si hay un archivo 
        this.router.delete("/:id", archivosController_1.archivosController.delete);
        this.router.put("/:id", archivosController_1.archivosController.update);
    }
}
const archivosRoutes = new ArchivosRoutes();
exports.default = archivosRoutes.router;
