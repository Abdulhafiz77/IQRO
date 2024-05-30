import { BaseModel } from './base.model';

export interface ProductModel extends BaseModel {
    name: string,
    price: number,
    discription: string;
}