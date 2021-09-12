import { Request, Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';

export const checkjwt=(req: Request, res: Response, next: NextFunction)=>{
    

    if(!req.headers.login){
        return res.status(401).json ('no existe cabezera')
    }else{

    console.log("pasaaa")
    try {
       
        const token=<string>req.headers.login;
        
            const payload=jwt.verify(token, 'SCRET'); //obtener  los datos que se envio en el token
            console.log("este es el payload" , payload);
            res.locals.payload=payload
            next();

            //  res.locals.payload=payload
            
 
            // //req.user_id=payload._id;
            // next();
        
        
       } catch (error) {
           
           res.status(401).json({message: 'Not autorizado'})
       }
       
    }

   
    


}

export const isAdmin=async(req: Request, res: Response, next: NextFunction)=>{
        
}