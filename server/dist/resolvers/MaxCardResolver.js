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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxCardResolver = void 0;
const MaxCard_1 = require("../entities/MaxCard");
const type_graphql_1 = require("type-graphql");
let MaxCardInput = class MaxCardInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MaxCardInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MaxCardInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxBench", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxSquat", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxPowerClean", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxSnatch", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxSumo", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxOverheadPress", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MaxCardInput.prototype, "maxJerk", void 0);
MaxCardInput = __decorate([
    type_graphql_1.InputType()
], MaxCardInput);
let MaxCardResolver = class MaxCardResolver {
    maxCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxCards = yield MaxCard_1.MaxCard.find();
            console.log("maxCards: ", maxCards);
            return maxCards;
        });
    }
    createMaxCard(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxCard = yield MaxCard_1.MaxCard.create(options).save();
            return maxCard;
        });
    }
    deleteMaxCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield MaxCard_1.MaxCard.delete({ id });
            console.log("result: ", result);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [MaxCard_1.MaxCard]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaxCardResolver.prototype, "maxCards", null);
__decorate([
    type_graphql_1.Mutation(() => MaxCard_1.MaxCard),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MaxCardInput]),
    __metadata("design:returntype", Promise)
], MaxCardResolver.prototype, "createMaxCard", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MaxCardResolver.prototype, "deleteMaxCard", null);
MaxCardResolver = __decorate([
    type_graphql_1.Resolver()
], MaxCardResolver);
exports.MaxCardResolver = MaxCardResolver;
//# sourceMappingURL=MaxCardResolver.js.map