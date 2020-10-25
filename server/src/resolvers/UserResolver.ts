import { User } from "../entities/User";
import "reflect-metadata";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me() {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Mutation(() => User)
  async register(
    @Arg("username") userName: string,
    @Arg("firstname") firstName: string,
    @Arg("lastname") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      username: userName,
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
