"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgendarMentoriaController_1 = require("../controllers/AgendarMentoriaController");
class AgendarMentoriaRoutes {
    // 
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', AgendarMentoriaController_1.agendarMentoriaController.list);
        this.router.get('/:id', AgendarMentoriaController_1.agendarMentoriaController.getOne);
        this.router.post('/', AgendarMentoriaController_1.agendarMentoriaController.create);
        this.router.delete('/:id', AgendarMentoriaController_1.agendarMentoriaController.delete);
        this.router.put('/:id', AgendarMentoriaController_1.agendarMentoriaController.update);
    }
}
const agendarMentoriaRoutes = new AgendarMentoriaRoutes;
exports.default = agendarMentoriaRoutes.router;
