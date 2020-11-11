import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolves } from "./resolves/UserResolves";
import { createConnection } from "typeorm";

(async () => {
    const app = express();
    app.get('/', (_req, res) => {
        res.send('hi');
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolves]
        })        
    })

    await createConnection(); 

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('express server started');
    })
})();