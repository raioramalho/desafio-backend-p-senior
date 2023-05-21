export class TokenType {
  id: number;
  uuid: string;
  email: string;
  role: [];
  constructor(id: number, uuid: string, email: string, role: []) {
    this.id = id;
    this.uuid = uuid;
    this.email = email;
    this.role = role;
  }
}
