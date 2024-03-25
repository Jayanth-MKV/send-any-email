import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { MailDto, MultiMailDto } from './dto/mail.dto';

@Controller()
@ApiTags('email')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-email')
  async sendInviteEmail(@Body() data: MailDto) {
    return await this.appService.sendInviteEmail(data);
  }

  @Post('send-multiple-emails')
  async sendMultipleInviteEmails(@Body() data: MultiMailDto[]) {
    return await this.appService.sendMultipleInviteEmails(data);
  }
}
