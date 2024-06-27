import express, { Request, Response } from "express";
import db from "./config/db";
import { router } from "./router";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar con la BD
(async function connectDB(){
    try{
        await db.authenticate();
        db.sync();
        //console.log(colors.bgGreen('Conexion exitosa a la base de datos'));
    }
    catch(error){
        //console.error(colors.bgRed(error));
    }
})();

const server = express();

// Habilitar morgan para obtener informacion de las peticiones entrantes
server.use(morgan('dev'));

server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Habilita CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if( origin === process.env.FRONTEND_URL ){
            callback(null, true);
        }
        else{
            callback(new Error(`Error de CORS - ${origin}`));
        }
    }
};
server.use(cors(corsOptions));

// Leer datos que vienen en JSON
server.use(express.json());

// Define un prefijo de ruta y despues agrega el router de las rutas
server.use('/api/products', router);



// Endpoint para test del server
server.use('/api', (req: Request, res: Response) =>{
    res.status(200).json({ msg: 'Desde API' });
});

export default server;