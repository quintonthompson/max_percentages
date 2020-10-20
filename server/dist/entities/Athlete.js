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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Athlete = void 0;
const typeorm_1 = require("typeorm");
const MaxCard_1 = require("./MaxCard");
let Athlete = class Athlete extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Athlete.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => MaxCard_1.MaxCard),
    typeorm_1.JoinColumn(),
    __metadata("design:type", MaxCard_1.MaxCard)
], Athlete.prototype, "maxCard", void 0);
Athlete = __decorate([
    typeorm_1.Entity()
], Athlete);
exports.Athlete = Athlete;
//# sourceMappingURL=Athlete.js.map