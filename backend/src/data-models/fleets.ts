import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IFleetCreateProps {
  name: string;
  email: string;
  phone: string;
  lastModifiedAt: Date;
}

export interface IFleet extends IFleetCreateProps, IBaseEntity {
  id: string;
}

@Entity("Fleet")
export class Fleet extends BaseEntity implements IFleetCreateProps {
  @Column({
    nullable: false,
    type: "varchar",
    unique: true,
  })
  public email!: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  public name!: string;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true,
  })
  public phone!: string;

  @Column("timestamptz")
  public lastModifiedAt!: Date;
}
