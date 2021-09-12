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
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database"));
class RolesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const roles = await pool.query("SELECT * FROM rol");
            // res.json(roles);
            yield database_1.default.query("SELECT * FROM rol", (err, rows) => {
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
            // pool.query("INSERT INTO rol set ?", [req.body]);
            const { id } = req.params;
            const roles = yield database_1.default.query("SELECT * FROM rol WHERE id_rol=?", [id]);
            console.log(roles);
            if (roles.length > 0) {
                return res.json(roles[0]);
            }
            res.json({ text: "el rol no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipo_rol = req.body.tipo_rol;
                const query = "INSERT INTO rol(tipo_rol)VALUES (?)";
                yield database_1.default.query(query, [tipo_rol]);
                res.status(201).json({ text: "Guardado" });
            }
            catch (err) {
                res.status(400).json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query(" DELETE FROM rol WHERE id_rol=?", [id]);
                res.status(204).json({ message: "el dato fue eliminado" });
            }
            catch (err) {
                res.status(404).json({ text: "Hubo un error " });
            }
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id_rol, tipo_rol } = req.body;
            if (tipo_rol) {
                try {
                    const roles = yield database_1.default.query(" UPDATE rol set ? WHERE id_rol=?", [req.body, id]);
                    res.json({ message: "actualizado" });
                }
                catch (error) {
                    res.json({ text: "Hubo un error ", error });
                    console.log("No se puede actualizar" + error);
                }
            }
            else {
                res.json({ message: "Atributos requeridos" });
            }
        });
    }
}
exports.rolesController = new RolesController(); //instanciar la clase
