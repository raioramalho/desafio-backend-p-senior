import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
const secretKey = 'raioramalho2023';

export default class TokenTool {
  payload: User;
  constructor(payload) {
    this.payload = payload;
  }
  async NewToken() {
    const token = jwt.sign(this.payload, secretKey, { expiresIn: '15m' });
    return token;
  }
}
