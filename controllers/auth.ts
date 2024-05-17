import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import generateJWT from "../helpers/generateJWT";
import { differenceInMinutes } from "date-fns";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const login = await User.findOne({
      where: {
        email,
      },
    });

    if (!login) return res.status(400).json({ msg: `El usuario no existe` });

    const validPassword = bcrypt.compareSync(
      password,
      login?.dataValues.password
    );
    const currentTime = new Date();
    const blockedTime = new Date(login.lasFalledLogin);
    const minuteDifference = differenceInMinutes(currentTime, blockedTime);

    if (login?.blocked) {
      if (minuteDifference >= 120) {
        await User.update(
          { blocked: false, falledLogin: 0 },
          { where: { email } }
        );
        return false;
      } else {
        res.status(401).json({
          msg: `El usuario esta bloqueado por favor comunicarse con el servicio al cliente `,
        });
      }
      return true;
    }

    if (!validPassword) {
      let falledLogin = login?.falledLogin || 0;
      falledLogin++;

      const currentDate = new Date().toISOString();
      if (falledLogin >= 3) {
        await User.update(
          { blocked: true, lasFalledLogin: currentDate },
          { where: { email } }
        );
        res.status(401).json({
          msg: `El usuario ha sido bloqueado por demasiados intentos fallidos.`,
        });
        return;
      } else {
        await User.update(
          { falledLogin, lasFalledLogin: currentDate },
          { where: { email } }
        );
        res
          .status(404)
          .json({ msg: `El usuario/ contraseña no son correctos` });
        return;
      }
    }

    if (!login?.state) {
      res.status(401).json({
        msg: `El usuario esta inactivo por favor comunicarse con el servicio al cliente `,
      });
      return;
    }

    const token = await generateJWT(login.dataValues.id);

    return res.status(200).json({ token, user: login });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};
