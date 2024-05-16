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

    let falledLogin = login?.falledLogin || 0;

    const validPassword = bcrypt.compareSync(
      password,
      login?.dataValues.password
    );

    if (!validPassword) {
      falledLogin++;
      if (falledLogin >= 3) {
        await User.update(
          { blocked: true, lastFailedLogin: new Date() },
          { where: { email } }
        );
        res.status(404).json({
          msg: `El usuario/ contraseña no son correctos. El usuario ha sido bloqueado por demasiados intentos fallidos.`,
        });

        return;
      } else {
        await User.update(
          { falledLogin, lastFailedLogin: new Date() },
          { where: { email } }
        );
        res
          .status(404)
          .json({ msg: `El usuario/ contraseña no son correctos` });
        return;
      }
    }

    const currentTime = new Date();
    const blockedTime = new Date(login.lasFalledLogin);
    const hoursDifference = differenceInMinutes(currentTime, blockedTime);
    if (login?.blocked) {
      if (hoursDifference <= 1) {
        res.status(404).json({
          msg: `El usuario esta bloqueado por favor comunicarse con el servicio al cliente `,
        });
        return;
      } else {
        await User.update(
          {
            blocked: false,
            falledLogin: 0,
          },
          {
            where: {
              email,
            },
          }
        );
      }
    }
    console.log("currentTime: ", currentTime);
    console.log("blockedTime ", new Date(login.lasFalledLogin));

    if (!login?.state) {
      res.status(404).json({
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
