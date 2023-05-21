import { Token } from 'src/@types/token';
export default class JwtTool {
    token: string;
    constructor(token: string);
    decode(): Token;
}
