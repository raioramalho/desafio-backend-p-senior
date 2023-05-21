"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_tool_1 = require("../helpers/tools/hash.tool");
class UserType {
    constructor(user) {
        this.id = user.id;
        this.uuid = user.uuid;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
    getId() {
        return this.id;
    }
    getUUID() {
        return this.uuid;
    }
    async checkPassword(cleanPassword) {
        return await hash_tool_1.hashHelper.compare(cleanPassword, this.password);
    }
}
exports.default = UserType;
//# sourceMappingURL=user.js.map