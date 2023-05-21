"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashHelper = void 0;
const bcryptjs_1 = require("bcryptjs");
class HashTools {
    async generate(password_hash) {
        const genHash = await (0, bcryptjs_1.hash)(password_hash, 6);
        return genHash;
    }
    async compare(password, password_hash) {
        const result = await (0, bcryptjs_1.compare)(password, password_hash);
        return result;
    }
}
exports.hashHelper = new HashTools();
//# sourceMappingURL=hash.tool.js.map