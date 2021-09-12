"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    // destination: path.join(__dirname, 'public/uploads'), //crea por defecto la carpeta
    filename: (req, file, cb) => {
        cb(null, uuid_1.v4() + path_1.default.extname(file.originalname)); //uuidv4 genera strings aleatorios. 
    }
});
const typefile = multer_1.default({
    fileFilter: (req, file, cb) => {
        var ext = path_1.default.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Solo imagenes'));
        }
        cb(null, true);
    }
});
exports.default = multer_1.default({ storage });
