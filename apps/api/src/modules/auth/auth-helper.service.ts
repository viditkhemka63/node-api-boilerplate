import { Injectable } from '@nestjs/common';
import { HelperHashService } from '@core/utils/helper/service/helper.hash.service';
import { HelperEncryptionService } from '@core/utils/helper/service/helper.encryption.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthHelperService {
  constructor(
    private readonly helperHashService: HelperHashService,
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService
  ) {}

  getTokens(user: any, ip: string, ua: string) {
    const payload = {
      user,
      ip,
      ua,
    };

    const accessToken: string =
      this.helperEncryptionService.jwtEncrypt(payload);
    const refreshToken: string = this.helperEncryptionService.jwtEncrypt(
      payload,
      {
        expiresIn: this.configService.get('auth.jwt.jwtRefreshExpiry'),
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async validatePassword(
    passwordString: string,
    passwordHash: string
  ): Promise<boolean> {
    return this.helperHashService.bcryptCompare(passwordString, passwordHash);
  }

  async createPassword(password: string): Promise<any> {
    const saltLength: number = this.configService.get<number>(
      'auth.password.saltLength'
    );
    const salt: string = this.helperHashService.randomSalt(saltLength);

    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      passwordHash,
      salt,
    };
  }
}
