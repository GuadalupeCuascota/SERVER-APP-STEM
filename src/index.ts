import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import helmet from "helmet";

//importar las rutas
import rolesRoutes from "./routes/rolesRoutes";
import mentoriasUsuarioRoutes from "./routes/mentoriasUsuarioRoutes";
import usuariosRoutes from "./routes/usuariosRoutes";
import publicacionRoutes from "./routes/publicacionRoutes";
import publicacionesCarreraRoutes from "./routes/publicacionesCarreraRoutes";
import tipoPublicacionRoutes from "./routes/tipo-publicaciónRoute";
import autenticacionRoutes from "./routes/autentificacionRoutes";
import eventoRoutes from "./routes/registro-eventoRoutes";
import carrerasficaRoutes from "./routes/carrerasficaRoutes";
import mentoriasRegistroRoutes from "./routes/mentorias-registroRoutes";
import agendarMentoriaRoutes from "./routes/agendarMentoriaRoute";
import solicitudesMentoriaRoutes from "./routes/solicitud-agendamiento";
import consultasDashboardRoute from "./routes/consultasDashboardRoute";
import cambiarPassRoute from "./routes/cambiarPassRoute";
import consultaMentoriasMesRoutes from "./routes/consultaMentoriasMesRoutes";
import restablacerPassRoutes from "./routes/RestablecerPassRoute";
import  testAptitudRoutes from "./routes/testAptitudRoute";
import  materiasRoutes from "./routes/materiasRoutes";
import  materiasCarreraRoutes from "./routes/materiaCarreraRoute";
import materiasEstudianteRoute from "./routes/materiasEstudianteRoute"; 
import solicitudMentoriaRoute from "./routes/solicitudMentoriaRoute"; 


class Server {
  public app: Application;
  constructor() {
    //crear el método constructor
    this.app = express(); // inicializamos express
    this.config();
    this.routes();
   
  }

  
  config(): void {
    //método para establecer el puerto
    this.app.set("port", process.env.PORT || 3000); //asignar el puerto de valor predetermnad o el valor fijo 3000
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: false }));
  }
  routes(): void {
    //método para definir rutas del servidor
    this.app.use("/api/roles", rolesRoutes);
    this.app.use("/api/usuarios", usuariosRoutes);
    this.app.use("/api/tipoPublicacion", tipoPublicacionRoutes);
    this.app.use("/api/publicaciones", publicacionRoutes);
    this.app.use("/login", autenticacionRoutes);
    this.app.use("/uploads", express.static(path.resolve("uploads")));//carpeta para almacenar archivos publicos
    this.app.use("/api/carrerasFica", carrerasficaRoutes);
    this.app.use("/api/publicacionesCarrera", publicacionesCarreraRoutes);
    this.app.use("/api/registro-mentorias", mentoriasRegistroRoutes);
    this.app.use("/api/registro-evento", eventoRoutes);
    this.app.use("/api/mentoriaUsuario", mentoriasUsuarioRoutes);
    this.app.use("/api/agendarMentoria", agendarMentoriaRoutes);
    this.app.use("/api/solicitudMentoria", solicitudesMentoriaRoutes);
    this.app.use("/api/nroEstudiantesMes", consultasDashboardRoute);
    this.app.use("/api/nroMentoriasMes",consultaMentoriasMesRoutes);
    this.app.use("/api/cambiarPass",cambiarPassRoute);
    this.app.use("/api/restablecerPass",restablacerPassRoutes);
    this.app.use("/api/testAptitud",testAptitudRoutes);
    this.app.use("/api/materias",materiasRoutes);
    this.app.use("/api/materiasCarrera",materiasCarreraRoutes);
    this.app.use("/api/materiasEstudiante",materiasEstudianteRoute);
    this.app.use("/api/solicitudesMentoria",solicitudMentoriaRoute);
    
  }
  start(): void {
    //método para inicializar el servidor
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
      console.log("probando")
    });
  }
}

const server = new Server(); //ejecuta la clase server
server.start();
