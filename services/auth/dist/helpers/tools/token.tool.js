"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const secretKey = 'raioramalho2023';
class TokenTool {
    constructor(payload) {
        this.payload = payload;
    }
    async NewToken() {
        const token = jwt.sign(this.payload, secretKey, { expiresIn: '15m' });
        return token;
    }
}
exports.default = TokenTool;
//# sourceMappingURL=token.tool.js.map