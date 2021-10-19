"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
const mentorias_registroController_1 = require("../controllers/mentorias-registroController");
class MateriasEstudianteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', materiasController_1.materiasController.getMateriasPorCarrera);
        this.router.put('/:id', mentorias_registroController_1.mentoriasController.updateRegistroMentoria);
    }
}
const materiasEstudianteRoutes = new MateriasEstudianteRoutes();
exports.default = materiasEstudianteRoutes.router;
