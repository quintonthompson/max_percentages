"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const path_1 = __importDefault(require("path"));
const MaxCard_1 = require("./entities/MaxCard");
const MaxCardResolver_1 = require("./resolvers/MaxCardResolver");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "maxpercentages",
        logging: true,
        synchronize: true,
        entities: [User_1.User, MaxCard_1.MaxCard],
        migrations: [path_1.default.join(__dirname, "migrations/*")],
        migrationsTableName: "migrations",
        cli: {
            migrationsDir: "migrations",
        },
    });
    const app = express_1.default();
    const redisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.set("trust proxy", 1);
    app.use(express_session_1.default({
        secret: "alnvvoaiuerjavalja",
        store: new redisStore({
            client: redisClient,
            disableTouch: true,
        }),
        saveUninitialized: false,
        resave: false,
    }));
    const server = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, MaxCardResolver_1.MaxCardResolver],
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
});
main().catch((e) => {
    console.error(e);
});
//# sourceMappingURL=index.js.map