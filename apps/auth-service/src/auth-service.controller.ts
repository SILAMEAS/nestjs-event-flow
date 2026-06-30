import { LoginDto, RegisterDto } from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { CurrentUser, Public } from '@app/common/decorator';
import type { User } from '@app/database';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Public()
  @Post('register')
  registerUser(@Body() body: RegisterDto) {
    return this.authServiceService.register(
      body.email,
      body.password,
      body.name,
    );
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.authServiceService.login(body.email, body.password);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return this.authServiceService.getProfile(user.id);
  }
}
