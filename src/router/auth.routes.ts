import * as express from "express";
import { createValidator } from "express-joi-validation";
import { AuthController } from "../controller";
import { auth_joi } from "../validation";
const validator = createValidator({ passError: true });

export const AuthRoutes = (app: express.Application) => {
    app.post('/login', validator.body(auth_joi), AuthController.login);
};
