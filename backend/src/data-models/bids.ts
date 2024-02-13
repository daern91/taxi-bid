import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IBidCreateProps {
  rideId: number;
  fleetId: string;
  bidAmount: number;
  accepted?: boolean;
}

export interface IBid extends IBidCreateProps, IBaseEntity {
  id: number;
}

@Entity("Bid")
export class Bid extends BaseEntity implements IBidCreateProps {
  @Column({
    nullable: true,
    type: "number",
  })
  public override id!: number;

  @Column({
    nullable: false,
    type: "int",
  })
  public rideId!: number;

  @Column({
    nullable: false,
    type: "uuid",
  })
  public fleetId!: string;

  @Column({
    nullable: false,
    type: "decimal",
  })
  public bidAmount!: number;

  @Column({
    nullable: false,
    type: "boolean",
  })
  public accepted!: boolean;
}
