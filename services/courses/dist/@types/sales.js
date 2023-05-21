"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesType = void 0;
class SalesType {
    constructor(sale) {
        this.id = sale.id;
        this.uuid = sale.uuid;
        this.service_key = sale.service_key;
        this.productId = sale.productId;
        this.buyerEmail = sale.buyerEmail;
    }
    getUUID() {
        return this.uuid;
    }
    getID() {
        return this.id;
    }
}
exports.SalesType = SalesType;
//# sourceMappingURL=sales.js.map