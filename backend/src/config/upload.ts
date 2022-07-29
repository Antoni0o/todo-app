import multer from 'multer';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now()+'-'+file.originalname;
    return cb(null, filename);
  }
});