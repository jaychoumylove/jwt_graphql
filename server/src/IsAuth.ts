import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyPlayload } from "./auth";
import MyContext from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('not authorizated');
    }

    try {
        const token = authorization.split(' ')[1];

        const payload = verify(token, process.env.ACCESS_TOKEN_SALT!);

        context.payload = payload as MyPlayload;
    } catch(error) {
        console.error(error);
        throw new Error('not authorizated');
    }

    return next();
}