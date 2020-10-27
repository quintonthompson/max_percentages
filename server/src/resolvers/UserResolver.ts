import { User } from "../entities/User";
import "reflect-metadata";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { contains } from "class-validator";
import { MyContext } from "src/types";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@InputType()
class UserLoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
@InputType()
class UserRegistrationInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = User.findOne({ id: req.session.userId });
    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<Boolean> {
    const result = await User.delete({ id });
    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "no user was found",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is incorrect",
          },
        ],
      };
    }

    req.session.userId = user.id;

    console.log("userId: ", req.session!.userId);
    return {
      user,
    };
  }

  @Query(() => UserResponse)
  async findUser(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    const user = await User.findOne({ id: id });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "user not found",
          },
        ],
      };
    }
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegistrationInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);

    try {
      const user = await User.create({
        username: options.username,
        firstname: options.firstname,
        lastname: options.lastname,
        email: options.email,
        password: hashedPassword,
      }).save();

      req.session.userId = user.id;

      return { user };
    } catch (e) {
      if (e.code === "23505" && e.detail.includes("email")) {
        return {
          errors: [
            {
              field: "password",
              message: "user with email already exists",
            },
          ],
        };
      }

      if (e.code === "23505") {
        return {
          errors: [
            {
              field: "password",
              message: "user already exists",
            },
          ],
        };
      }

      return {
        errors: [
          {
            field: "username",
            message: "something went wrong",
          },
        ],
      };
    }
  }
}
