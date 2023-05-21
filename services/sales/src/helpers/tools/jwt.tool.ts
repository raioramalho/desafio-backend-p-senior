import jwt_decode from 'jwt-decode';
import { Token } from 'src/@types/token';

export default class JwtTool {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  decode() {
    const token: Token = jwt_decode(this.token);
    return token;
  }
}
