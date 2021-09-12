"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_aptitudcontroller_1 = require("../controllers/test-aptitudcontroller");
class TestAptitudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', test_aptitudcontroller_1.testAptitudController.list);
        // this.router.get('/:id',testAptitudController.getOne);
        // this.router.post('/',testAptitudController.create);
        // this.router.delete('/:id',testAptitudController.delete);
        // this.router.put('/:id',testAptitudController.update);
    }
}
const testAptitudRoutes = new TestAptitudRoutes();
exports.default = testAptitudRoutes.router;
