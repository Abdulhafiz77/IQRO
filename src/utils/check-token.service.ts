import { ValidatedRequest } from 'express-joi-validation';
import { UNAUTHORIZED } from 'http-status-codes';
import { ErrorService } from './error.service';
import { ErrorEnum } from '../model';
import { JwtService } from './jwt.service';


export const checkToken = async (req: ValidatedRequest<any>, res, next) => {
    try {
        let authorization = null;
        if (req.headers && req.headers.authorization) {
            authorization = req.headers.authorization.split(' ')[1];
        }

        if (!authorization) return ErrorService.error(res, ErrorEnum.token, UNAUTHORIZED);

        const decode = await JwtService.verify(authorization);
        if (!decode) return ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED);

    } catch (error) {
        ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED)
    }
}
