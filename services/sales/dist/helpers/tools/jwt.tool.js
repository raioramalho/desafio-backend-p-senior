"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = require("jwt-decode");
class JwtTool {
    constructor(token) {
        this.token = token;
    }
    decode() {
        const token = (0, jwt_decode_1.default)(this.token);
        return token;
    }
}
exports.default = JwtTool;
//# sourceMappingURL=jwt.tool.js.map