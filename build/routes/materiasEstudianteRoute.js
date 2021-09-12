"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
class MateriasEstudianteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', materiasController_1.materiasController.getMateriasPorCarrera);
    }
}
const materiasEstudianteRoutes = new MateriasEstudianteRoutes();
exports.default = materiasEstudianteRoutes.router;
