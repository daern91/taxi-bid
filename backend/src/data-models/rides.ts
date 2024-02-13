import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IRideCreateProps {
  clientId: string;
  pickupLocation: string;
  dropoffLocation: string;
  proposedPrice: number;
  isOpen?: boolean;
}

export interface IRide extends IRideCreateProps, IBaseEntity {
  id: number;
}

@Entity("Ride")
export class Ride extends BaseEntity implements IRideCreateProps {
  @Column({
    type: "number",
  })
  public override id!: number;

  @Column({
    nullable: false,
    type: "uuid",
  })
  public clientId!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public pickupLocation!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public dropoffLocation!: string;

  @Column({
    nullable: false,
    type: "decimal",
  })
  public proposedPrice!: number;

  @Column({
    nullable: false,
    type: "boolean",
  })
  public isOpen!: boolean;
}
