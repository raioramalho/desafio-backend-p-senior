import { Courses } from '@prisma/client';

export class CourseType implements Courses {
  id: number;
  uuid: string;
  title: string;
  price: number;
  created_at: Date;
  updated_at: Date;

  constructor(course: Courses) {
    this.id = course.id;
    this.uuid = course.uuid;
    this.title = course.title;
    this.price = course.price;
    this.created_at = course.created_at;
    this.updated_at = course.updated_at;
  }

  // You can also add any additional methods or functionality specific to SalesType class here
  getUUID() {
    return this.uuid;
  }

  getID() {
    return this.id;
  }
}
