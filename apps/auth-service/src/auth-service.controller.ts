import { LoginDto, RegisterDto } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('register')
  registerUser(@Body() body: RegisterDto) {
    return this.authServiceService.register(
      body.email,
      body.password,
      body.name,
    );
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authServiceService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.authServiceService.getProfile(req.user.userId);
  }
}
