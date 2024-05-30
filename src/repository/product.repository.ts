import { ProductModel, pgPoolQuery } from "..";

export class ProductRepository {

    static async getAll(params: any): Promise<ProductModel[]> {

        const parameters: any = [];
        let pagination = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }


        const sql = `SELECT p.id,
                            p.name,
                            p.price,
                            p.description,
                            p.create_at,
                            p.update_at
                  FROM product as p ${pagination}`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }

    static async getById(id: number): Promise<ProductModel> {
        const sql = `SELECT p.id,
                            p.name, 
                            p.price,
                            p.description,
                            p.create_at,
                            p.update_at
                        FROM product p
                            WHERE p.id = $1;`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: ProductModel): Promise<ProductModel> {

        const sql = `
        INSERT INTO product (name, price, description) VALUES ($1, $2, $3) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.name, params.price, params.discription]);

        return result.rows[0];
    }

    static async update(params: ProductModel): Promise<ProductModel> {

        const sql = `UPDATE product SET 
        name = $1,
        price = $2,
        description = $3,
        update_at = NOW() WHERE id = $4;`

        const result = await pgPoolQuery(sql,
            [params.name,
            params.price,
            params.discription,
            params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `DELETE FROM productw WHERE id = $1;`;
        await pgPoolQuery(sql, [id]);

    }
}