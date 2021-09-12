import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path'

const storage =multer.diskStorage({ //modulo para subir archivos 
  
  destination:'uploads',               //carpeta en la que se va a guardar los archivos
  // destination: path.join(__dirname, 'public/uploads'), //crea por defecto la carpeta
 
  filename: (req,file,cb)=>{   //renombrar archivos
    cb(null,uuidv4()+path.extname(file.originalname)); //uuidv4 genera strings aleatorios. 
     
  }

 
});

const typefile=multer({
  fileFilter: (req,file,cb)=>{
    var ext=path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Solo imagenes'))
  }
  cb(null, true)
}
});

export default multer({storage});