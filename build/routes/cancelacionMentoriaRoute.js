"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cancelacionMentoriasController_1 = require("../controllers/cancelacionMentoriasController");
class CancelacionMentoriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/:id', cancelacionMentoriasController_1.cancelacionMentoriasController.updateRegistroMentoria);
    }
}
const cancelacionMentoriasRoutes = new CancelacionMentoriasRoutes;
exports.default = cancelacionMentoriasRoutes.router;
