import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HmacSHA256, enc } from 'crypto-js';
import { AllExceptionsFilter } from './middlewares/exception.filter';


async function bootstrap() {



  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const { httpAdapter } = app.get(HttpAdapterHost)
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter as unknown as HttpAdapterHost))

  app.enableCors({
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: '*',
    origin: [
      "https://servfy.com.br",
      "http://servfy.com.br",
      "http://localhost:3000"
    ]
  });

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
