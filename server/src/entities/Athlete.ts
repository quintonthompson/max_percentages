import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxCard } from "./MaxCard";

@Entity()
export class Athlete extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => MaxCard)
  @JoinColumn()
  maxCard: MaxCard;
}
