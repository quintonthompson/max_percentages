import { User } from "../entities/User";
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
import { MyContext } from "src/types";

@ObjectType()
class FieldError {
  @Field()
  fieldId: string;

  @Field()
  messge: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("firstName") firstName: String,
    @Arg("lastName") lastName: String,
    @Arg("email") email: String,
    @Arg("password") password: String
  ) {
    // const user = User.create(User, {});
  }
}
