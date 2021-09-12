"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentorias_registroController_1 = require("../controllers/mentorias-registroController");
class MentoriasUsuarioRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/:id", mentorias_registroController_1.mentoriasController.getMentoriasUsuario);
    }
}
const mentoriasUsuarioRoutes = new MentoriasUsuarioRoutes;
exports.default = mentoriasUsuarioRoutes.router;
