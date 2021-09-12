"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiaCarreraController_1 = require("../controllers/materiaCarreraController");
class MateriasCarreraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', materiaCarreraController_1.materiasCarreraController.list);
        this.router.get('/:id', materiaCarreraController_1.materiasCarreraController.getOne);
        this.router.post('/', materiaCarreraController_1.materiasCarreraController.create);
        this.router.delete('/:id', materiaCarreraController_1.materiasCarreraController.delete);
        this.router.put('/:id', materiaCarreraController_1.materiasCarreraController.update);
    }
}
const materiasCarreraRoutes = new MateriasCarreraRoutes();
exports.default = materiasCarreraRoutes.router;
