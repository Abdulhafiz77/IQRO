import * as express from "express";
import { ProductController } from "..";
import { createValidator } from "express-joi-validation";
import { product_add_joi, id_joi } from "../validation";
import { checkToken } from "../utils";
const validator = createValidator({ passError: true });

export const ProductRoutes = (app: express.Application) => {
    app.get('/', checkToken, ProductController.getAll);
    app.post('/add', checkToken, validator.body(product_add_joi), ProductController.create);
    app.get('/:id', checkToken, validator.params(id_joi), ProductController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(product_add_joi), checkToken, ProductController.update);
    app.delete('/:id', validator.params(id_joi), checkToken, ProductController.delete);
};