import { Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { CreateUser } from './users.dto';
import { Exclude } from "class-transformer";

@Table
export class user extends Model<user> {

  @PrimaryKey
  @Column
  user_id: number;

  @Column
  login: string;

  @Column
  password: string;

  @Column
  @Exclude()
  createdAt: Date;

  // constructor(partial: Partial<user>) {
  //   Object.assign(this, partial);
  // }
}