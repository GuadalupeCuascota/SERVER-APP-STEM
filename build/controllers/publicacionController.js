"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archivosController = void 0;
const database_1 = __importDefault(require("../database"));
class ArchivosController {
    async listP(req, res) {
        await database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.estado_profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera ORDER BY fecha_publicacion DESC", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("Datos de publicaciones seleccionados");
            }
        });
    }
    async getOne(req, res) {
        const { id } = req.params;
        const publicacion = await database_1.default.query("SELECT p.id_publicacion, p.titulo, p.nombre_perfil, p.fecha_publicacion, p.descripcion, p.estado_profesion, p.ruta_archivo, p.public_id_archivo, p.tipo_archivo, p.id_tipo_publicacion, p.id_usuario, p.id_estado_publicacion, p.id_carrera,c.nombre_carrera,p.enlace ,p.profesion FROM publicacion p , carreras_fica c   WHERE  p.id_carrera=c.id_carrera and p.id_publicacion=?", [id]);
        if (publicacion.length > 0) {
            return res.status(200).json(publicacion[0]);
        }
        res.status(404).json({ text: "publicación no existe" });
    }
    async getPublicacionC(req, res) {
        const { id } = req.params;
        console.log(id);
        const publicacion = await database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera and u.id_carrera=?", [id]);
        if (publicacion.length > 0) {
            return res.status(200).json(publicacion);
        }
        res.status(404).json({ text: "publicación no existe" });
    }
    async create(req, res) {
        console.log("PASA CREAR hoy");
        const cloudinary = require("cloudinary");
        cloudinary.config({
            //conexion a cloudinary
            cloud_name: "dlmebnxnv",
            api_key: "941161988641637",
            api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
        });
        const fs = require("fs-extra");
        try {
            const { titulo, nombre_perfil, descripcion, enlace, profesion, estado_profesion, id_tipo_publicacion, id_usuario, id_estado_publicacion, nombre_carrera, } = req.body;
            console.log("titulo", titulo);
            console.log("nombre perfil", nombre_perfil);
            console.log("descripcion", descripcion);
            console.log("enlace", enlace);
            console.log("profesion", profesion);
            console.log("estado profesion", estado_profesion);
            console.log("id tipo publicacion", id_tipo_publicacion);
            console.log("id usuario", id_usuario);
            console.log("id_estado_publicacion", id_estado_publicacion);
            console.log("nombre_carrera", nombre_carrera);
            console.log("reqq", req.file);
            if (req.file) {
                console.log("SI EXSISTE ARCHIVO");
                if (req.file.mimetype == "video/mp4") {
                    await cloudinary.v2.uploader.upload(req.file.path, {
                        resource_type: "video",
                        // public_id: "myfolder/mysubfolder/dog_closeup",
                        chunk_size: 6000000,
                        eager: [
                            { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                            {
                                width: 160,
                                height: 100,
                                crop: "crop",
                                gravity: "south",
                                audio_codec: "none",
                            },
                        ],
                        eager_async: true,
                        eager_notification_url: "https://mysite.example.com/notify_endpoint",
                    }, function (error, result) {
                        console.log(result, error);
                        const ruta_archivo = result.secure_url;
                        const public_id = result.public_id;
                        console.log("ruta archivo", ruta_archivo);
                        console.log("poublic id", public_id);
                        const query = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,public_id_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                        const tipo_archivo = req.file.mimetype;
                        console.log(ruta_archivo);
                        console.log(req.file.mimetype);
                        database_1.default.query(query, [
                            titulo,
                            nombre_perfil,
                            descripcion,
                            enlace,
                            profesion,
                            estado_profesion,
                            ruta_archivo,
                            public_id,
                            tipo_archivo,
                            id_tipo_publicacion,
                            id_usuario,
                            id_estado_publicacion,
                            nombre_carrera,
                        ]);
                        fs.unlink(req.file.path); //eliminar de archivo de la ruta local
                        res.status(201).json({ text: "Archivo guardado" });
                    });
                }
                else {
                    const result = await cloudinary.v2.uploader.upload(req.file.path);
                    console.log(result);
                    const tipo_archivo = req.file.mimetype;
                    const ruta_archivo = result.secure_url;
                    const public_id = result.public_id;
                    console.log("ruta_archivo", ruta_archivo);
                    const query = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,public_id_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                    console.log("EXISTE ARCHIVO");
                    await database_1.default.query(query, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        public_id,
                        tipo_archivo,
                        id_tipo_publicacion,
                        id_usuario,
                        id_estado_publicacion,
                        nombre_carrera,
                    ]);
                    console.log("id carrera", nombre_carrera);
                    await fs.unlink(req.file.path); //eliminar de archivo de la ruta local
                    res.status(201).json({ text: "Archivo guardado" });
                }
            }
            else {
                console.log("no tiene archivo");
                try {
                    const query1 = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                    await database_1.default.query(query1, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        id_tipo_publicacion,
                        id_usuario,
                        id_estado_publicacion,
                        nombre_carrera,
                    ]);
                    res.status(201).json({ text: "Archivo guardado" });
                }
                catch (error) {
                    res.status(404).json({ text: "error no se puede guardar" });
                    console.log("no se puede guardar el" + error);
                }
            }
        }
        catch (error) {
            console.log(error);
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
        const publicacion = await database_1.default.query("SELECT * FROM publicacion WHERE id_publicacion=?", [id]);
        if (publicacion.length > 0) {
            await database_1.default.query(" DELETE FROM publicacion WHERE id_publicacion=?", [id]);
            if (publicacion[0].ruta_archivo) {
                await cloudinary.v2.uploader.destroy(publicacion[0].public_id_archivo);
                return res.status(204).json({ message: "el archivo fue eliminado" });
            }
            return res.status(204).json({ message: "el archivo fue eliminado" });
        }
        return res.status(404).json({ text: "el archivo no existe" });
    }
    async update(req, res) {
        const cloudinary = require("cloudinary");
        cloudinary.config({
            //conexion a cloudinary
            cloud_name: "dlmebnxnv",
            api_key: "941161988641637",
            api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
        });
        const fs = require("fs-extra");
        console.log("pasa server actualizar");
        try {
            const { id } = req.params;
            console.log("id s: " + id);
            const { titulo, nombre_perfil, descripcion, enlace, profesion, estado_profesion, ruta_archivo, nombre_carrera } = req.body;
            console.log("carrera", req.body.nombre_carrera);
            console.log("descr", req.body.descripcion);
            if (req.file) {
                console.log("existe archivo");
                try {
                    const query = "UPDATE publicacion set titulo=?,nombre_perfil=?,descripcion=?,enlace=?, profesion=?,estado_profesion=?, ruta_archivo=? ,tipo_archivo=?,public_id_archivo=?, id_carrera=(select id_carrera from carreras_fica where nombre_carrera=?) WHERE id_publicacion=?";
                    const result = await cloudinary.v2.uploader.upload(req.file.path);
                    console.log(result);
                    const tipo_archivo = req.file.mimetype;
                    const ruta_archivo = result.secure_url;
                    const public_id = result.public_id;
                    await database_1.default.query(query, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        tipo_archivo,
                        public_id,
                        nombre_carrera,
                        id
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
                catch (error) {
                    console.log(error);
                    return res.status(404).json({ text: "Hubo un error ", error });
                }
            }
            else {
                try {
                    const query = "UPDATE publicacion set titulo=?,nombre_perfil=?,descripcion=?,enlace=?, profesion=?,estado_profesion=?, ruta_archivo=?,  id_carrera=(select id_carrera from carreras_fica where nombre_carrera=?) WHERE id_publicacion=?";
                    console.log("NO EXISTE");
                    const ruta_archivo = req.body.ruta_archivo;
                    await database_1.default.query(query, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        nombre_carrera,
                        id,
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
                catch (error) {
                    console.log("el error", error);
                    return res.status(404).json({ text: "Hubo un error " });
                }
            }
        }
        catch (err) {
            console.log("no se puede actualizar" + err);
            return res.status(404).json({ text: "Hubo un error " });
        }
    }
}
exports.archivosController = new ArchivosController(); //instanciar la clase
