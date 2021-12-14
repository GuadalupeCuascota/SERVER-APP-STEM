"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temaMateriaController_1 = require("../controllers/temaMateriaController");
class TemaMateriaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', temaMateriaController_1.temaMateriaController.getOne);
        this.router.post('/', temaMateriaController_1.temaMateriaController.create);
        this.router.delete('/:id', temaMateriaController_1.temaMateriaController.delete);
    }
}
const temaMateriaRoutes = new TemaMateriaRoutes();
exports.default = temaMateriaRoutes.router;
