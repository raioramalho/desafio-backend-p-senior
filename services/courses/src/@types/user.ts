import { User } from '@prisma/client';
import { hashHelper } from 'src/helpers/tools/hash.tool';

export default class UserType implements User {
  id: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.uuid = user.uuid;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;

    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

  // Métodos adicionais da classe UserType podem ser adicionados aqui
  getId() {
    return this.id;
  }

  getUUID() {
    return this.uuid;
  }

  async checkPassword(cleanPassword: string) {
    return await hashHelper.compare(cleanPassword, this.password);
  }
}
