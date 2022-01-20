"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.checkjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkjwt = (req, res, next) => {
    if (!req.headers.login) {
        return res.status(401).json('no existe cabezera');
    }
    else {
        console.log("pasaaa");
        try {
            const token = req.headers.login;
            const payload = jsonwebtoken_1.default.verify(token, 'SCRET'); //obtener  los datos que se envio en el token
            console.log("este es el payload", payload);
            res.locals.payload = payload;
            next();
            //  res.locals.payload=payload
            // //req.user_id=payload._id;
            // next();
        }
        catch (error) {
            res.status(401).json({ message: 'Not autorizado' });
        }
    }
};
exports.checkjwt = checkjwt;
const isAdmin = async (req, res, next) => {
};
exports.isAdmin = isAdmin;
