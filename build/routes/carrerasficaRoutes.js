"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreras_ficaController_1 = require("../controllers/carreras-ficaController");
class CarrerasFicaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', carreras_ficaController_1.carrerasficaController.list);
        this.router.get('/:id', carreras_ficaController_1.carrerasficaController.getOne);
        this.router.post('/', carreras_ficaController_1.carrerasficaController.create);
        this.router.delete('/:id', carreras_ficaController_1.carrerasficaController.delete);
        this.router.put('/:id', carreras_ficaController_1.carrerasficaController.update);
    }
}
const carrerasficaRoutes = new CarrerasFicaRoutes();
exports.default = carrerasficaRoutes.router;
