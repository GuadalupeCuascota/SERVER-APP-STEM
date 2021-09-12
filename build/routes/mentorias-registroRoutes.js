"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentorias_registroController_1 = require("../controllers/mentorias-registroController");
class MentoriasRegistradasRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mentorias_registroController_1.mentoriasController.list);
        this.router.get('/:id', mentorias_registroController_1.mentoriasController.getOne);
        this.router.post('/', mentorias_registroController_1.mentoriasController.create);
        this.router.delete('/:id', mentorias_registroController_1.mentoriasController.delete);
        this.router.put('/:id', mentorias_registroController_1.mentoriasController.update);
    }
}
const mentoriasRegistroRoutes = new MentoriasRegistradasRoutes;
exports.default = mentoriasRegistroRoutes.router;
