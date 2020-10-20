import { MaxCard } from "src/entities/MaxCard";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class MaxCardResolver {
  @Query(() => [MaxCard])
  maxCards(): Promise<MaxCard[]> {
    return MaxCard.find();
  }
}
