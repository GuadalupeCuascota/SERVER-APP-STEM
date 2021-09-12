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
exports.autentificacionController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { getRepository } from 'typeorm';
class AutentificacionController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PASA LOGIN");
            const { correo_electronico, contrasenia } = req.body;
            if (!(correo_electronico && contrasenia)) {
                return res
                    .status(404)
                    .json({ text: "correo y contraseña son requeridos" });
            }
            else {
                const usuario = yield database_1.default.query("SELECT * FROM usuario WHERE correo_electronico=? and contrasenia=?", [correo_electronico, contrasenia]);
                if (usuario.length > 0) {
                    const payload = {
                        id_usuario: usuario[0].id_usuario,
                        nombre: usuario[0].nombre,
                        apellido: usuario[0].apellido,
                        id_rol: usuario[0].id_rol,
                        nivel_academico: usuario[0].nivel_academico,
                        carrera: usuario[0].carrera,
                    };
                    const Token = jsonwebtoken_1.default.sign({ payload }, "SCRET", { expiresIn: "1h" });
                    console.log(Token);
                    return res.status(200).json({ message: "ok", Token, payload });
                }
                else {
                    return res
                        .status(404)
                        .json({ text: "usuario o contraseña incorrecto" });
                }
            }
        });
    }
    encriyptContraseña(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contrasenia = req.body;
            const crypt = yield bcryptjs_1.default.genSalt(10);
            return yield bcryptjs_1.default.hash(contrasenia, crypt);
        });
    }
}
exports.autentificacionController = new AutentificacionController();
