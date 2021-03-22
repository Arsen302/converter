import { Options, diskStorage } from 'multer';
import * as express from 'express';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const multerConfig = {
  dest: resolve(__dirname, '../../src/uploads'),
  storage: diskStorage({
    destination: (req, file, callback): void => {
      callback(null, resolve(__dirname, '../../src/uploads'));
    },
    filename: (req, file, callback): void => {
      randomBytes(16, (error, hash): void => {
        if (error) {
          callback(error, file.filename);
        } else if (file.mimetype === 'image/jpeg') {
          const filename = `${hash.toString('hex')}.jpg`;
          callback(null, filename);
        } else if (file.mimetype === 'image/png') {
          const filename = `${hash.toString('hex')}.png`;
          callback(null, filename);
        }
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, callback) => {
    const formats = ['image/jpeg', 'image/jpg', 'image/png'];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Format not accepted'));
    }
  },
} as Options;

export default multerConfig;
