"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materiasCarreraController = void 0;
const database_1 = __importDefault(require("../database"));
class MateriasCarreraController {
    async list(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT m.nombre_materia, c.nombre_carrera from materia m, carreras_fica c , materia_carrera mc where mc.id_materia=m.id_materia and mc.id_carrera=c.id_carrera", (err, rows) => {
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
        const materias = await database_1.default.query("SELECT * FROM materia WHERE id_materia=?", [id]);
        console.log(materias);
        if (materias.length > 0) {
            return res.json(materias[0]);
        }
        res.json({ text: "la materia no existe" });
    }
    async create(req, res) {
        console.log("ENTRA");
        try {
            const nombre_materia = req.body.nombre_materia;
            const nombre_carrera = req.body.nombre_carrera;
            console.log("el nombre", nombre_materia);
            console.log("carrera", nombre_carrera);
            const query = "INSERT into materia_carrera (id_materia,id_carrera) VALUES ((select id_materia from materia where nombre_materia=?),(select id_carrera from carreras_fica where nombre_carrera=?))";
            await database_1.default.query(query, [nombre_materia, nombre_carrera]);
            res.status(201).json({ text: " Guardado" });
        }
        catch (err) {
            res.status(404).json({ text: "Hubo un error " });
            console.log("hubo un errro" + err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.query(" DELETE FROM materia WHERE id_materia=?", [id]);
            res.status(201).json({ text: "materia eliminada" });
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
        const { id_materia, nombre_materia } = req.body;
        if (id_materia) {
            try {
                const roles = await database_1.default.query(" UPDATE  materia set nombre_materia=? WHERE id_materia=?", [nombre_materia, id]);
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
    }
}
exports.materiasCarreraController = new MateriasCarreraController();
