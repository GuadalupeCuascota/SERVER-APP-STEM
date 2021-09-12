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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    // public async list(req: Request, res: Response) {
    //   const usuarios = await pool.query("SELECT * FROM usuario");
    //   res.json(usuarios);
    // }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT u.id_usuario, u.nombre, u.apellido,u.nivel_academico,u.carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol from usuario u, rol r where u.id_rol=r.id_rol ORDER BY fecha_registro DESC ", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos de usuarios seleccionados");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.query("SELECT u.id_usuario, u.nombre, u.apellido,u.nivel_academico,u.carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol from usuario u, rol r WHERE  r.id_rol=u.id_rol and u.id_usuario=?", [id]);
            console.log(usuarios);
            if (usuarios.length > 0) {
                return res.status(200).json(usuarios[0]);
            }
            res.status(404).json({ text: "el usuario no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa el servidor save");
            const { nombre, apellido, nivel_academico, carrera, unidad_educativa, correo_electronico, contrasenia, id_rol, } = req.body;
            console.log("cedula:" + req.body.id_rol);
            if (!id_rol) {
                const query = "INSERT INTO usuario ( nombre,apellido,nivel_academico,carrera,unidad_educativa,correo_electronico,contrasenia, id_rol) VALUES (?,?,?,?,?,?,?,(select id_rol from rol where tipo_rol=?) )";
                console.log("ES ESTUDANTE");
                const newId_rol = "Estudiante";
                try {
                    yield database_1.default.query(query, [
                        nombre,
                        apellido,
                        nivel_academico,
                        carrera,
                        unidad_educativa,
                        correo_electronico,
                        contrasenia,
                        newId_rol,
                    ]);
                    res.status(201).json({ text: "usuario guardado" });
                }
                catch (error) {
                    res.status(400).json({ text: "Hubo un error " });
                    console.log("no se puede guardar" + error);
                }
            }
            else {
                console.log("pasa el usuario 2");
                try {
                    const query = "INSERT INTO usuario ( nombre,apellido,nivel_academico,carrera,unidad_educativa,correo_electronico,contrasenia, id_rol) VALUES (?,?,?,?,?,?,?,(select id_rol from rol where tipo_rol=?))";
                    const query1 = "INSERT INTO usuario ( nombre,apellido,nivel_academico,carrera,unidad_educativa,correo_electronico,contrasenia, id_rol) VALUES (?,?,?,?,?,?,?,?)";
                    console.log("EL ROL es:", id_rol);
                    if (id_rol == "Admin") {
                        yield database_1.default.query(query, [
                            nombre,
                            apellido,
                            nivel_academico,
                            carrera,
                            unidad_educativa,
                            correo_electronico,
                            contrasenia,
                            id_rol,
                        ]);
                        res.status(201).json({ text: "usuario guardado" });
                    }
                    if (id_rol == "Editor") {
                        yield database_1.default.query(query, [
                            nombre,
                            apellido,
                            nivel_academico,
                            carrera,
                            unidad_educativa,
                            correo_electronico,
                            contrasenia,
                            id_rol,
                        ]);
                        res.status(201).json({ text: "usuario guardado" });
                    }
                    if (id_rol == "Mentora") {
                        yield database_1.default.query(query, [
                            nombre,
                            apellido,
                            nivel_academico,
                            carrera,
                            unidad_educativa,
                            correo_electronico,
                            contrasenia,
                            id_rol,
                        ]);
                        res.status(201).json({ text: "usuario guardado" });
                    }
                }
                catch (error) {
                    res.status(404).json({ text: error });
                    console.log("no se puede guardar el" + error);
                }
            }
            //
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("cedula:" + id);
                yield database_1.default.query(" DELETE FROM usuario WHERE id_usuario=?", [id]);
                res.status(204).json({ message: "el dato fue eliminado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede eliminar" + error);
            }
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("nombre:"+req.body.nombre)
            // console.log("cedula:"+req.body.cedula)
            try {
                const { id } = req.params;
                console.log("id: " + id);
                const nombre = req.body.nombre;
                const apellido = req.body.apellido;
                const nivel_academico = req.body.nivel_academico;
                const carrera = req.body.carrera;
                const unidad_educativa = req.body.unidad_educativa;
                const correo_electronico = req.body.correo_electronico;
                const contrasenia = req.body.contrasenia;
                const tipo_rol = req.body.tipo_rol;
                console.log("rol:" + req.body.tipo_rol);
                console.log("id_usuario:" + req.body.id_usuario);
                console.log("nombre new:" + req.body.nombre);
                console.log("correo:" + req.body.correo_electronico);
                const query = "UPDATE usuario set nombre=?,apellido=?,nivel_academico=?,carrera=?,unidad_educativa=?,correo_electronico=?,contrasenia=?, id_rol=(select id_rol from rol where tipo_rol=?) WHERE id_usuario=?";
                database_1.default.query(query, [
                    nombre,
                    apellido,
                    nivel_academico,
                    carrera,
                    unidad_educativa,
                    correo_electronico,
                    contrasenia,
                    tipo_rol,
                    id,
                ]);
                res.status(201).json({ text: "usuario actualizado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede actualizar" + error);
            }
        });
    }
    updatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contrasenia = req.body.contrasenia;
                const contraseniaN = req.body.contraseniaN;
                console.log("el id", id);
                console.log("contra", contrasenia);
                const contra = yield database_1.default.query("SELECT contrasenia FROM usuario where contrasenia=? and id_usuario=?", [contrasenia, id]);
                console.log("la consul", contra);
                if (contra.length > 0) {
                    const query = "UPDATE usuario set contrasenia=? where id_usuario=?";
                    database_1.default.query(query, [contraseniaN, id]);
                    res.status(201).json({ text: "contraseña actualizada" });
                }
                else {
                    res.status(404).json({ text: "La contraseña no es correcta" });
                }
                // res.status(204).json({text: "usuario actualizado"});
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede actualizar" + error);
            }
        });
    }
    RecuperarPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo_electronico } = req.params;
                console.log("contra", correo_electronico);
                const correo = yield database_1.default.query("SELECT correo_electronico FROM usuario where correo_electronico=? and id_rol=4 ", [correo_electronico]);
                if (correo.length > 0) {
                    res.status(201).json({ text: "Dato encontrado" });
                }
                else {
                    res.status(404).json({ text: "el usuario no existe" });
                }
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede actualizar" + error);
            }
        });
    }
    RestablecerPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa restablecer");
            try {
                const { id } = req.params;
                const contrasenia = req.body.contrasenia;
                console.log("la consul", contrasenia);
                const query = "UPDATE usuario set contrasenia=? where correo_electronico=?";
                database_1.default.query(query, [contrasenia, id]);
                res.status(201).json({ text: "contraseña restablecida" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede actualizar" + error);
            }
        });
    }
}
exports.usuariosController = new UsuariosController(); //instanciar la clase
