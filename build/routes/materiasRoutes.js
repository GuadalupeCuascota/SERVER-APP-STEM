"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
class MateriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', materiasController_1.materiasController.list);
        this.router.get('/:id', materiasController_1.materiasController.getOne);
        this.router.post('/', materiasController_1.materiasController.create);
        this.router.delete('/:id', materiasController_1.materiasController.delete);
        this.router.put('/:id', materiasController_1.materiasController.update);
    }
}
const materiasRoutes = new MateriasRoutes();
exports.default = materiasRoutes.router;
