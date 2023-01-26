import { registerAs } from '@nestjs/config';

export default registerAs(
  'mailer',
  (): Record<string, any> => ({
    transport: {
      host: process.env.SMTP_HOST || '127.0.0.1',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    },
    template: {
      dir: process.env.MAIL_TEMPLATE_PATH || '',
    },
  })
);
