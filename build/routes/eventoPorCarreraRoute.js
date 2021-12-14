"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultas_dashboard_1 = require("../controllers/consultas-dashboard");
class ConsultasDashoardEventoCarreraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', consultas_dashboard_1.consultasDashboardController.eventosPorCarrera);
    }
}
const consultasDashboardEventosCarreraRoutes = new ConsultasDashoardEventoCarreraRoutes();
exports.default = consultasDashboardEventosCarreraRoutes.router;
