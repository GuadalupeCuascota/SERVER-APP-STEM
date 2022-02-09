"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuariosController {
    async list(req, res) {
        await database_1.default.query("SELECT u.id_usuario, u.nombre, u.apellido,c.nombre_carrera,c.id_carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol ,u.id_rol from usuario u, rol r, carreras_fica c where u.id_rol=r.id_rol and c.id_carrera=u.id_carrera ORDER BY fecha_registro DESC ", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("Datos de usuarios seleccionados");
            }
        });
    }
    async getOne(req, res) {
        const { id } = req.params;
        const usuarios = await database_1.default.query(" SELECT  u.id_usuario, u.nombre, u.apellido,c.nombre_carrera,c.id_carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol ,u.id_rol from usuario u, rol r, carreras_fica c WHERE  r.id_rol=u.id_rol and c.id_carrera=u.id_carrera and u.id_usuario=?", [id]);
        console.log(usuarios);
        if (usuarios.length > 0) {
            return res.status(200).json(usuarios[0]);
        }
        res.status(404).json({ text: "el usuario no existe" });
    }
    async create(req, res) {
        const { nombre, apellido, unidad_educativa, correo_electronico, contrasenia, nombre_carrera, id_rol, } = req.body;
        console.log("el id del rol es", id_rol);
        console.log("el id del carers  ", nombre_carrera);
        const findCorreo = await database_1.default.query("SELECT * FROM usuario WHERE correo_electronico=?", [correo_electronico]);
        if (findCorreo.length > 0) {
            res
                .status(404)
                .json({ text: "El correo electrónico ya ha sido registrado" });
        }
        else {
            if (id_rol == 4) {
                const new_idCarrera = "Sin asignar";
                try {
                    const query = "INSERT INTO usuario ( nombre,apellido,unidad_educativa,correo_electronico,contrasenia, id_carrera,id_rol) VALUES (?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?),?)";
                    await database_1.default.query(query, [
                        nombre,
                        apellido,
                        unidad_educativa,
                        correo_electronico,
                        contrasenia,
                        new_idCarrera,
                        id_rol,
                    ]);
                    res.status(201).json({ text: "usuario guardado" });
                }
                catch (error) {
                    res.status(404).json({ text: error });
                    console.log("no se puede guardar el" + error);
                }
            }
            else {
                try {
                    const query = "INSERT INTO usuario ( nombre,apellido,unidad_educativa,correo_electronico,contrasenia, id_carrera,id_rol) VALUES (?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?),?)";
                    await database_1.default.query(query, [
                        nombre,
                        apellido,
                        unidad_educativa,
                        correo_electronico,
                        contrasenia,
                        nombre_carrera,
                        id_rol,
                    ]);
                    res.status(201).json({ text: "usuario guardado" });
                }
                catch (error) {
                    res.status(404).json({ text: error });
                    console.log("no se puede guardar el" + error);
                }
            }
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            console.log("cedula:" + id);
            await database_1.default.query(" DELETE FROM usuario WHERE id_usuario=?", [id]);
            res.status(204).json({ message: "el dato fue eliminado" });
        }
        catch (error) {
            res.status(404).json({ text: "Hubo un error " });
            console.log("no se puede eliminar" + error);
        }
    }
    // res.json({ text: "eliminando" + req.params.id });
    async update(req, res) {
        // console.log("nombre:"+req.body.nombre)
        // console.log("cedula:"+req.body.cedula)
        try {
            const { id } = req.params;
            console.log("id: " + id);
            const nombre = req.body.nombre;
            const apellido = req.body.apellido;
            const nombre_carrera = req.body.nombre_carrera;
            const unidad_educativa = req.body.unidad_educativa;
            const correo_electronico = req.body.correo_electronico;
            const contrasenia = req.body.contrasenia;
            const tipo_rol = req.body.tipo_rol;
            console.log("rol:" + req.body.tipo_rol);
            console.log("id_usuario:" + req.body.id_usuario);
            console.log("nombre new:" + req.body.nombre);
            console.log("correo:" + req.body.correo_electronico);
            console.log("nombre_carrera:" + req.body.id_carrera);
            const query = "UPDATE usuario set nombre=?,apellido=?,id_carrera=(select id_carrera from carreras_fica where nombre_carrera=?),unidad_educativa=?,correo_electronico=?,contrasenia=?, id_rol=(select id_rol from rol where tipo_rol=?) WHERE id_usuario=?";
            database_1.default.query(query, [
                nombre,
                apellido,
                nombre_carrera,
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
    }
    async updatePass(req, res) {
        try {
            const { id } = req.params;
            const contrasenia = req.body.contrasenia;
            const contraseniaN = req.body.contraseniaN;
            console.log("el id", id);
            console.log("contra", contrasenia);
            const contra = await database_1.default.query("SELECT contrasenia FROM usuario where contrasenia=? and id_usuario=?", [contrasenia, id]);
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
    }
    async ForgotPassword(req, res) {
        let message = "Check your email for a link to reset your password";
        let emailStatus = "OK";
        try {
            const { correo_electronico } = req.params;
            const findCorreo = await database_1.default.query("SELECT correo_electronico FROM usuario where correo_electronico=? and id_rol=4 ", [correo_electronico]);
            if (findCorreo.length > 0) {
                const payload = {
                    id_usuario: findCorreo[0].id_usuario,
                };
                const Token = jsonwebtoken_1.default.sign({ payload }, "SCRET", { expiresIn: "10m" });
                let verificationLink = "http://localhost:3000/new-password/${Token}";
                return res.status(200).json({ message: "ok", verificationLink });
            }
        }
        catch (error) {
            res.status(404).json({ text: "correo electrónico no registrado " });
        }
    }
    async RecuperarPass(req, res) {
        try {
            const { correo_electronico } = req.params;
            console.log("contra", correo_electronico);
            const correo = await database_1.default.query("SELECT correo_electronico FROM usuario where correo_electronico=? and (id_rol=4  or id_rol=5)", [correo_electronico]);
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
    }
    async RestablecerPass(req, res) {
        console.log("pasa restablecer");
        try {
            const { id } = req.params;
            const contrasenia = req.body.contrasenia;
            const resetToken = req.headers.reset;
            console.log("la consul", contrasenia);
            const query = "UPDATE usuario set contrasenia=? where correo_electronico=?";
            database_1.default.query(query, [contrasenia, id]);
            res.status(201).json({ text: "contraseña restablecida" });
        }
        catch (error) {
            res.status(404).json({ text: "Hubo un error " });
            console.log("no se puede actualizar" + error);
        }
    }
}
exports.usuariosController = new UsuariosController(); //instanciar la clase
