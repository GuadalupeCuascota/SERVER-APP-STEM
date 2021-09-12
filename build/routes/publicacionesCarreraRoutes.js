"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionController_1 = require("../controllers/publicacionController");
class PublicacionCarreraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/:id", publicacionController_1.archivosController.getPublicacionC);
    }
}
const publicacionCarreraRoutes = new PublicacionCarreraRoutes();
exports.default = publicacionCarreraRoutes.router;
