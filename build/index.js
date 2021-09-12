"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
//importar las rutas
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const mentoriasUsuarioRoutes_1 = __importDefault(require("./routes/mentoriasUsuarioRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const publicacionRoutes_1 = __importDefault(require("./routes/publicacionRoutes"));
const publicacionesCarreraRoutes_1 = __importDefault(require("./routes/publicacionesCarreraRoutes"));
const tipo_publicaci_nRoute_1 = __importDefault(require("./routes/tipo-publicaci\u00F3nRoute"));
const autentificacionRoutes_1 = __importDefault(require("./routes/autentificacionRoutes"));
const registro_eventoRoutes_1 = __importDefault(require("./routes/registro-eventoRoutes"));
const carrerasficaRoutes_1 = __importDefault(require("./routes/carrerasficaRoutes"));
const mentorias_registroRoutes_1 = __importDefault(require("./routes/mentorias-registroRoutes"));
const agendarMentoriaRoute_1 = __importDefault(require("./routes/agendarMentoriaRoute"));
const solicitud_agendamiento_1 = __importDefault(require("./routes/solicitud-agendamiento"));
const consultasDashboardRoute_1 = __importDefault(require("./routes/consultasDashboardRoute"));
const cambiarPassRoute_1 = __importDefault(require("./routes/cambiarPassRoute"));
const consultaMentoriasMesRoutes_1 = __importDefault(require("./routes/consultaMentoriasMesRoutes"));
const RestablecerPassRoute_1 = __importDefault(require("./routes/RestablecerPassRoute"));
const testAptitudRoute_1 = __importDefault(require("./routes/testAptitudRoute"));
const materiasRoutes_1 = __importDefault(require("./routes/materiasRoutes"));
const materiaCarreraRoute_1 = __importDefault(require("./routes/materiaCarreraRoute"));
const materiasEstudianteRoute_1 = __importDefault(require("./routes/materiasEstudianteRoute"));
const solicitudMentoriaRoute_1 = __importDefault(require("./routes/solicitudMentoriaRoute"));
class Server {
    constructor() {
        //crear el método constructor
        this.app = express_1.default(); // inicializamos express
        this.config();
        this.routes();
    }
    config() {
        //método para establecer el puerto
        this.app.set("port", process.env.PORT || 3000); //asignar el puerto de valor predetermnad o el valor fijo 3000
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(helmet_1.default());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        //método para definir rutas del servidor
        this.app.use("/api/roles", rolesRoutes_1.default);
        this.app.use("/api/usuarios", usuariosRoutes_1.default);
        this.app.use("/api/tipoPublicacion", tipo_publicaci_nRoute_1.default);
        this.app.use("/api/publicaciones", publicacionRoutes_1.default);
        this.app.use("/login", autentificacionRoutes_1.default);
        this.app.use("/uploads", express_1.default.static(path_1.default.resolve("uploads"))); //carpeta para almacenar archivos publicos
        this.app.use("/api/carrerasFica", carrerasficaRoutes_1.default);
        this.app.use("/api/publicacionesCarrera", publicacionesCarreraRoutes_1.default);
        this.app.use("/api/registro-mentorias", mentorias_registroRoutes_1.default);
        this.app.use("/api/registro-evento", registro_eventoRoutes_1.default);
        this.app.use("/api/mentoriaUsuario", mentoriasUsuarioRoutes_1.default);
        this.app.use("/api/agendarMentoria", agendarMentoriaRoute_1.default);
        this.app.use("/api/solicitudMentoria", solicitud_agendamiento_1.default);
        this.app.use("/api/nroEstudiantesMes", consultasDashboardRoute_1.default);
        this.app.use("/api/nroMentoriasMes", consultaMentoriasMesRoutes_1.default);
        this.app.use("/api/cambiarPass", cambiarPassRoute_1.default);
        this.app.use("/api/restablecerPass", RestablecerPassRoute_1.default);
        this.app.use("/api/testAptitud", testAptitudRoute_1.default);
        this.app.use("/api/materias", materiasRoutes_1.default);
        this.app.use("/api/materiasCarrera", materiaCarreraRoute_1.default);
        this.app.use("/api/materiasEstudiante", materiasEstudianteRoute_1.default);
        this.app.use("/api/solicitudesMentoria", solicitudMentoriaRoute_1.default);
    }
    start() {
        //método para inicializar el servidor
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
            console.log("probando");
        });
    }
}
const server = new Server(); //ejecuta la clase server
server.start();
