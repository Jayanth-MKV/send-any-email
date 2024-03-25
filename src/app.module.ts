import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailProcessor } from './app.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          username: configService.get<string>('REDIS_USER'),
          password: configService.get<string>('REDIS_PASS'),
          tls: {
            host: configService.get<string>('REDIS_HOST'),
            port: Number(configService.get<string>('REDIS_PORT')) || 6379,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'gmail',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<string>('EMAIL_PORT'),
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        },
        template: {
          dir: join(process.cwd(), 'src/', 'templates/'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_FROM'),
        },
      }),
      inject: [ConfigService],
    }),
    EmailProcessor
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
