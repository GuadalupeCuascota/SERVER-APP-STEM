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
exports.eventosController = void 0;
const database_1 = __importDefault(require("../database"));
class EventosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT e.id_publicacion,p.titulo,u.nombre,u.apellido, t.nombre_tipo_evento FROM evento e,publicacion p, usuario u, tipo_evento t WHERE e.id_publicacion=p.id_publicacion and u.id_usuario=e.id_usuario and t.id_tipo_evento=e.id_tipo_evento", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos seleccionados");
                }
            });
        });
    }
    verificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idP, idU } = req.params;
            console.log("1", idU);
            console.log("2", idP);
            const verificar = yield database_1.default.query("SELECT * FROM evento WHERE id_publicacion=? and id_usuario=?", [idP, idU]);
            if (verificar.length > 0) {
                console.log("ya existe");
                res.status(201).json({ text: "ya existe" });
            }
            else {
                res.status(201).json({ text: "No existe" });
                console.log("no existe");
            }
        });
    }
    createEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa like");
            const { id_tipo_evento, id_publicacion, id_usuario, } = req.body;
            const query = "INSERT INTO evento (id_tipo_evento,id_publicacion,id_usuario) VALUES (?,?,?)";
            yield database_1.default.query(query, [id_tipo_evento, id_publicacion, id_usuario]);
            res.json({ text: "evento guardado" });
        });
    }
    deleteEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            const { idP, idU } = req.params;
            const verificar = yield database_1.default.query("SELECT * FROM evento WHERE id_publicacion=? and id_usuario=?", [idP, idU]);
            if (verificar.length > 0) {
                yield database_1.default.query("DELETE FROM evento WHERE id_usuario=? and  id_publicacion=?", [idU, idP]);
                res.status(204).json({ text: "evento eliminado" });
            }
            else {
                res.status(404).json({ text: "Hubo un error " });
            }
            //  } catch (error) {
            //   console.log("no se puede eliminar"+ error)
            //  }
        });
    }
}
exports.eventosController = new EventosController(); //instanciar la clase
