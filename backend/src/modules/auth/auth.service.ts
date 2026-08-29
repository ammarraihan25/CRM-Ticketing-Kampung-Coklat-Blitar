import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { OtpRequestDto, OtpVerifyDto } from './dto/otp.dto';

@Injectable()
export class AuthService {
  // In-memory mock for OTPs (In production, use Redis or DB)
  private otpStore = new Map<string, string>();

  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    // Mock static credentials since there is no users table in BRD
    const { username, password } = loginDto;
    
    if (username === 'admin' && password === 'admin123') {
      const payload = { username: username, role: 'admin' };
      return {
        success: true,
        message: 'Login berhasil',
        data: {
          access_token: this.jwtService.sign(payload),
        }
      };
    }
    
    throw new UnauthorizedException({
      success: false,
      message: 'Username atau password salah',
      data: null
    });
  }

  async requestOtp(otpRequestDto: OtpRequestDto) {
    const { nomor_whatsapp } = otpRequestDto;
    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in memory
    this.otpStore.set(nomor_whatsapp, otp);
    
    // Mock sending via WA
    console.log(`[WA MOCK] OTP untuk ${nomor_whatsapp} adalah: ${otp}`);
    
    return {
      success: true,
      message: 'Kode OTP telah dikirim ke WhatsApp Anda',
      data: null
    };
  }

  async verifyOtp(otpVerifyDto: OtpVerifyDto) {
    const { nomor_whatsapp, otp_code } = otpVerifyDto;
    const storedOtp = this.otpStore.get(nomor_whatsapp);
    
    if (!storedOtp) {
      throw new BadRequestException({
        success: false,
        message: 'Kode OTP tidak ditemukan atau sudah kadaluarsa',
        data: null
      });
    }
    
    if (storedOtp !== otp_code) {
      throw new BadRequestException({
        success: false,
        message: 'Kode OTP tidak valid',
        data: null
      });
    }
    
    // Clean up OTP after successful verification
    this.otpStore.delete(nomor_whatsapp);
    
    // In a real app, you might return a session token or mark user as verified
    return {
      success: true,
      message: 'Verifikasi OTP berhasil',
      data: null
    };
  }
}
