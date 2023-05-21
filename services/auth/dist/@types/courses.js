"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseType = void 0;
class CourseType {
    constructor(course) {
        this.id = course.id;
        this.uuid = course.uuid;
        this.title = course.title;
        this.price = course.price;
        this.created_at = course.created_at;
        this.updated_at = course.updated_at;
    }
    getUUID() {
        return this.uuid;
    }
    getID() {
        return this.id;
    }
}
exports.CourseType = CourseType;
//# sourceMappingURL=courses.js.map