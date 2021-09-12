"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacionController_1 = require("../controllers/autentificacionController");
class AutenticacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/');
        this.router.get('/:id');
        this.router.post('/', autentificacionController_1.autentificacionController.login);
        this.router.delete('/:id');
        this.router.put('/:id');
    }
}
const autenticacionRoutes = new AutenticacionRoutes();
exports.default = autenticacionRoutes.router;
