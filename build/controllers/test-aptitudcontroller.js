"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    list1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.default.query("SELECT p.pregunta, o.opcion, o.id_pregunta from test_aptitud t, pregunta p, opciones o where t.id_test_aptitud=p.id_test_aptitud and o.id_pregunta=p.id_pregunta");
            console.log(roles);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const roles = await pool.query("SELECT * FROM rol");
            // res.json(roles);
            yield database_1.default.query("SELECT o.opcion, o.opcion2,o.opcion3, p.pregunta from opciones o, pregunta p where o.id_pregunta=p.id_pregunta", (err, rows) => {
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
        });
    }
    listOpcionesP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const roles = await pool.query("SELECT * FROM rol");
            // res.json(roles);
            yield database_1.default.query("SELECT * FROM opciones", (err, rows) => {
                if (err) {
                    res.json("error al cargar");
                    console.log(err);
                }
                else {
                    res.json(rows);
                    console.log("Datos seleccionados probando1");
                }
            });
        });
    }
}
exports.testAptitudController = new TestAptitudController(); //instanciar la clase
