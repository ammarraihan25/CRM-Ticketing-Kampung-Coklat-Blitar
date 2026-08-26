import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyMultipart from '@fastify/multipart';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyMultipart);
  
  app.useStaticAssets({
    root: join(process.cwd(), 'public'),
    prefix: '/',
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001, '::');
}
bootstrap();
