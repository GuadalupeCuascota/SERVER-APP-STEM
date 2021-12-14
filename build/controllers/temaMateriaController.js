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
exports.temaMateriaController = void 0;
const database_1 = __importDefault(require("../database"));
class TemaMateriaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const roles = await pool.query("SELECT * FROM rol");
            // res.json(roles);
            yield database_1.default.query("SELECT tm.nombre_tema, tm.id_tema_materia ,m.id_materia ,m.nombre_materia FROM tema_materia tm , materia m where m.id_materia=? and m.id_materia=tm.id_materia", (err, rows) => {
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
            const temas = yield database_1.default.query("SELECT tm.nombre_tema, tm.id_tema_materia ,m.id_materia ,m.nombre_materia FROM tema_materia tm , materia m where m.id_materia=? and m.id_materia=tm.id_materia", [id]);
            console.log(temas);
            if (temas.length > 0) {
                return res.json(temas);
            }
            res.json({ text: "la materia no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRA");
            try {
                const nombre_tema = req.body.nombre_tema;
                const id_materia = req.body.id_materia;
                console.log("el nombre", nombre_tema);
                console.log("carrera", id_materia);
                const query = "INSERT INTO tema_materia ( nombre_tema, id_materia) VALUES (?,?)";
                yield database_1.default.query(query, [nombre_tema, id_materia]);
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
                yield database_1.default.query(" DELETE FROM  tema_materia WHERE id_tema_materia=?", [id]);
                res.status(201).json({ text: "tema eliminada" });
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
exports.temaMateriaController = new TemaMateriaController();
