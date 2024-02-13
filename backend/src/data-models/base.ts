import { Column, PrimaryGeneratedColumn } from "typeorm";

export interface IBaseEntity {
  /**
   * @isInt
   */
  id: number | string;
  createdAt: string;
}

export class BaseEntity implements IBaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number | string;

  /**
   * Date of creation
   */
  @Column("timestamptz")
  public createdAt!: string;
}
