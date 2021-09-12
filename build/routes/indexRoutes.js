"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('', indexController_1.indexController.index);
        //(req,res)=> res.send('Hello'))
    }
}
const indexRoute = new indexRoutes();
exports.default = indexRoute.router;
