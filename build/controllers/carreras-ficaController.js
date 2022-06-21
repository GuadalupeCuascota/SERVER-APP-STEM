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
        const cloudinary = require("cloudinary");
        cloudinary.config({
            //conexion a cloudinary
            cloud_name: "dlmebnxnv",
            api_key: "941161988641637",
            api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
        });
        const fs = require("fs-extra");
        try {
            const { nombre_carrera, descripcion, siglas } = req.body;
            console.log("siglas", siglas);
            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                console.log(result);
                const ruta_archivo = result.secure_url;
                const query = "INSERT INTO carreras_fica(nombre_carrera,ruta_archivo,descripcion,siglas)VALUES (?,?,?,?)";
                await database_1.default.query(query, [
                    nombre_carrera,
                    ruta_archivo,
                    descripcion,
                    siglas,
                ]);
                console.log("id carrera", siglas);
                await fs.unlink(req.file.path); //eliminar de archivo de la ruta local
                res.status(201).json({ text: "Archivo guardado" });
            }
            else {
                try {
                    const query1 = "INSERT INTO carreras_fica(nombre_carrera,descripcion,siglas)VALUES (?,?,?)";
                    await database_1.default.query(query1, [nombre_carrera, descripcion, siglas]);
                    res.status(201).json({ text: "Archivo guardado" });
                }
                catch (error) {
                    res.status(404).json({ text: "error no se puede guardar" });
                }
            }
        }
        catch (error) {
            res.status(404).json({ text: "error no se puede guardar" });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        const cloudinary = require("cloudinary");
        cloudinary.config({
            //conexion a cloudinary
            cloud_name: "dlmebnxnv",
            api_key: "941161988641637",
            api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
        });
        const carrera = await database_1.default.query("SELECT * FROM carreras_fica WHERE id_carrera=?", [id]);
        if (carrera.length > 0) {
            await database_1.default.query(" DELETE FROM carreras_fica WHERE id_carrera=?", [id]);
            return res.status(204).json({ message: "el archivo fue eliminado" });
        }
        return res.status(404).json({ text: "el archivo no existe" });
    }
    // res.json({ text: "eliminando" + req.params.id });
    async update(req, res) {
        console.log("pasa actualizar");
        const cloudinary = require("cloudinary");
        cloudinary.config({
            cloud_name: "dlmebnxnv",
            api_key: "941161988641637",
            api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
        });
        const fs = require("fs-extra");
        try {
            const { id } = req.params;
            const { nombre_carrera, siglas, descripcion, ruta_archivo } = req.body;
            console.log("carrera", nombre_carrera);
            if (req.file) {
                try {
                    const query = " UPDATE  carreras_fica set nombre_carrera=?, siglas=?,descripcion=?,ruta_archivo=? WHERE id_carrera=?";
                    const result = await cloudinary.v2.uploader.upload(req.file.path);
                    console.log(result);
                    await database_1.default.query(query, [
                        nombre_carrera,
                        siglas,
                        descripcion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "carrera actualizada" });
                }
                catch (error) {
                    console.log(error);
                    return res.status(404).json({ text: "Hubo un error ", error });
                }
            }
            else {
                try {
                    const query = " UPDATE  carreras_fica set nombre_carrera=?, siglas=?,descripcion=?,ruta_archivo=? WHERE id_carrera=?";
                    const ruta_archivo = req.body.ruta_archivo;
                    await database_1.default.query(query, [
                        nombre_carrera,
                        siglas,
                        descripcion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "carrera actualizada" });
                }
                catch (error) {
                    console.log("el error", error);
                    return res.status(404).json({ text: "Hubo un error " });
                }
            }
        }
        catch (error) {
            console.log("no se puede actualizar" + error);
            return res.status(404).json({ text: "Hubo un error " });
        }
        //   const {id} = req.params;
        //   const{id_carrera,nombre_carrera}=req.body
        //  if(id_carrera){
        //    try {
        //     const roles= await pool.query(" UPDATE  carreras_fica set nombre_carrera=? WHERE id_carrera=?",[nombre_carrera,id]);
        //     res.status(201).json({ text: "carrera actualizada" });
        //    } catch (error) {
        //     res.status(404).json({ text: "No se puede actualizar" });
        //     console.log("No se puede actualizar"+ error)
        //    }
        // } else{
        //   res.json({ message: "Atributos requeridos"});
        // }
    }
}
exports.carrerasficaController = new CarrerasFicaController();
