import * as JWT from 'jsonwebtoken';
import { TokenPayload, UserModel } from '../model';


export class JwtService {

    static async issue(payload: TokenPayload, secret?: string) {
        return await JWT.sign(payload, secret ? secret : process.env.JWT_SECRET);
    }

    static async issueRegistrationProcess(payload: UserModel, secret?: string) {
        return await JWT.sign(payload, secret ? secret : process.env.JWT_SECRET, { expiresIn: '2h' } );
    }

    static async verify(token): Promise<UserModel | null> {
        try {
            return await JWT.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            return null
        }
    }

    static async decode(token) {
        return await JWT.decode(token);
    }

    static getClearPhoneNumber(rawPhone: string) {

        let clearPhoneNumber = rawPhone.replace(/\s/g, '');

        if (clearPhoneNumber.startsWith("+"))
            clearPhoneNumber = clearPhoneNumber.substr(1);

        return clearPhoneNumber;
    }

    static generateCode(count: number) {
        let _sym = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let str = '';
        for (let i = 0; i < count; i++) {
            str += _sym[parseInt(Math.random() * (_sym.length) + '')];
        }
        return process.env.ENV === 'dev' ? 'ASD123' : str;
    };
}
