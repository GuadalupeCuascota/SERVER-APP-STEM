"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class RestablecerPassRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/:id', usuariosController_1.usuariosController.RestablecerPass);
    }
}
const restablacerPassRoutes = new RestablecerPassRoutes();
exports.default = restablacerPassRoutes.router;
