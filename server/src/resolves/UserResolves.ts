import { hash } from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from '../entity/User'

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
    
}