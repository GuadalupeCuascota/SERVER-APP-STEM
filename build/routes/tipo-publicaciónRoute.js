"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_publicaci_nController_1 = require("../controllers/tipo-publicaci\u00F3nController");
class TipoPublicacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", tipo_publicaci_nController_1.tipoPublicaciónController.list);
        this.router.get("/:id", tipo_publicaci_nController_1.tipoPublicaciónController.getOne);
        this.router.post("/", tipo_publicaci_nController_1.tipoPublicaciónController.create);
        this.router.delete("/:id", tipo_publicaci_nController_1.tipoPublicaciónController.delete);
        this.router.put("/:id", tipo_publicaci_nController_1.tipoPublicaciónController.update);
    }
}
const tipoPublicacionRoutes = new TipoPublicacionRoutes();
exports.default = tipoPublicacionRoutes.router;
