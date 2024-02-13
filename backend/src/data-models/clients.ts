import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IClientCreateProps {
  name: string;
  email: string;
  phone: string;
  lastModifiedAt: Date;
}

export interface IClient extends IClientCreateProps, IBaseEntity {
  id: string;
}

@Entity("Client")
export class Client extends BaseEntity implements IClientCreateProps {
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
