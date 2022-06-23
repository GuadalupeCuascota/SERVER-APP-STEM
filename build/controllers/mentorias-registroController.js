"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentoriasController = void 0;
const database_1 = __importDefault(require("../database"));
const sgMail = require("../controllers/emailer");
var myDate = new Date();
class MentoriasController {
    async listMentoras(req, res) {
        await database_1.default.query("SELECT DISTINCT u.id_usuario, u.nombre,u.apellido, u.id_usuario, c.nombre_carrera , c.id_carrera from registro_mentoria m, usuario u ,carreras_fica c WHERE c.id_carrera=u.id_carrera and m.id_usuario=u.id_usuario and m.fecha>=CURDATE()", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("registro mentoras seleccionados");
            }
        });
    }
    ///OBTENER DISPONIBILIDAD DE HORARIOS
    async getHorariosMentora(req, res) {
        console.log("obtener disponibilidad de horarios hh");
        const { id } = req.params;
        const horariosMentorias = await database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.id_carrera, m.id_materia , mt.nombre_materia, m.id_estado_mentoria, t.nombre_estado_mentoria , t.id_estado_mentoria, tm.nombre_tema from registro_mentoria m, usuario u , materia mt, tipo_estado_mentoria t, tema_materia tm WHERE m.id_usuario=u.id_usuario and mt.id_materia=m.id_materia and u.id_usuario=? and  m.fecha>=CURDATE() and t.id_estado_mentoria=m.id_estado_mentoria and tm.id_tema_materia=m.id_tema_materia ORDER BY m.fecha ASC ", [id]);
        console.log(horariosMentorias);
        if (horariosMentorias.length > 0) {
            return res.status(200).json(horariosMentorias);
        }
        res.status(404).json({ text: "El registro no existe" });
    }
    async list(req, res) {
        console.log("pasa obtner mentorias registradas");
        await database_1.default.query("SELECT r.id_registro_mentoria,r.fecha, r.hora_inicio, r.hora_fin,u.nombre,u.apellido,c.nombre_carrera,c.id_carrera,r.id_usuario, m.nombre_materia ,ts.nombre_estado_mentoria,tm.nombre_tema from registro_mentoria r, usuario u, tipo_estado_mentoria ts, carreras_fica c, materia m, tema_materia tm	WHERE r.id_usuario=u.id_usuario and c.id_carrera=u.id_carrera and ts.id_estado_mentoria=r.id_estado_mentoria and m.id_materia=r.id_materia and tm.id_tema_materia=r.id_tema_materia ORDER BY r.fecha ASC", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("registro de mentorias registradas seleccionados");
            }
        });
    }
    async listporTipo(req, res) {
        console.log("pasa obtner mentorias registradas");
        await database_1.default.query("SELECT t.nombre_estado_mentoria as 'TipoMentoria',COUNT(r.id_registro_mentoria) as 'NroMentoriasAgendadas' from registro_mentoria r , tipo_estado_mentoria t WHERE t.id_estado_mentoria=r.id_estado_mentoria group by t.id_estado_mentoria", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("registro de mentorias registradas seleccionados");
            }
        });
    }
    async getMentoriasUsuario(req, res) {
        console.log("obtner");
        const { id } = req.params;
        const registroMentoriasporUsuario = await database_1.default.query("SELECT fecha, hora_inicio, hora_fin, materia from registro_mentoria WHERE id_usuario=?", [id]);
        console.log(registroMentoriasporUsuario);
        if (registroMentoriasporUsuario.length > 0) {
            return res.status(200).json(registroMentoriasporUsuario);
        }
        res
            .status(404)
            .json({ text: "En este momento no existe mentorias disponibles" });
    }
    async getOne(req, res) {
        console.log("obtener MENTORIA por id");
        const { id } = req.params;
        try {
            const registroMentorias = await database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.id_materia, mat.nombre_materia, t.nombre_estado_mentoria,  t.id_estado_mentoria from registro_mentoria m, usuario u , materia mat, tipo_estado_mentoria t WHERE m.id_usuario=u.id_usuario and mat.id_materia=m.id_materia and m.id_estado_mentoria=t.id_estado_mentoria and m.id_registro_mentoria=?", [id]);
            console.log(registroMentorias);
            if (registroMentorias.length > 0) {
                res.status(200).json(registroMentorias[0]);
            }
            else {
                res.status(404).json({ text: "El registro no existe" });
            }
        }
        catch (error) {
            res.status(404).json({ text: "hubo un error" + error });
            console.log("hubo un errro" + error);
        }
    }
    async create(req, res) {
        console.log("pasa crear registro mentoria");
        let date = new Date();
        let day = `${date.getDate()}`.padStart(2, "0");
        let month = `${date.getMonth() + 1}`.padStart(2, "0");
        let year = date.getFullYear();
        let fechaActual = `${year}-${month}-${day}`;
        try {
            const { fecha, hora_inicio, hora_fin, id_usuario, nombre_materia, id_estado_mentoria, nombre_tema } = req.body;
            console.log("fecha:" + req.body.fecha);
            console.log("hora_inicio:" + req.body.hora_inicio);
            console.log("estado_registro" + req.body.id_estado_mentoria);
            console.log("nombre_materia: " + req.body.nombre_materia);
            console.log("nombre_tema" + req.body.nombre_tema);
            const findRegistro = await database_1.default.query("SELECT * FROM registro_mentoria WHERE id_usuario=? and hora_inicio=? and fecha= ?", [id_usuario, hora_inicio, fecha]);
            if (findRegistro.length > 0) {
                res.status(404).json({ text: "Mentoria duplicada" });
            }
            else {
                const query = "INSERT INTO registro_mentoria(fecha, hora_inicio, hora_fin, id_usuario, id_materia,id_estado_mentoria,id_tema_materia) VALUES (?,?,?,?,?,?,(select id_tema_materia from tema_materia where nombre_tema=?))";
                await database_1.default.query(query, [
                    fecha,
                    hora_inicio,
                    hora_fin,
                    id_usuario,
                    nombre_materia,
                    id_estado_mentoria,
                    nombre_tema
                ]);
                res.status(201).json({ text: "mentoria registrada" });
            }
        }
        catch (err) {
            res.status(404).json({ text: "hubo un error" + err });
            console.log("hubo un errro" + err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            console.log("id_registro:" + id);
            await database_1.default.query(" DELETE FROM registro_mentoria  WHERE id_registro_mentoria=?", [id]);
            res.status(201).json({ text: "el dato fue eliminado" });
        }
        catch (error) {
            res.status(404).json({ text: "Hubo un error " });
            console.log("no se puede eliminar" + error);
        }
    }
    async updateRegistroMentoria(req, res) {
        try {
            const { id } = req.params;
            console.log("el id", id);
            const id_estado_mentoria = req.body.id_estado_mentoria;
            console.log("el estado", id_estado_mentoria);
            const query = "UPDATE registro_mentoria SET id_estado_mentoria=? WHERE id_registro_mentoria=?";
            database_1.default.query(query, [id_estado_mentoria, id]);
            res.status(200).json({ text: "registro actualizado" });
            console.log("actualizado");
        }
        catch (error) {
            console.log("error", error);
            res.status(404).json({ text: "Hubo un error" });
        }
    }
    async updateRegistroMentoria1(req, res) {
        try {
            const { id } = req.params;
            const id_estado_mentoria = req.body.id_estado_mentoria;
            const fecha = req.body.fecha;
            const hora_inicio = req.body.hora_inicio;
            let date = new Date();
            let day = `${date.getDate()}`.padStart(2, "0");
            let month = `${date.getMonth() + 1}`.padStart(2, "0");
            let year = date.getFullYear();
            let fechaActual = `${year}-${month}-${day}`;
            let horaActual = `${date.getHours()}`;
            let minutosActual = `${date.getMinutes() + 1}`;
            let h = parseInt(horaActual);
            let m = parseInt(minutosActual);
            var horaMentoria = hora_inicio.split(":");
            let h1 = horaMentoria[0];
            let m2 = horaMentoria[1];
            let horaA = h1 - h;
            let minutoA = m2 - m;
            if (minutoA < 0) {
                horaA--;
                minutoA = 60 + minutoA;
            }
            console.log("horas", horaA);
            console.log("minutos", minutoA);
            console.log("la fecha", fecha);
            console.log("la fecha Actual", fechaActual);
            if (fechaActual <= fecha) {
                if (horaA >= 1) {
                    const query = "UPDATE registro_mentoria SET id_estado_mentoria=? WHERE id_registro_mentoria=?";
                    database_1.default.query(query, [id_estado_mentoria, id]);
                    const usuario = await database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                    console.log(usuario);
                    var arrayUsuario = [];
                    var someVar = [];
                    for (let usu of usuario) {
                        someVar.push(usu.correo_electronico);
                    }
                    arrayUsuario = someVar;
                    // try {
                    //   await transporter.sendMail({
                    //     from: "pgcuascotac@utn.edu.ec", // sender address
                    //     to: arrayUsuario, // list of receivers
                    //     subject: "Mentoria agendada ", // Subject line
                    //     text: "La mentoria agendada ha sido cancelada", // plain text body
                    //     html:
                    //       "<b> La mentoria agendada ha sido cancelada</b>  <b>" +
                    //       { fecha } +
                    //       "</b>",
                    //     // html body
                    //   });
                    // } catch (error) {
                    //   console.log("HUBO UN ERROR");
                    // }
                    res.status(200).json({ text: "registro actualizado" });
                    console.log("actualizado");
                }
                else {
                    res.status(404).json({
                        text: "Solo se puede cancelar la mentoria con 1 hora de anticipación",
                    });
                }
            }
            res.status(404).json({ text: "El registro no existe" });
            res.status(404).json({ text: "No se puede cancelar la mentoria" });
        }
        catch (error) {
            res.status(404).json({ text: "Hubo un error" });
        }
    }
    async update(req, res) {
        console.log("UPDATE:");
        try {
            const { id } = req.params;
            const fecha = req.body.fecha;
            const hora_inicio = req.body.hora_inicio;
            const hora_fin = req.body.hora_fin;
            const nombre_materia = req.body.nombre_materia;
            const id_estado_mentoria = req.body.id_estado_mentoria;
            console.log("materia11", nombre_materia);
            console.log("fecha", fecha);
            console.log("hora ini", hora_inicio);
            console.log("hora_fin", hora_fin);
            console.log("id_estado", id_estado_mentoria);
            /////OBTENER FECHA ACTUAL////
            let date = new Date();
            let day = `${date.getDate()}`.padStart(2, "0");
            let month = `${date.getMonth() + 1}`.padStart(2, "0");
            let year = date.getFullYear();
            let fechaActual = `${year}-${month}-${day}`;
            console.log("la fecha actual", fechaActual);
            if (id_estado_mentoria == 1) {
                console.log("estado: mentoria registrada");
                try {
                    const query = "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, id_materia=(select id_materia from materia where nombre_materia=?) where id_registro_mentoria=?";
                    database_1.default.query(query, [fecha, hora_inicio, hora_fin, nombre_materia, id]);
                    res.status(201).json({ text: "mentoria actualizado" });
                }
                catch (error) {
                    res.status(404).json({ text: "Hubo un error " });
                    console.log("no se puede actualizar" + error);
                }
            }
            else {
                if (fechaActual < fecha) {
                    console.log("es menor");
                    const query = "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, id_materia=(select id_materia from materia where nombre_materia=?) where id_registro_mentoria=?";
                    database_1.default.query(query, [fecha, hora_inicio, hora_fin, nombre_materia, id]);
                    const usuario = await database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                    console.log(usuario);
                    var arrayUsuario = [];
                    var someVar = [];
                    for (let usu of usuario) {
                        someVar.push(usu.correo_electronico);
                    }
                    console.log(someVar);
                    arrayUsuario = someVar;
                    console.log("el correo", arrayUsuario);
                    try {
                        await sgMail.sendMail({
                            from: "lupitagcjazy@gmail.com",
                            to: arrayUsuario,
                            subject: "Mentoria Actualizada ",
                            text: "La mentoria agendada ha sido actualizada",
                            html: "<b>La mentoria agendada ha sido actualizada</b>" +
                                "</b>" +
                                "<br>" +
                                "<b>Materia:" +
                                nombre_materia + "<br>" +
                                "<b>Fecha mentoria:" + fecha
                            // html body
                        });
                        res.status(200).json({ text: "Email enviado" });
                    }
                    catch (error) {
                        res.status(404).json({ text: "Hubo un error ", error });
                    }
                }
                else {
                    if (fechaActual == fecha) {
                        console.log("la fecha es igual");
                        let date = new Date();
                        let horaActual = `${date.getHours()}`;
                        let minutosActual = `${date.getMinutes() + 1}`;
                        let h = parseInt(horaActual);
                        let m = parseInt(minutosActual);
                        console.log("hora actual", h);
                        console.log("minutos actual", m);
                        var horaMentoria = hora_inicio.split(":");
                        let h1 = horaMentoria[0];
                        let m2 = horaMentoria[1];
                        console.log("hora regitro", h1);
                        console.log("minutos regis", m2);
                        let horaA = h1 - h;
                        let minutoA = m2 - m;
                        if (minutoA < 0) {
                            horaA--;
                            minutoA = 60 + minutoA;
                        }
                        console.log("LA HORA ES", horaA);
                        if (horaA >= 1) {
                            const query = "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, materia=? where id_registro_mentoria=?";
                            database_1.default.query(query, [
                                fecha,
                                hora_inicio,
                                hora_fin,
                                nombre_materia,
                                id,
                            ]);
                            const usuario = await database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                            console.log(usuario);
                            var arrayUsuario = [];
                            var someVar = [];
                            for (let usu of usuario) {
                                someVar.push(usu.correo_electronico);
                            }
                            arrayUsuario = someVar;
                            try {
                                await sgMail.sendMail({
                                    from: '"FICA STEM"<ficastemutn@gmail.com>',
                                    to: arrayUsuario,
                                    subject: "Mentoria Actualizada ",
                                    text: "La mentoria agendada ha sido actualizada",
                                    html: "<b>La mentoria agendada ha sido actualizada</b>" +
                                        "</b>" +
                                        "<br>" +
                                        "<b>Materia:" +
                                        nombre_materia + "<br>" +
                                        "<b>Fecha mentoria:" + fecha
                                });
                                res.status(200).json({ text: "Email enviado" });
                            }
                            catch (error) {
                                res.status(404).json({ text: "Hubo un error ", error });
                            }
                        }
                        else {
                            res
                                .status(404)
                                .json({ text: "No se puede actualizar la  mentoria" });
                        }
                    }
                }
            }
        }
        catch (error) {
            console.log("error", error);
            res.status(404).json({ text: "Hubo un error", error });
        }
    }
}
exports.mentoriasController = new MentoriasController(); //instanciar la clase
