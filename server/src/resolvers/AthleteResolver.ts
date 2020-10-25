import { Athlete } from "../entities/Athlete";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import "reflect-metadata";
@Resolver()
export class AthleteResolver {
  @Query(() => [Athlete])
  async athletes(): Promise<Athlete[]> {
    return await Athlete.find();
  }

  @Mutation(() => Athlete)
  async createAthlete(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ) {
    const athlete = await Athlete.create({
      firstname: firstname,
      lastname: lastname,
    }).save();

    console.log("athlete: ", athlete);
    return athlete;
  }
}
