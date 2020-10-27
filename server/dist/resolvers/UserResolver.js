"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserLoginInput = class UserLoginInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
UserLoginInput = __decorate([
    type_graphql_1.InputType()
], UserLoginInput);
let UserRegistrationInput = class UserRegistrationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "firstname", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "lastname", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegistrationInput.prototype, "email", void 0);
UserRegistrationInput = __decorate([
    type_graphql_1.InputType()
], UserRegistrationInput);
let UserResolver = class UserResolver {
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const user = User_1.User.findOne({ id: req.session.userId });
            return user;
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.find();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield User_1.User.delete({ id });
            return true;
        });
    }
    login(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ username: options.username });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "no user was found",
                        },
                    ],
                };
            }
            const valid = yield argon2_1.default.verify(user.password, options.password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "password is incorrect",
                        },
                    ],
                };
            }
            req.session.userId = user.id;
            console.log("userId: ", req.session.userId);
            return {
                user,
            };
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ id: id });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "user not found",
                        },
                    ],
                };
            }
            return {
                user,
            };
        });
    }
    register(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.username.length <= 2) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "length must be greater than 2",
                        },
                    ],
                };
            }
            const hashedPassword = yield argon2_1.default.hash(options.password);
            try {
                const user = yield User_1.User.create({
                    username: options.username,
                    firstname: options.firstname,
                    lastname: options.lastname,
                    email: options.email,
                    password: hashedPassword,
                }).save();
                req.session.userId = user.id;
                return { user };
            }
            catch (e) {
                if (e.code === "23505" && e.detail.includes("email")) {
                    return {
                        errors: [
                            {
                                field: "password",
                                message: "user with email already exists",
                            },
                        ],
                    };
                }
                if (e.code === "23505") {
                    return {
                        errors: [
                            {
                                field: "password",
                                message: "user already exists",
                            },
                        ],
                    };
                }
                return {
                    errors: [
                        {
                            field: "username",
                            message: "something went wrong",
                        },
                    ],
                };
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Query(() => UserResponse),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegistrationInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map