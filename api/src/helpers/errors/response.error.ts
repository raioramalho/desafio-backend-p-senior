export class ResponseError extends Error {
  name: string;
  code: number;
  message: string;

  constructor(error: any) {
    super(error.message);
    this.name = error.name;
    this.code = error.code;
    this.message = error.message;
  }
}

export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    // Define a propriedade 'code' com o valor fornecido como argumento
  }
}
