"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class CambiarPassRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/:id', usuariosController_1.usuariosController.updatePass);
        this.router.get('/:correo_electronico', usuariosController_1.usuariosController.RecuperarPass);
    }
}
const cambiarPassRoutes = new CambiarPassRoutes();
exports.default = cambiarPassRoutes.router;
