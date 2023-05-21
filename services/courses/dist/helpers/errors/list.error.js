"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorList = void 0;
const common_1 = require("@nestjs/common");
class ErrorList {
    constructor() {
        this.Internal_Server_Error = {
            name: 'Internal_Server_Error',
            code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error!',
        };
        this.Already_Exists = {
            name: 'Already_Exists_Error',
            code: common_1.HttpStatus.CONFLICT,
            message: 'Conflict of data!',
        };
        this.Not_Found_Error = {
            name: 'Not_Found_Error',
            code: common_1.HttpStatus.NOT_FOUND,
            message: 'No data found!',
        };
        this.Bad_Request_Error = {
            name: 'Bad_Request_Error',
            code: common_1.HttpStatus.BAD_REQUEST,
            message: 'Bad request input!',
        };
        this.Expectation_Failed_Error = {
            name: 'Expectation_Failed_Error',
            code: common_1.HttpStatus.EXPECTATION_FAILED,
            message: 'Expectation falied!',
        };
    }
}
exports.errorList = new ErrorList();
//# sourceMappingURL=list.error.js.map