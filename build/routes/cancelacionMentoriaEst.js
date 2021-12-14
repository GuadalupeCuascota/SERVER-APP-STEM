"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cancelacionMentoriasController_1 = require("../controllers/cancelacionMentoriasController");
class CancelacionMentoriasEstRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/:id', cancelacionMentoriasController_1.cancelacionMentoriasController.cancelarMentoriaEst);
    }
}
const cancelacionMentoriasEstRoutes = new CancelacionMentoriasEstRoutes;
exports.default = cancelacionMentoriasEstRoutes.router;
