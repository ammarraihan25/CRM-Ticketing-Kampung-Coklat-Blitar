import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpRequestDto, OtpVerifyDto } from './dto/otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('otp/request')
  @HttpCode(HttpStatus.OK)
  requestOtp(@Body() otpRequestDto: OtpRequestDto) {
    return this.authService.requestOtp(otpRequestDto);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.verifyOtp(otpVerifyDto);
  }
}
