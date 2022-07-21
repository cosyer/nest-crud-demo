import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  // 工厂创建module
  const app = await NestFactory.create(AppModule);

  //注册拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());

  const options = new DocumentBuilder()
    .setTitle('project')
    .setDescription('project description')
    .setVersion('1.0')
    .addTag('project')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
