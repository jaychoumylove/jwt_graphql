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
  return sign(playload, process.env.ACCESS_TOKEN_SALT!, { expiresIn: "15s" });
};

const createRefreshToken: (T: User) => string = (user) => {
  const playload: MyPlayload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };
  return sign(playload, process.env.REFRESH_TOKEN_SALT!, { expiresIn: "7d" });
};

const sendRefreshToken: (token: string, res: Response) => void = (token, res) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export { MyPlayload, createAccessToken, createRefreshToken, sendRefreshToken };
