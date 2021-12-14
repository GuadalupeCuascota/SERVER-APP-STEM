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
exports.cancelacionMentoriasController = void 0;
const database_1 = __importDefault(require("../database"));
const emailer_1 = require("./emailer");
class CancelacionMentoriasController {
    //  localtime=moment().format('YYYY-MM-DD');
    updateRegistroMentoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const id_estado_mentoria = req.body.id_estado_mentoria;
                console.log("el id", id);
                console.log("el estado", id_estado_mentoria);
                const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.materia from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?", [id]);
                if (registroMentorias.length > 0) {
                    const fecha = registroMentorias[0].fecha;
                    const hora_inicio = registroMentorias[0].hora_inicio;
                    console.log("fecha", fecha);
                    console.log("hora_inicio", hora_inicio);
                    const hoy = new Date(fecha);
                    let day1 = hoy.getDate();
                    let month1 = hoy.getMonth() + 1;
                    let year1 = hoy.getFullYear();
                    let fechaRegistro = `${year1}-${month1}-${day1}`;
                    let date = new Date();
                    let day = `${date.getDate()}`.padStart(2, "0");
                    let month = `${date.getMonth() + 1}`.padStart(2, "0");
                    let year = date.getFullYear();
                    let fechaActual = `${year}-${month}-${day}`;
                    if (fechaActual < fechaRegistro) {
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
                                html: "<b> La mentoria agendada ha sido cancelada</b>",
                            });
                            res.status(200).json({ text: "Email enviado" });
                        }
                        catch (error) {
                            console.log("HUBO UN ERROR");
                        }
                    }
                    else {
                        if (fechaActual == fechaRegistro) {
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
                                        subject: "Mentoria Cancelada ",
                                        text: "La mentoria agendada ha sido cancelada",
                                        html: "<b> La mentoria agendada ha sido cancelada</b>",
                                    });
                                    res.status(200).json({ text: "Email enviado" });
                                }
                                catch (error) {
                                    console.log("HUBO UN ERROR");
                                }
                            }
                            else {
                                res.status(404).json({ text: "No se puede cancelar la mentoria" });
                            }
                        }
                    }
                }
                else {
                    res.status(404).json({ text: "El registro no existe HOY" });
                }
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error", error });
            }
        });
    }
    cancelarMentoriaEst(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const id_usuario = req.body.id_usuario;
                const id_estado_agen_mentoria = req.body.id_estado_agen_mentoria;
                const id_registro_mentoria = req.body.id_registro_mentoria;
                console.log("el id es", id);
                console.log("el estado", id_estado_agen_mentoria);
                console.log("id_registro", id_registro_mentoria);
                console.log("id_usuario", id_usuario);
                const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.materia from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?", [id_registro_mentoria]);
                console.log("el registro", registroMentorias);
                if (registroMentorias.length > 0) {
                    const fecha = registroMentorias[0].fecha;
                    const hora_inicio = registroMentorias[0].hora_inicio;
                    console.log("fecha", fecha);
                    console.log("hora_inicio", hora_inicio);
                    const hoy = new Date(fecha);
                    let day1 = hoy.getDate();
                    let month1 = hoy.getMonth() + 1;
                    let year1 = hoy.getFullYear();
                    let fechaRegistro = `${year1}-${month1}-${day1}`;
                    let date = new Date();
                    let day = `${date.getDate()}`.padStart(2, "0");
                    let month = `${date.getMonth() + 1}`.padStart(2, "0");
                    let year = date.getFullYear();
                    let fechaActual = `${year}-${month}-${day}`;
                    if (fechaActual < fechaRegistro) {
                        try {
                            console.log("es menor");
                            const query = "UPDATE agendamiento_mentorias SET id_estado_agen_mentoria=? where id_agendamiento_mentoria=? and id_usuario=?";
                            database_1.default.query(query, [id_estado_agen_mentoria, id, id_usuario]);
                            res.status(201).json({ text: "Mentoria cancelada" });
                        }
                        catch (error) {
                            res.status(404).json({ text: "Hubo un error " });
                        }
                    }
                    else {
                        try {
                            if (fechaActual == fechaRegistro) {
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
                                    const query = "UPDATE agendamiento_mentorias SET id_estado_agen_mentoria=? where id_agendamiento_mentoria=? and id_usuario=?";
                                    database_1.default.query(query, [id_estado_agen_mentoria, id, id_usuario]);
                                }
                                else {
                                    res.status(404).json({ text: "No se puede cancelar la mentoria" });
                                }
                            }
                        }
                        catch (error) {
                        }
                        res.status(404).json({ text: "No se puede cancelar la mentoria" });
                    }
                }
                else {
                    res.status(404).json({ text: "El registro no existe HOY" });
                }
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error", error });
            }
        });
    }
}
exports.cancelacionMentoriasController = new CancelacionMentoriasController();
