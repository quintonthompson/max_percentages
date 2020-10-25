import { MaxCard } from "../entities/MaxCard";
import { Query, Resolver, InputType, Field, Mutation, Arg } from "type-graphql";

@InputType()
class MaxCardInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  maxBench: number;

  @Field({ nullable: true })
  maxSquat: number;

  @Field({ nullable: true })
  maxPowerClean: number;

  @Field({ nullable: true })
  maxSnatch: number;

  @Field({ nullable: true })
  maxSumo: number;

  @Field({ nullable: true })
  maxOverheadPress: number;

  @Field({ nullable: true })
  maxJerk: number;
}

@Resolver()
export class MaxCardResolver {
  @Query(() => [MaxCard])
  async maxCards(): Promise<MaxCard[]> {
    const maxCards = await MaxCard.find();
    console.log("maxCards: ", maxCards);
    return maxCards;
  }

  @Mutation(() => MaxCard)
  async createMaxCard(@Arg("options") options: MaxCardInput): Promise<MaxCard> {
    const maxCard = await MaxCard.create(options).save();
    return maxCard;
  }
}
