import { User } from "../entities/User";
import "reflect-metadata";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

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
  userLoginInput: UserLoginInput;

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
  async me() {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<Boolean> {
    const result = await User.delete({ id });
    console.log("result: ", result);
    return true;
  }

  @Mutation(() => UserResponse)
  async login(@Arg("options") options: UserLoginInput): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username });
    console.log("user: ", user);
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
    console.log("valid: ", valid);
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

    return {
      user,
    };
  }

  @Query(() => UserResponse)
  async findUser(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    const user = await User.findOne({ id: id });
    console.log("user: ", user);
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

  @Mutation(() => User)
  async register(@Arg("options") options: UserRegistrationInput) {
    const hashedPassword = await argon2.hash(options.userLoginInput.password);

    const user = await User.create({
      username: options.userLoginInput.username,
      firstname: options.firstname,
      lastname: options.lastname,
      email: options.email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
