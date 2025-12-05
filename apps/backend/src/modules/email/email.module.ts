import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtp://praytracker@noor.com:W6p4W6p4W6p4W6p4W6p4@smtp.ethereal.email:587',
      defaults: {
        from: 'Pray Tracker <praytracker@noor.com>',
      },
      template: {
        dir: join(__dirname, '..', '..', 'templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
