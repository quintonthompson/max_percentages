import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class MaxCard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field()
  // @Column()
  // athleteId!: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ nullable: true })
  maxBench: number;

  @Field()
  @Column({ nullable: true })
  maxSquat: number;

  @Field()
  @Column({ nullable: true })
  maxPowerClean: number;

  @Field()
  @Column({ nullable: true })
  maxSnatch: number;

  @Field()
  @Column({ nullable: true })
  maxSumo: number;

  @Field()
  @Column({ nullable: true })
  maxOverheadPress: number;

  @Field()
  @Column({ nullable: true })
  maxJerk: number;

  // @OneToOne((type) => Athlete)
  // athlete!: Athlete;
}
