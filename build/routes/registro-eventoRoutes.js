"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registro_eventoController_1 = require("../controllers/registro-eventoController");
class EventosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", registro_eventoController_1.eventosController.list);
        this.router.get("/:idP/:idU", registro_eventoController_1.eventosController.verificar);
        this.router.post("/:idP/:idU", registro_eventoController_1.eventosController.createEvento);
        this.router.delete("/:idP/:idU", registro_eventoController_1.eventosController.deleteEvento);
        // this.router.delete("/:id",eventosController.delete);
        // this.router.put("/:id",eventosController.update );
    }
}
const eventoRoutes = new EventosRoutes();
exports.default = eventoRoutes.router;
