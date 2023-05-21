"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const looger = new common_1.Logger('courses-service');
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'courses-service',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'courses-consumer',
                allowAutoTopicCreation: true,
            },
        },
    });
    await app.listen();
    looger.log('courses-service is running!');
}
bootstrap();
//# sourceMappingURL=main.js.map