import { ValidatedRequest } from 'express-joi-validation';
import { ProductRepository } from '../repository';
import { PaginationParams, ProductModel, ValidatedRequestBody, ValidatedRequestQuery } from '../model';
import { ErrorService} from '../utils';


export class ProductController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {
            let data = await ProductRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async getById(req: ValidatedRequest<any>, res) {
        try {

            let data = await ProductRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async create(req: ValidatedRequest<ValidatedRequestBody<ProductModel>>, res) {
        try {

            const data = await ProductRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async update(req: ValidatedRequest<ValidatedRequestBody<ProductModel>>, res) {
        try {
            req.body.id = req.params.id;

            let checkId = await ProductRepository.getById(req.params.id);
            let data = await ProductRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await ProductRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}