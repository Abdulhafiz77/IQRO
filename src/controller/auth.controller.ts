import { CONFLICT } from 'http-status-codes';
import { AuthRepository } from '../repository';
import { AuthenticateModel, ValidatedRequest, ValidatedRequestBody } from '../model';
import { ErrorEnum } from '../model/enums';
import { PasswordService, ErrorService } from '../utils';
import { JwtService } from '../utils/jwt.service';

export class AuthController {

    static async login(req: ValidatedRequest<ValidatedRequestBody<AuthenticateModel>>, res: any) {
        try {
            const data = await AuthRepository.getByLogin(req.body.email);
            if (!data) return ErrorService.error(res, ErrorEnum.passPhoneIncorrect, CONFLICT);

            const passwordResult = PasswordService.decode(req.body.password, data.password);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            if (!passwordResult)
                return ErrorService.error(res, ErrorEnum.passPhoneIncorrect, CONFLICT);

            const token = await JwtService.issue({
                id: data.id!,
                password: data.password,
                username: data.username,
                email: data.email,
                date: new Date()
            });

        } catch (error) {
            ErrorService.error(res, error);
        }
    }

}
