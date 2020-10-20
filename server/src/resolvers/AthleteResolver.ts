import { Athlete } from "../entities/Athlete";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class AthleteResolver {
  @Query(() => [Athlete])
  async athletes(): Promise<Athlete[]> {
    return await Athlete.find();
  }
}
