import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Api')
    .setDescription('Api for an e-commerce site')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api',app,documentFactory)
  await app.listen(3000);
}
bootstrap();
