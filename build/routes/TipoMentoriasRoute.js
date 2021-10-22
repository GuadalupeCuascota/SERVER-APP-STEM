"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentorias_registroController_1 = require("../controllers/mentorias-registroController");
class TipoMentoriasRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mentorias_registroController_1.mentoriasController.listporTipo);
    }
}
const tipoMentoriasRoutes = new TipoMentoriasRoutes;
exports.default = tipoMentoriasRoutes.router;
