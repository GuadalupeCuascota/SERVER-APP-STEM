"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAptitudController = void 0;
const database_1 = __importDefault(require("../database"));
class TestAptitudController {
    constructor() {
        this.test = [];
        this.r = '';
    }
    async list1(req, res) {
        const roles = await database_1.default.query("SELECT p.pregunta, o.opcion, o.id_pregunta from test_aptitud t, pregunta p, opciones o where t.id_test_aptitud=p.id_test_aptitud and o.id_pregunta=p.id_pregunta");
        console.log(roles);
    }
    async listPeguntasCarrera(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT * FROM pregunta_ingenieria ORDER BY id_pregunta ASC", (err, rows) => {
            if (err) {
                res.json("error al cargar");
                console.log(err);
            }
            else {
                res.json(rows);
                console.log(rows);
                console.log("Datos seleccionados probando1");
            }
        });
    }
    async list(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT p.id_pregunta, p.pregunta, c.id_carrera FROM pregunta p , carreras_fica c where p.id_carrera=c.id_carrera  ORDER BY p.id_pregunta ASC", (err, rows) => {
            if (err) {
                res.json("error al cargar");
                console.log(err);
            }
            else {
                res.json(rows);
                console.log(rows);
                console.log("Datos seleccionados probando1");
            }
        });
    }
    async listOpcionesP(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT * FROM opciones", (err, rows) => {
            if (err) {
                res.json("error al cargar");
                console.log(err);
            }
            else {
                res.json(rows);
                console.log("Datos seleccionados probando1");
            }
        });
    }
}
exports.testAptitudController = new TestAptitudController(); //instanciar la clase
