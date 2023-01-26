import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@api/modules/auth/auth.service';
import { LoginDto } from '@api/modules/auth/dto/login.dto';
import { RegisterDto } from '@api/modules/auth/dto/register.dto';
import { Public } from '@api/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

const routeName = 'auth';

@ApiTags(routeName)
@Controller(routeName)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
