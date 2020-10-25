import { createConnection } from "typeorm";
import { User } from "./entities/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import path from "path";
import { AthleteResolver } from "./resolvers/AthleteResolver";
import { Athlete } from "./entities/Athlete";
import { MaxCard } from "./entities/MaxCard";
import { MaxCardResolver } from "./resolvers/MaxCardResolver";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "maxpercentages",
    logging: true,
    //make sure this is false in production
    synchronize: true,
    entities: [User, MaxCard],
    migrations: [path.join(__dirname, "migrations/*")],
    migrationsTableName: "migrations",
    cli: {
      migrationsDir: "migrations",
    },
  });
  // const mig = await conn.runMigrations();

  // await MaxCard.delete({});

  const app = express();
  const redisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "alnvvoaiuerjavalja",
      store: new redisStore({
        client: redisClient,
        disableTouch: true,
      }),
      saveUninitialized: false,
      resave: false,
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MaxCardResolver],
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
