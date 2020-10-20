import { createConnection } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  console.log("here ");
  await createConnection({
    type: "postgres",
    database: "maxpercentages",
    logging: true,
    synchronize: true,
    entities: [User],
  }).catch((e) => {
    console.log("error: ", e);
  });
};

main().catch((e) => {
  console.error(e);
});
