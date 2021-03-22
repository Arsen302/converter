import { Request, Response } from 'express';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import messageListner from '../services/producer.service';
import Photo from '../models/photo.model';
import User from '../models/user.model';

class UserController {
  async getAllUsers(_: Request, res: Response): Promise<void> {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const getUser = await User.findOne(req.params.id);

    res.status(200).json(getUser);
  }

  async registrationUser(req: Request, res: Response): Promise<void> {
    const { fullName, login, password } = req.body;

    try {
      const guest = await User.findOne({ fullName });

      if (guest) {
        res.status(400).send(`We have user with ${fullName} name...`);
      }

      // Здесь мы хешируем пароль через crypto
      // const hashedPassword = crypto.createHash('base64', password).toString();
      // const token = crypto.randomBytes(64).toString('hex');
      const hashedPassword = await bcrypt.hashSync(password, 5);

      const newUser = await new User();

      newUser.fullName = fullName;
      newUser.login = login;
      newUser.password = hashedPassword;

      await newUser.save();

      res.status(201).send(`Saved a new user ${newUser.fullName}!`);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;

    try {
      const user = await User.findOne({ login });
      const userPassword: any = await user?.password;

      if (!user) {
        res.status(400).send(`We can't find user with ${login} login...`);
      }

      const validPassword = await bcrypt.compareSync(password, userPassword);

      if (!validPassword) {
        res.status(400).send(`Not correct password...`);
      }

      const token = await crypto.randomBytes(64).toString('hex');

      res.status(200).json(token);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async userUploadPhoto(req: Request, res: Response): Promise<void> {
    const { originalname, filename, path } = req.file;
    const { token }: any = req.headers;

    try {
      const photo = await new Photo();

      photo.name = originalname;
      photo.convertedName = filename;
      photo.clientName = originalname;
      photo.filePath = path;
      photo.user = token;
      // photo.user = uuid()

      // нужно сделать проверку токена на валидность,
      // оригинальный ли это токен, принадлежит он текущему юзеру или левому
      // const invalidToken = await token;

      if (!token) {
        res.status(400).send("We can't identify your request...");
      }

      await messageListner.produce(photo);

      res.status(201).send('User upload new photo to convert');
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updateUser: any = await User.findOne(req.params.id);
      await User.merge(updateUser, req.body);
      const result = await User.save(updateUser);
      res.status(201).json(result);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await User.delete(req.params.id);

    res.status(204).send('User successfully deleted');
  }
}

export default new UserController();
