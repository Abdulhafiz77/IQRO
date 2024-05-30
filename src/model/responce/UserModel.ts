import { BaseModel } from "..";

export interface UserModel extends BaseModel {
  email: string;
  password: string;
  username: string;
  product_id: number;
}
