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
exports.tipoPublicaciónController = void 0;
const database_1 = __importDefault(require("../database"));
class TipoPublicacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT * FROM tipo_publicacion", (err, rows) => {
                if (err) {
                    res.json("error al cargar");
                    console.log(err);
                }
                else {
                    res.json(rows);
                    console.log("Datos seleccionados");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tipoPublicación = yield database_1.default.query("SELECT * FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);
            if (tipoPublicación.length > 0) {
                return res.json(tipoPublicación[0]);
            }
            res.status(404).json({ text: "el tipo de publicación no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre_tipo_publicacion = req.body.nombre_tipo_publicacion;
            console.log(nombre_tipo_publicacion);
            const query = "INSERT INTO tipo_publicacion (nombre_tipo_publicacion) VALUES (?)";
            if (nombre_tipo_publicacion) {
                database_1.default.query(query, [nombre_tipo_publicacion]);
                res.json("tipo publicación guardado");
            }
            else {
                console.log("no se puede guardar");
                res.json("NO se puede guardar");
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("DELETE FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);
                res.json({ status: 'Eliminado' });
            }
            catch (error) {
                res.json({ text: "Hubo un error " });
                console.log("No se puede eliminar" + error);
            }
            // try {
            //   await pool.query("DELETE FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);
            //   res.json({status: 'Elimindado'});
            // } catch(err) {
            //   console.log("hola"+err);
            //   res.json({status: 'error'});
            // }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const roles = yield database_1.default.query(" UPDATE tipo_publicacion set ? WHERE id_tipo_publicacion=?", [req.body, id]);
                res.json({ message: "actualizado" });
            }
            catch (error) {
                res.json({ text: "Hubo un error " });
                console.log("No se puede actualizar" + error);
            }
        });
    }
}
exports.tipoPublicaciónController = new TipoPublicacionController(); //instanciar la clase
