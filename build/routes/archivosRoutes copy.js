"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivosController_1 = require("../controllers/archivosController");
class ArchivosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", archivosController_1.archivosController.list);
        this.router.get("/:id", archivosController_1.archivosController.getOne);
        this.router.post("/", archivosController_1.archivosController.create);
        this.router.delete("/:id", archivosController_1.archivosController.delete);
        this.router.put("/:id", archivosController_1.archivosController.update);
    }
}
const archivosRoutes = new ArchivosRoutes();
exports.default = archivosRoutes.router;
