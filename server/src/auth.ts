import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

interface MyPlayload {
  userId: number;
  tokenVersion?: number;
}

const createAccessToken: (T: User) => string = (user) => {
  const playload: MyPlayload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };
  return sign(playload, process.env.ACCESS_TOKEN_SALT!, { expiresIn: "15m" });
};

const createRefreshToken: (T: User) => string = (user) => {
  const playload: MyPlayload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };
  return sign(playload, process.env.REFRESH_TOKEN_SALT!, { expiresIn: "7d" });
};

const sendRefreshToken: (T: User, res: Response) => void = (user, res) => {
  res.cookie("jid", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export { MyPlayload, createAccessToken, createRefreshToken, sendRefreshToken };
