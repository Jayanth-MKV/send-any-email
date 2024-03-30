import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Send multiple invite emails' })
  @ApiBody({ type: [MultiMailDto] }) // Specify the example value for the array of MultiMailDto
  async sendMultipleInviteEmails(@Body() data: MultiMailDto[]) {
    return await this.appService.sendMultipleInviteEmails(data);
  }
}
