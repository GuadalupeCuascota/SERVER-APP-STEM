"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgendarMentoriaController_1 = require("../controllers/AgendarMentoriaController");
class SolicitudesMentoriaRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', AgendarMentoriaController_1.agendarMentoriaController.listsolicitudes);
        this.router.put('/:id', AgendarMentoriaController_1.agendarMentoriaController.update);
    }
}
const solicitudesMentoriaRoutes = new SolicitudesMentoriaRoutes;
exports.default = solicitudesMentoriaRoutes.router;
