"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitud_mentoriaController_1 = require("../controllers/solicitud-mentoriaController");
class SolicitudMentoriaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', solicitud_mentoriaController_1.solicitudMentoriaController.list);
        this.router.get('/:id', solicitud_mentoriaController_1.solicitudMentoriaController.getOne);
        this.router.post('/', solicitud_mentoriaController_1.solicitudMentoriaController.create);
        this.router.delete('/:id', solicitud_mentoriaController_1.solicitudMentoriaController.delete);
        this.router.put('/:id', solicitud_mentoriaController_1.solicitudMentoriaController.update);
    }
}
const solicitudMentoriaRoutes = new SolicitudMentoriaRoutes();
exports.default = solicitudMentoriaRoutes.router;
