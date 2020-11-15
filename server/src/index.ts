import "reflect-metadata";
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolves } from "./resolves/UserResolves";
import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser';
import { verify } from "jsonwebtoken";
import { createAccessToken, sendRefreshToken } from "./auth";
import { User } from "./entity/User";

(async () => {
    const app = express();
    app.use(cookieParser());

    app.get('/', (_req, res) => {
        res.send('hi');
    });

    app.post('/refresh_token', async (req, res) => {
        let token = req.cookies.jid;
        if (!token) {
            return res.json({ok: false, accessToken: ''});
        }

        let accessToken = '';
        try {
            const payload: any = verify(token, process.env.REFRESH_TOKEN_SALT!);

            if (payload) {
                const user = await User.findOne(payload.userId);
                if (!user) {
                    throw new Error("can't find user");
                }

                if (user.tokenVersion !== payload.tokenVersion) {
                    throw new Error("tokenVersion is invalid");
                }

                accessToken = createAccessToken(user);

                sendRefreshToken(user, res);
            }
        } catch(error) {
            console.info(error);
            return res.json({ok: false, accessToken: ''});
        }

        return res.json({ok: true, accessToken});
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolves]
        }),
        context:({req, res}) => ({req, res})
    })

    await createConnection(); 

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('express server started');
    })
})();