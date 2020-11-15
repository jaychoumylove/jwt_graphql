import { Request, Response } from "express";
import { MyPlayload } from "./auth";

export default interface MyContext {
    req: Request,
    res: Response,
    payload?: MyPlayload
}