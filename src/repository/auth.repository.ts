import { pgPoolQuery } from '../database';
import { UserModel } from '../model';


export class AuthRepository {
    public static async getByLogin(email: string): Promise<UserModel | null> {
        const sql = `
            SELECT u.id, u.email, u.password, u.username, u.status, u.product_id, u.created_at, u.updated_at
            FROM public.user u
            WHERE u.email = $1
        `;
        const result = await pgPoolQuery(sql, [email]);

        if (!result.rows || result.rows.length === 0) {
            return null;
        }

        return result.rows[0] as UserModel;
    }
static async create(params: UserModel): Promise<UserModel> {

    const sql = `
            INSERT INTO public.user (email, "password", username, product_id)
            VALUES
            ($1, $2, $3, $4) RETURNING *;`
    const result = await pgPoolQuery(sql, [params.email, params.password, params.username, params.product_id]);

    if (!result.rows || result.rows.length === 0)
        return null as any;

    return result.rows[0];
}
}