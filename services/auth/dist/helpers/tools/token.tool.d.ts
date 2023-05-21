import { User } from '@prisma/client';
export default class TokenTool {
    payload: User;
    constructor(payload: any);
    NewToken(): Promise<string>;
}
