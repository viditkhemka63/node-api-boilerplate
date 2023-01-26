import { MailerService as CoreMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
// import {
//   SendMailOption,
//   MailAttactment,
// } from '@custom-types/send-mail-option.interface';

import { ISendMailOptions } from '@nestjs-modules/mailer';

export type MailAttactment = {
  filename: string;
  path: string;
  cid: string;
  [key: string]: string;
};

export interface SendMailOption extends ISendMailOptions {
  attachments?: Array<MailAttactment>;
}

@Injectable()
export class MailerService {
  constructor(
    private mailer: CoreMailerService,
    private config: ConfigService
  ) {}

  async sendMail(options: SendMailOption) {
    const mailOptions: SendMailOption = {
      ...options,
    };

    if (options.attachments && options.attachments.length) {
      mailOptions.attachments = (options.attachments || []).map(
        (attach: MailAttactment) => ({
          ...attach,
          path: join(
            this.config.get('mailTemplatePath'),
            'attachments',
            attach.path
          ),
        })
      );
    }

    return this.mailer.sendMail(mailOptions);
  }

  async sendInvitation(to: string, context) {
    return this.sendMail({
      to,
      subject: 'Invitation to collaborate | Saas Platfrom',
      template: 'user-invitation',
      context,
      attachments: [
        {
          filename: 'logo.png',
          path: 'logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async sendVerifyEmail(to: string, context) {
    console.log('sending mail to ', to, context);
    return this.sendMail({
      to,
      subject: 'Verify your Email | Saas Platfrom',
      template: 'verify-email',
      context,
      attachments: [
        // {
        //   filename: "logo.png",
        //   path: "logo.png",
        //   cid: "logo",
        // },
      ],
    });
  }

  async sendWelcome(to: string, context) {
    return this.sendMail({
      to,
      subject: 'Welcome Aboard',
      template: 'welcome-aboard',
      context,
      attachments: [
        {
          filename: 'logo.png',
          path: 'logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async sendPasswordRecoveryEmail(to: string, context) {
    return this.sendMail({
      to,
      subject: 'Password Recovery',
      template: 'password-recovery',
      context,
      attachments: [
        {
          filename: 'logo.png',
          path: 'logo.png',
          cid: 'logo',
        },
      ],
    });
  }
}
