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
exports.mentoriasController = void 0;
const database_1 = __importDefault(require("../database"));
const emailer_1 = require("../controllers/emailer");
var myDate = new Date();
class MentoriasController {
    listMentoras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa obtner mentoras");
            yield database_1.default.query("SELECT DISTINCT u.id_usuario, u.nombre,u.apellido, u.id_usuario, c.nombre_carrera , c.id_carrera from registro_mentoria m, usuario u ,carreras_fica c WHERE c.id_carrera=u.id_carrera and m.id_usuario=u.id_usuario and m.fecha>=CURDATE()", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("registro mentoras seleccionados");
                }
            });
        });
    }
    getHorariosMentora(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("obtener disponibilidad de horarios");
            const { id } = req.params;
            const horariosMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.id_carrera, m.id_materia , mt.nombre_materia, m.id_estado_mentoria, t.nombre_estado_mentoria , t.id_estado_mentoria from registro_mentoria m, usuario u , materia mt, tipo_estado_mentoria t WHERE m.id_usuario=u.id_usuario and mt.id_materia=m.id_materia and u.id_usuario=40 and  m.fecha>=CURDATE() and t.id_estado_mentoria=m.id_estado_mentoria", [id]);
            console.log(horariosMentorias);
            if (horariosMentorias.length > 0) {
                return res.status(200).json(horariosMentorias);
            }
            res.status(404).json({ text: "El registro no existe" });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa obtner mentorias registradas");
            yield database_1.default.query("SELECT r.id_registro_mentoria,r.fecha, r.hora_inicio, r.hora_fin,u.nombre,u.apellido,c.nombre_carrera,c.id_carrera,r.id_usuario, m.nombre_materia ,ts.nombre_estado_mentoria from registro_mentoria r, usuario u, tipo_estado_mentoria ts, carreras_fica c, materia m	WHERE r.id_usuario=u.id_usuario and c.id_carrera=u.id_carrera and ts.id_estado_mentoria=r.id_estado_mentoria and m.id_materia=r.id_materia ORDER BY fecha_registro DESC", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("registro de mentorias registradas seleccionados");
                }
            });
        });
    }
    listporTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa obtner mentorias registradas");
            yield database_1.default.query("SELECT t.nombre_estado_mentoria as 'TipoMentoria',COUNT(r.id_registro_mentoria) as 'NroMentoriasAgendadas' from registro_mentoria r , tipo_estado_mentoria t WHERE t.id_estado_mentoria=r.id_estado_mentoria group by t.id_estado_mentoria", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("registro de mentorias registradas seleccionados");
                }
            });
        });
    }
    getMentoriasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("obtner");
            const { id } = req.params;
            const registroMentoriasporUsuario = yield database_1.default.query("SELECT fecha, hora_inicio, hora_fin, materia from registro_mentoria WHERE id_usuario=?", [id]);
            console.log(registroMentoriasporUsuario);
            if (registroMentoriasporUsuario.length > 0) {
                return res.status(200).json(registroMentoriasporUsuario);
            }
            res
                .status(404)
                .json({ text: "En este momento no existe mentorias disponibles" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("obtener mentoria por id");
            const { id } = req.params;
            const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.id_materia, mat.nombre_materia from registro_mentoria m, usuario u , materia mat WHERE m.id_usuario=u.id_usuario and mat.id_materia=m.id_materia and m.id_registro_mentoria=1", [id]);
            console.log(registroMentorias);
            if (registroMentorias.length > 0) {
                return res.status(200).json(registroMentorias[0]);
            }
            res.status(404).json({ text: "El registro no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa crear registro mentoria");
            try {
                const { fecha, hora_inicio, hora_fin, id_usuario, id_materia, id_estado_mentoria, } = req.body;
                console.log("fecha:" + req.body.fecha);
                console.log("fecha:" + req.body.hora_inicio);
                console.log("estado_registro" + req.body.id_estado_mentoria);
                console.log("id_materia" + req.body.id_materia);
                const findRegistro = yield database_1.default.query("SELECT * FROM registro_mentoria WHERE id_usuario=? and hora_inicio=? and fecha= ?", [id_usuario, hora_inicio, fecha]);
                if (findRegistro.length > 0) {
                    res.status(404).json({ text: "Mentoria duplicada" });
                }
                else {
                    console.log("no existe mentoria");
                    const query = "INSERT INTO registro_mentoria(fecha, hora_inicio, hora_fin, id_usuario, id_materia,id_estado_mentoria) VALUES (?,?,?,?,(select id_materia from materia where nombre_materia=?),?)";
                    yield database_1.default.query(query, [
                        fecha,
                        hora_inicio,
                        hora_fin,
                        id_usuario,
                        id_materia,
                        id_estado_mentoria,
                    ]);
                    res.status(201).json({ text: "mentoria registrada" });
                }
            }
            catch (err) {
                res.status(404).json({ text: "hubo un error" + err });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("id_registro:" + id);
                yield database_1.default.query(" DELETE FROM registro_mentoria  WHERE id_registro_mentoria=?", [id]);
                res.status(201).json({ text: "el dato fue eliminado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede eliminar" + error);
            }
        });
    }
    updateRegistroMentoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa actualizar:");
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
        });
    }
    updateRegistroMentoria1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        const usuario = yield database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                        console.log(usuario);
                        var arrayUsuario = [];
                        var someVar = [];
                        for (let usu of usuario) {
                            someVar.push(usu.correo_electronico);
                        }
                        arrayUsuario = someVar;
                        try {
                            yield emailer_1.transporter.sendMail({
                                from: '"FICA STEM"<ficastemutn@gmail.com>',
                                to: arrayUsuario,
                                subject: "Mentoria agendada ",
                                text: "La mentoria agendada ha sido cancelada",
                                html: "<b> La mentoria agendada ha sido cancelada</b>  <b>" + { fecha } + "</b>",
                            });
                        }
                        catch (error) {
                            console.log("HUBO UN ERROR");
                        }
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
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("fecha:" + req.body.fecha);
            console.log("pasa actualizar:");
            try {
                const { id } = req.params;
                const fecha = req.body.fecha;
                const hora_inicio = req.body.hora_inicio;
                const hora_fin = req.body.hora_fin;
                const materia = req.body.materia;
                console.log("fecha", fecha);
                /////OBTENER FECHA ACTUAL////
                let date = new Date();
                let day = `${date.getDate()}`.padStart(2, "0");
                let month = `${date.getMonth() + 1}`.padStart(2, "0");
                let year = date.getFullYear();
                let fechaActual = `${year}-${month}-${day}`;
                if (fechaActual < fecha) {
                    const query = "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, materia=? where id_registro_mentoria=?";
                    database_1.default.query(query, [fecha, hora_inicio, hora_fin, materia, id]);
                    const usuario = yield database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                    console.log(usuario);
                    var arrayUsuario = [];
                    var someVar = [];
                    for (let usu of usuario) {
                        someVar.push(usu.correo_electronico);
                    }
                    arrayUsuario = someVar;
                    try {
                        yield emailer_1.transporter.sendMail({
                            from: '"FICA STEM"<ficastemutn@gmail.com>',
                            to: arrayUsuario,
                            subject: "Mentoria Actualizada ",
                            text: "La mentoria agendada ha sido actualizada",
                            html: "<b>La mentoria agendada ha sido actualizada</b>" + materia + "</b>" + "<br>" + "<b>Materia:" + materia
                            // html body
                        });
                        res.status(200).json({ text: "Email enviado" });
                    }
                    catch (error) {
                        console.log("HUBO UN ERROR");
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
                            database_1.default.query(query, [fecha, hora_inicio, hora_fin, materia, id]);
                            const usuario = yield database_1.default.query("select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?", [id]);
                            console.log(usuario);
                            var arrayUsuario = [];
                            var someVar = [];
                            for (let usu of usuario) {
                                someVar.push(usu.correo_electronico);
                            }
                            arrayUsuario = someVar;
                            try {
                                yield emailer_1.transporter.sendMail({
                                    from: '"FICA STEM"<ficastemutn@gmail.com>',
                                    to: arrayUsuario,
                                    subject: "Mentoria Actualizada ",
                                    text: "La mentoria agendada ha sido actualizada",
                                    html: "<b> La mentoria agendada ha sido actualizada</b>",
                                });
                                res.status(200).json({ text: "Email enviado" });
                            }
                            catch (error) {
                                console.log("HUBO UN ERROR");
                            }
                        }
                        else {
                            res.status(404).json({ text: "No se puede actualizar la mentoriala mentoria" });
                        }
                    }
                }
            }
            catch (error) {
                console.log("error", error);
                res.status(404).json({ text: "Hubo un error" });
            }
        });
    }
}
exports.mentoriasController = new MentoriasController(); //instanciar la clase
