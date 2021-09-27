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
exports.archivosController = void 0;
const database_1 = __importDefault(require("../database"));
class ArchivosController {
    listP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.estado_profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera ORDER BY fecha_publicacion DESC", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos de publicaciones seleccionados");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const publicacion = yield database_1.default.query("SELECT * FROM publicacion WHERE id_publicacion=?", [id]);
            if (publicacion.length > 0) {
                return res.status(200).json(publicacion[0]);
            }
            res.status(404).json({ text: "publicación no existe" });
        });
    }
    getPublicacionC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const publicacion = yield database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera and u.id_carrera=?", [id]);
            if (publicacion.length > 0) {
                return res.status(200).json(publicacion);
            }
            res.status(404).json({ text: "publicación no existe" });
        });
    }
    // public async create1(req: Request, res: Response) {
    //   console.log("ARCHIVO CLOUDINARY");
    //   const cloudinary = require("cloudinary");
    //   cloudinary.config({
    //     //conexion a cloudinary
    //     cloud_name: "dlmebnxnv",
    //     api_key: "941161988641637",
    //     api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
    //   });
    //   const fs = require("fs-extra");
    //   try {
    //     const {
    //       titulo,
    //       nombre_perfil,
    //       descripcion,
    //       enlace,
    //       profesion,
    //       estado_profesion,
    //       id_tipo_publicacion,
    //       id_usuario,
    //       id_estado_publicacion,
    //       id_carrera,
    //     } = req.body;
    //     const result=await cloudinary.v2.uploader.upload(req.file.path)
    //     const query =
    //       "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,public_id_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
    //     if (req.file) {
    //       console.log("ESISTE ARCHIVO");
    //       const tipo_archivo = req.file.mimetype;
    //       const ruta_archivo=result.ruta_archivo;
    //       const public_id=result.public_id
    //       await pool.query(query, [
    //         titulo,
    //         nombre_perfil,
    //         descripcion,
    //         enlace,
    //         profesion,
    //         estado_profesion,
    //         ruta_archivo,
    //         public_id,
    //         tipo_archivo,
    //         id_tipo_publicacion,
    //         id_usuario,
    //         id_estado_publicacion,
    //         id_carrera,
    //       ]);
    //       await fs.unlink(req.file.path); //eliminar de archivo de la ruta local
    //       res.status(201).json({ text: "Archivo guardado" });
    //     } else {
    //       const query1 =
    //         "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
    //       console.log("no tiene archivo");
    //       await pool.query(query1, [
    //         titulo,
    //         nombre_perfil,
    //         descripcion,
    //         enlace,
    //         profesion,
    //         estado_profesion,
    //         id_tipo_publicacion,
    //         id_usuario,
    //         id_estado_publicacion,
    //         id_carrera,
    //       ]);
    //       res.status(201).json({ text: "Archivo guardado" });
    //     }
    //   } catch (err) {
    //     console.log("hubo un error AQUI" + err);
    //     res.status(404).json({ text: "error no se puede guardar" });
    //   }
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cloudinary = require("cloudinary");
            cloudinary.config({
                //conexion a cloudinary
                cloud_name: "dlmebnxnv",
                api_key: "941161988641637",
                api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
            });
            const fs = require("fs-extra");
            try {
                const { titulo, nombre_perfil, descripcion, enlace, profesion, estado_profesion, id_tipo_publicacion, id_usuario, id_estado_publicacion, id_carrera, } = req.body;
                if (req.file.mimetype == "video/mp4") {
                    yield cloudinary.v2.uploader.upload(req.file.path, {
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
                        if (req.file) {
                            console.log("ESISTE ARCHIVO");
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
                                id_carrera,
                            ]);
                            fs.unlink(req.file.path); //eliminar de archivo de la ruta local
                            res.status(201).json({ text: "Archivo guardado" });
                        }
                        else {
                            const query1 = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                            console.log("no tiene archivo");
                            database_1.default.query(query1, [
                                titulo,
                                nombre_perfil,
                                descripcion,
                                enlace,
                                profesion,
                                estado_profesion,
                                id_tipo_publicacion,
                                id_usuario,
                                id_estado_publicacion,
                                id_carrera,
                            ]);
                            res.status(201).json({ text: "Archivo guardado" });
                        }
                    });
                }
                else {
                    const result = yield cloudinary.v2.uploader.upload(req.file.path);
                    console.log(result);
                    const tipo_archivo = req.file.mimetype;
                    const ruta_archivo = result.secure_url;
                    const public_id = result.public_id;
                    console.log("ruta_archivo", ruta_archivo);
                    const query = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,public_id_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                    if (req.file) {
                        console.log("EXISTE ARCHIVO");
                        yield database_1.default.query(query, [
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
                            id_carrera,
                        ]);
                        yield fs.unlink(req.file.path); //eliminar de archivo de la ruta local
                        res.status(201).json({ text: "Archivo guardado" });
                    }
                    else {
                        const query1 = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                        console.log("no tiene archivo");
                        yield database_1.default.query(query1, [
                            titulo,
                            nombre_perfil,
                            descripcion,
                            enlace,
                            profesion,
                            estado_profesion,
                            id_tipo_publicacion,
                            id_usuario,
                            id_estado_publicacion,
                            id_carrera,
                        ]);
                        res.status(201).json({ text: "Archivo guardado" });
                    }
                }
            }
            catch (error) {
                res.status(404).json({ text: "error no se puede guardar" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cloudinary = require("cloudinary");
            cloudinary.config({
                //conexion a cloudinary
                cloud_name: "dlmebnxnv",
                api_key: "941161988641637",
                api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
            });
            const publicacion = yield database_1.default.query("SELECT * FROM publicacion WHERE id_publicacion=?", [id]);
            console.log("publicacion a eliminas", publicacion);
            if (publicacion.length > 0) {
                console.log("pasa");
                const archivo = yield database_1.default.query(" DELETE FROM publicacion WHERE id_publicacion=?", [id]);
                yield cloudinary.v2.uploader.destroy(publicacion[0].public_id_archivo);
                return res.status(204).json({ message: "el archivo fue eliminado" });
            }
            return res.status(404).json({ text: "el archivo no existe" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                console.log("id: " + id);
                const { titulo, descripcion, enlace, profesion, estado_profesion } = req.body;
                const query = "UPDATE publicacion set titulo=?,descripcion=?,enlace=?, profesion=?,estado_profesion=?, ruta_archivo=? WHERE id_publicacion=?";
                if (req.file) {
                    const result = yield cloudinary.v2.uploader.upload(req.file.path);
                    const ruta_archivo = result.url;
                    database_1.default.query(query, [
                        titulo,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
                else {
                    const ruta_archivo = null;
                    database_1.default.query(query, [
                        titulo,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
            }
            catch (err) {
                console.log("no se puede actualizar" + err);
                return res.status(404).json({ text: "Hubo un error " });
            }
        });
    }
}
exports.archivosController = new ArchivosController(); //instanciar la clase
