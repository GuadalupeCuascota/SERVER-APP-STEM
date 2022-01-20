"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrerasficaController = void 0;
const database_1 = __importDefault(require("../database"));
class CarrerasFicaController {
    async list(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT * FROM carreras_fica ORDER BY id_carrera DESC", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("Datos seleccionados probando1");
            }
        });
    }
    async getOne(req, res) {
        // pool.query("INSERT INTO rol set ?", [req.body]);
        const { id } = req.params;
        const carreras = await database_1.default.query("SELECT * FROM carreras_fica WHERE id_carrera=?", [id]);
        console.log(carreras);
        if (carreras.length > 0) {
            return res.json(carreras[0]);
        }
        res.json({ text: "la carrera no existe" });
    }
    async create(req, res) {
        try {
            const nombre_carrera = req.body.nombre_carrera;
            const ruta_archivo_carrera = req.body.ruta_archivo_carrera;
            const descripcion = req.body.descripcion;
            const query = "INSERT INTO carreras_fica(nombre_carrera,ruta_archivo_carrera,descripcion)VALUES (?,?,?)";
            await database_1.default.query(query, [nombre_carrera, ruta_archivo_carrera, descripcion]);
            res.status(201).json({ text: "carrera guardada" });
        }
        catch (err) {
            res.status(404).json({ text: "hubo un error" });
            console.log(err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.query(" DELETE FROM carreras_fica WHERE id_carrera=?", [id]);
            res.status(201).json({ text: "carrera eliminada" });
        }
        catch (err) {
            res.status(404).json({ text: err });
            console.log("No se puede eliminar" + err);
        }
    }
    // res.json({ text: "eliminando" + req.params.id });
    async update(req, res) {
        console.log("pasa actualizar");
        const { id } = req.params;
        const { id_carrera, nombre_carrera } = req.body;
        if (id_carrera) {
            try {
                const roles = await database_1.default.query(" UPDATE  carreras_fica set nombre_carrera=? WHERE id_carrera=?", [nombre_carrera, id]);
                res.status(201).json({ text: "carrera actualizada" });
            }
            catch (error) {
                res.status(404).json({ text: "No se puede actualizar" });
                console.log("No se puede actualizar" + error);
            }
        }
        else {
            res.json({ message: "Atributos requeridos" });
        }
    }
}
exports.carrerasficaController = new CarrerasFicaController();
