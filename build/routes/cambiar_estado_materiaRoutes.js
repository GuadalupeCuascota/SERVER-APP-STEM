"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
class CambiarEstadoMateriaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/:id', materiasController_1.materiasController.updateEstadoMateria);
    }
}
const cambiarEstadoMateria = new CambiarEstadoMateriaRoutes;
exports.default = cambiarEstadoMateria.router;
