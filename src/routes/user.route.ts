import { Router, Request, Response } from 'express';
import * as multer from 'multer';

import userController from '../controllers/user.controller';
import { signUpValidation } from '../validations/user.validation';
import { signInValidation } from '../validations/user.validation';
import photoValidation from '../validations/photo.validation';
import multerConfig from '../services/upload.service';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post(
  '/signup',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await signUpValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.registrationUser
);
router.post(
  '/signin',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await signInValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.loginUser
);
router.post(
  '/:id/photos',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await photoValidation.validateAsync(req.file);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  multer(multerConfig).single('photo'),
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      res.status(200).send(req.file);
    } catch (err) {
      res.status(403).send('We have error with uploading!');
    }
    next();
  },
  userController.userUploadPhoto
);
router.put(
  '/:id',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await signUpValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

export default router;
