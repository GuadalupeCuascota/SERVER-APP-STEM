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
exports.agendarMentoriaController = void 0;
const database_1 = __importDefault(require("../database"));
class AngerdarMentoriaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("select a.id_agendamiento_mentoria, r.fecha,r.hora_inicio,r.hora_fin,a.id_usuario,u.nombre,u.apellido,u.correo_electronico,t.nombre_estado_agen_mentoria, r.materia from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=r.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria", (err, rows) => {
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
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PASA AQUIII");
            const { id } = req.params;
            const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin, m.tipo_mentoria,m.,u.nombre,u.apellido ,m.materia from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?", [id]);
            console.log(registroMentorias);
            if (registroMentorias.length > 0) {
                return res.status(200).json(registroMentorias[0]);
            }
            res.status(404).json({ text: "El registro no existe" });
        });
    }
    listsolicitudesPorRegistro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("LIST SOLICITUDES");
            const { id } = req.params;
            const solicitudesPorRegistroMentoria = yield database_1.default.query("select a.id_agendamiento_mentoria ,r.fecha,r.hora_inicio,r.hora_fin,r.id_usuario,u.nombre,u.apellido,u.correo_electronico,t.nombre_estado_agen_mentoria,r.materia from tipo_estado_agend_mentoria t, registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and r.id_registro_mentoria=?", [id]);
            console.log(solicitudesPorRegistroMentoria);
            if (solicitudesPorRegistroMentoria.length > 0) {
                return res.status(200).json(solicitudesPorRegistroMentoria);
            }
            res.status(404).json({ text: "El registro no existeee" });
        });
    }
    getMentoriasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa usuario");
            const { id } = req.params;
            const registroMentoriasporUsuario = yield database_1.default.query("SELECT fecha, hora_inicio, hora_fin,tipo_mentoria from registro_mentoria WHERE id_usuario=?", [id]);
            console.log(registroMentoriasporUsuario);
            if (registroMentoriasporUsuario.length > 0) {
                return res.status(200).json(registroMentoriasporUsuario);
            }
            res.status(404).json({ text: "En este momento no existe mentorias disponibles" });
        });
    }
    updateEstadoRegistroMentoria(id_registro_mentoria, nombre_estado_mentoria) {
        console.log("PASA AQUI ACTUALIZAR ESTADO");
        try {
            console.log("id: " + id_registro_mentoria);
            console.log("id: " + nombre_estado_mentoria);
            if (id_registro_mentoria) {
                const query = "UPDATE registro_mentoria set id_estado_mentoria=? where id_registro_mentoria=?";
                database_1.default.query(query, [
                    nombre_estado_mentoria, id_registro_mentoria
                ]);
                return console.log("actualizado");
            }
            else {
                return console.log("no existe id registro mentoria");
            }
        }
        catch (err) {
        }
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa agendar mentoria");
            try {
                const { id_registro_mentoria, observacion, id_estado_agen_mentoria, id_usuario, } = req.body;
                console.log("registro:" + req.body.id_registro_mentoria);
                console.log("usuario:" + req.body.id_usuario);
                console.log("observacio" + req.body.observacion);
                console.log("id_estado_agen_mentoria", req.body.id_estado_agen_mentoria);
                const findAgendamiento = yield database_1.default.query("SELECT * FROM agendamiento_mentorias WHERE id_usuario=? and id_registro_mentoria=?", [id_usuario, id_registro_mentoria]);
                if (findAgendamiento.length > 0) {
                    res.status(404).json({ text: "La mentoria ya ha sido agendada" });
                }
                else {
                    const query = "INSERT INTO agendamiento_mentorias(id_registro_mentoria,observacion,id_estado_agen_mentoria,id_usuario) VALUES (?,?,?,?)";
                    yield database_1.default.query(query, [
                        id_registro_mentoria,
                        observacion,
                        id_estado_agen_mentoria,
                        id_usuario,
                    ]);
                    // this.updateEstadoRegistroMentoria(nombre_estado_mentoria,id_registro_mentoria);
                    res.status(201).json({ text: "mentoria agendada" });
                }
            }
            catch (err) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ELIMINAR AQUI");
            try {
                const { id } = req.params;
                console.log("id_registro:" + id);
                yield database_1.default.query(" DELETE FROM agendamiento_mentorias  WHERE id_agendamiento_mentoria=?", [id]);
                res.status(201).json({ text: "el dato fue eliminado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede eliminar" + error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("id: " + id);
                const nombre_estado_agen_mentoria = req.body.nombre_estado_agen_mentoria;
                console.log(nombre_estado_agen_mentoria);
                if (id) {
                    const query = "UPDATE agendamiento_mentorias set id_estado_agen_mentoria=(SELECT id_estado_agen_mentoria from tipo_estado_agend_mentoria where nombre_estado_agen_mentoria=?) where id_agendamiento_mentoria=?";
                    database_1.default.query(query, [
                        nombre_estado_agen_mentoria, id
                    ]);
                    res.status(200).json({ text: "Mentoría confirmada" });
                }
                else {
                    res.status(404).json({ text: "No existe mentoria agendada" });
                }
            }
            catch (err) {
                res.status(404).json({ text: "Hubo un error" });
            }
        });
    }
}
exports.agendarMentoriaController = new AngerdarMentoriaController();
