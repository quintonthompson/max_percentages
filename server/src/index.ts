import { createConnection } from "typeorm";
import { User } from "./entities/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  console.log("here ");
  await createConnection({
    type: "postgres",
    database: "maxpercentages",
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("listening on port 4000");
  });
};

main().catch((e) => {
  console.error(e);
});
