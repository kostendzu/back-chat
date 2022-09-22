import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table
export class Online extends Model<Online> {

  @PrimaryKey
  @Column
  user_id: number;

  @Column
  status: boolean;
}