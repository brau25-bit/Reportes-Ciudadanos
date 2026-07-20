import multer from "multer";
import path from 'path'
import fs from 'fs'

const ALLOWED_MIME_TYPES = {
    IDENTIFICATION: ["image/jpeg", "image/png", "application/pdf"],
    PROOF_OF_ADDRESS: ["image/jpeg", "image/png", "application/pdf"],
    INSURANCE_POLICY: ["application/pdf"],
    LAND_USE_CERTIFICATE: ["application/pdf"],
    OTHER: ["image/jpeg", "image/png", "application/pdf", "image/webp"],
}

const ALL_ALLOWED_MIMES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "image/webp",
]

const MAX_FILE_SIZE =  15 * 1024 * 1024
const MAX_FILES = 10

const ensureUploadDir = (uploadPath) => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    } 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      process.cwd(),
      "uploads",
      "applications",
      new Date().getFullYear().toString(),
      String(new Date().getMonth() + 1).padStart(2, "0")
    );
    ensureUploadDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.fieldname.replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${safeName}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!ALL_ALLOWED_MIMES.includes(file.mimetype)) {
    return cb(
      new res.status(400).json(`Tipo de archivo no permitido: ${file.mimetype}. Solo se aceptan PDF, JPG, PNG y WEBP.`),
      false
    );
  }
  cb(null, true);
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES
  }
})

export const uploadDocuments = (req, res, next) => {

  const upload = multerUpload.array("documents", MAX_FILES)
 
  upload(req, res, (err) => {

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") res.status(400).json(`El archivo excede el tamaño máximo permitido de ${MAX_FILE_SIZE / 1024 / 1024} MB.`)
      
      if (err.code === "LIMIT_FILE_COUNT") res.status(400).json(`Se superó el límite de ${MAX_FILES} archivos por solicitud.`)

      return new Error("Error al subir los archuivos")
    }
 
    if (err) return new Error("hubo un error desconocido")
    next();
  })
}