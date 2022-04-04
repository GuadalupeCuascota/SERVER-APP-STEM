"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultasDashboardController = void 0;
const database_1 = __importDefault(require("../database"));
class ConsultasDashboardController {
    async NroEstudiantesMes(req, res) {
        const convert = await database_1.default.query("SET lc_time_names = 'es_ES'");
        await database_1.default.query("SELECT MONTHNAME(fecha_registro) as 'Mes',COUNT(id_usuario) as 'NroEstudiantes' from usuario where id_rol=4 or id_rol=5 group by monthname(fecha_registro)", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log(rows);
            }
        });
    }
    async NromentoriasAgend(req, res) {
        const convert = await database_1.default.query("SET lc_time_names = 'es_ES'");
        await database_1.default.query("SELECT MONTHNAME(r.fecha) as 'Mes',COUNT(a.id_agendamiento_mentoria) as 'NroMentoriasAgendadas' from agendamiento_mentorias a, registro_mentoria r where r.id_registro_mentoria=a.id_registro_mentoria group by monthname(r.fecha)", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar ");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log(rows);
            }
        });
    }
    async eventosPorCarrera(req, res) {
        await database_1.default.query("select  c.nombre_carrera, c.id_carrera, count(id_tipo_evento) as 'likes' from evento e, publicacion p, carreras_fica c where e.id_tipo_evento=1 and c.id_carrera=p.id_carrera and p.id_publicacion=e.id_publicacion group by c.id_carrera", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar ");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log(rows);
            }
        });
    }
    async likesPorPerfil(req, res) {
        await database_1.default.query("select p.nombre_perfil, count(id_tipo_evento) as 'likes' from evento e, publicacion p where e.id_tipo_evento=1 and p.id_publicacion=e.id_publicacion and p.nombre_perfil is not null group by p.id_publicacion", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar ");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log(rows);
            }
        });
    }
}
exports.consultasDashboardController = new ConsultasDashboardController();
