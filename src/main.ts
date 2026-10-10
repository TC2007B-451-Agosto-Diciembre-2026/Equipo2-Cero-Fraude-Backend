import "dotenv/config";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from 'node:path';
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });

    app.enableCors({
        origin: "http://localhost:5173",
    })
    app.useGlobalPipes(new ValidationPipe({
        transform: true, whitelist: true
    }));

    const config = new DocumentBuilder()
        .setTitle("Cero Fraude")
        .setDescription(
        "API REST de la aplicación Cero Fraude",
        )
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV !== "production") {
        SwaggerModule.setup("docs", app, document);
    }

    await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}

bootstrap();
