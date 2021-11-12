"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentorias_registroController_1 = require("../controllers/mentorias-registroController");
class MentorasRegistroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mentorias_registroController_1.mentoriasController.listMentoras);
        this.router.get('/:id', mentorias_registroController_1.mentoriasController.getHorariosMentora);
    }
}
const mentorasRegistroRoutes = new MentorasRegistroRoutes;
exports.default = mentorasRegistroRoutes.router;
