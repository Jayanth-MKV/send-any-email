import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MailDto, MultiMailDto } from './dto/mail.dto';

@Injectable()
export class AppService {
  constructor(@InjectQueue('gmail') private readonly emailQueue: Queue) {}

  async sendInviteEmail(data: MailDto) {
    const job = await this.emailQueue.add('invite', { ...data });

    return { jobId: job.id };
  }

  async sendMultipleInviteEmails(data: MultiMailDto[]) {

    let count = 0;
    
    for (let d of data) {
      const _ = await this.emailQueue.add('invite', { ...d });
      count++;
    }

    return {
      message:`${count} - emails sent`
    };
  }
}
