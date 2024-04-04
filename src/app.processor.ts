import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { DoneCallback } from 'bull';
import { jobInterface } from './mail.interface';

export default function (job: Job, cb: DoneCallback) {
  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'It works');
}

@Processor('gmail')
export class EmailProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('invite')
  async sendLoginEmail(job: Job<jobInterface>) {
      const { data } = job;
      // console.log("working on : ", data);

    const op = await this.mailService.sendMail({
      to: data.to,
      subject: data.subject,
      template: 'invitation',
      context: {
        name: data.name,
        link: data.link,
      },
    });

      console.log('mail sent', op.envelope);
  }
}
