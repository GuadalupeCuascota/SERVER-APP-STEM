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
exports.solicitudMentoriaController = void 0;
const database_1 = __importDefault(require("../database"));
class SolicitudMentoriaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT sm.id_solicitud_mentoria, sm.materia,sm.tema, u.nombre ,u.apellido,u.correo_electronico,u.carrera,sm.fecha_solicitud_mentoria from solicitud_mentoria sm, usuario u where u.id_usuario=sm.id_usuario ORDER BY sm.fecha_solicitud_mentoria DESC ", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos seleccionados probando1");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const solicitudes = yield database_1.default.query("SELECT sm.id_solicitud_mentoria,sm.materia,sm.tema, u.nombre ,u.apellido,u.carrera, sm.fecha_solicitud_mentoria from solicitud_mentoria sm, usuario u where u.id_usuario=sm.id_usuario and u.id_usuario=?", [id]);
            if (solicitudes.length > 0) {
                res.status(200).json(solicitudes);
            }
            else {
                res.status(404).json("No existe la mentoria");
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRA");
            try {
                const materia = req.body.materia;
                const tema = req.body.tema;
                const id_usuario = req.body.id_usuario;
                console.log("id_usuario", id_usuario);
                const query = "INSERT into solicitud_mentoria (materia,tema,id_usuario) VALUES (?,?,?)";
                yield database_1.default.query(query, [materia, tema, id_usuario]);
                res.status(201).json({ text: " Guardado" });
            }
            catch (err) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query(" DELETE FROM `solicitud_mentoria` WHERE id_solicitud_mentoria=?", [id]);
                res.status(201).json({ text: "materia eliminada" });
            }
            catch (err) {
                res.status(404).json({ text: err });
                console.log("No se puede eliminar" + err);
            }
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa actualizar");
            const { id } = req.params;
            const { id_materia, nombre_materia } = req.body;
            if (id_materia) {
                try {
                    const roles = yield database_1.default.query(" UPDATE  materia set nombre_materia=? WHERE id_materia=?", [nombre_materia, id]);
                    res.status(201).json({ message: "actualizado" });
                }
                catch (error) {
                    res.status(404).json({ text: "Hubo un error ", error });
                    console.log("No se puede actualizar" + error);
                }
            }
            else {
                res.json({ message: "Atributos requeridos" });
            }
        });
    }
}
exports.solicitudMentoriaController = new SolicitudMentoriaController();
