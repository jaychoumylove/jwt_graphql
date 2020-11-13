import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from '../entity/User'

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

    @Query(() => [User])
    users() {
        return User.find();
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
    ): Promise<LoginReponse> {
        const user = await User.findOne({where: { email }});
        if (!user) {
            throw new Error("invalid email");
        }

        const validPwd = await compare(password, user.password);
        if (!validPwd) {
            throw new Error("invalid password");
        }

        return {
            accessToken: sign({userId: user.id}, '73454593ksfsd', {expiresIn: '15m'})
        };
    }
    
}