import { Router, Request, Response } from 'express';
import photoController from '../controllers/photo.controller';
import photoValidation from '../validations/photo.validation';

const router = Router();

router.get('/', photoController.getAllPhoto);
router.get('/:id', photoController.getPhoto);
router.post(
  '/',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await photoValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  photoController.uploadPhoto
);
router.put(
  '/:id',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await photoValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  photoController.updatePhoto
);
router.delete('/:id', photoController.deletePhoto);

export default router;
