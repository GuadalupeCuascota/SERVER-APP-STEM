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
exports.consultasDashboardController = void 0;
const database_1 = __importDefault(require("../database"));
class ConsultasDashboardController {
    NroEstudiantesMes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const convert = yield database_1.default.query("SET lc_time_names = 'es_ES'");
            yield database_1.default.query("SELECT MONTHNAME(fecha_registro) as 'Mes',COUNT(id_usuario) as 'NroEstudiantes' from usuario where id_rol=4 group by monthname(fecha_registro)", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log(rows);
                }
            });
        });
    }
    NromentoriasAgend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const convert = yield database_1.default.query("SET lc_time_names = 'es_ES'");
            yield database_1.default.query("SELECT MONTHNAME(r.fecha) as 'Mes',COUNT(a.id_agendamiento_mentoria) as 'NroMentoriasAgendadas' from agendamiento_mentorias a, registro_mentoria r where r.id_registro_mentoria=a.id_registro_mentoria group by monthname(r.fecha)", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log(rows);
                }
            });
        });
    }
}
exports.consultasDashboardController = new ConsultasDashboardController();
