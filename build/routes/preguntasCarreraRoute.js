"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_aptitudcontroller_1 = require("../controllers/test-aptitudcontroller");
class PreguntasCarreraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', test_aptitudcontroller_1.testAptitudController.listPeguntasCarrera);
    }
}
const preguntasCarreraRoutes = new PreguntasCarreraRoutes();
exports.default = preguntasCarreraRoutes.router;
