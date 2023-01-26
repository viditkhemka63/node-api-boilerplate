import { registerAs } from '@nestjs/config';
import ms from 'ms';

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    jwt: {
      jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
      jwtPublicKey: process.env.JWT_PUBLIC_KEY,
      jwtIssuer: process.env.JWT_ISSUER,
      jwtAlgorithm: process.env.JWT_ALGORITHM,
      jwtExpiry: process.env.JWT_EXPIRY,
      jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY,

      accessToken: {
        secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY || '123456',
        expirationTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
          ? ms(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED)
          : ms('30m'), // recommendation for production is 30m
        notBeforeExpirationTime: ms(0), // keep it in zero value
      },

      refreshToken: {
        secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY || '123456000',
        expirationTime: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED
          ? ms(process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED)
          : ms('7d'), // recommendation for production is 7d
        expirationTimeRememberMe: process.env
          .AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED
          ? ms(process.env.AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED)
          : ms('30d'), // recommendation for production is 30d
        notBeforeExpirationTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
          ? ms(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED)
          : ms('30m'), // recommendation for production is 30m
      },
    },

    password: {
      saltLength: 8,
      expiredInMs: ms('182d'), // recommendation for production is 182 days
    },
  })
);
