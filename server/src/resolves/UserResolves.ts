import { compare, hash } from "bcryptjs";
import MyContext from "src/MyContext";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from '../entity/User';
import { 
    createAccessToken,
    sendRefreshToken
} from '../auth'
import { isAuth } from "../IsAuth";
import { getConnection } from "typeorm";

@ObjectType()
class LoginReponse {
    @Field()
    accessToken: String
}

@Resolver()
export class UserResolves {
    @Query(() => String)
    hello() {
        return 'hi';
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() ctx: MyContext
    ) {
        return 'bye, your id is ' + ctx.payload?.userId;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => Boolean)
    async revokeRefreshForUser(
        @Arg('userId', () => Int) userId: number
    ) {
        await getConnection().getRepository(User).increment({id: userId}, 'tokenVersion', 1);
        return true;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
    ) {
        try {
            const hashedPwd = await hash(password, 10);
            await User.insert({
                email,
                password: hashedPwd
            })
        } catch(error) {
            console.error(error);
            return false;
        }

        return true;
    }

    @Mutation(() => LoginReponse)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginReponse> {
        const user = await User.findOne({where: { email }});
        if (!user) {
            throw new Error("invalid email");
        }

        const validPwd = await compare(password, user.password);
        if (!validPwd) {
            throw new Error("invalid password");
        }

        sendRefreshToken(user, res);
        
        return {
            accessToken: createAccessToken(user)
        };
    }
    
}