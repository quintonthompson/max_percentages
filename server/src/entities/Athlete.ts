import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Athlete extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  // @OneToOne((type) => MaxCard)
  // @JoinColumn()
  // maxCard: MaxCard;
}
