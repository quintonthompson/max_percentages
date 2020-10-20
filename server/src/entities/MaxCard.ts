import { Field, ObjectType, Resolver } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Athlete } from "./Athlete";

@ObjectType()
@Entity()
export class MaxCard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  athleteId!: number;

  @OneToOne((type) => Athlete)
  athlete!: Athlete;
}
