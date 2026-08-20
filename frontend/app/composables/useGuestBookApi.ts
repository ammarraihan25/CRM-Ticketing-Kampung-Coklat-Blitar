export interface GuestBookPayload {
  nama: string;
  whatsapp: string;
  domisili: string;
}

export const useGuestBookApi = () => {
  // FEAT-07/08: kirim data pendaftaran, backend akan trigger kirim OTP ke WA
  const requestOtp = async (payload: GuestBookPayload) => {
    // TODO: POST /api/v1/guestbook/register
    console.log('Request OTP', payload);
    return { success: true };
  };

  // FEAT-08: verifikasi kode OTP yang diketik user
  const verifyOtp = async (whatsapp: string, code: string) => {
    // TODO: POST /api/v1/guestbook/verify-otp
    console.log('Verify OTP', whatsapp, code);
    return { success: true };
  };

  return {
    requestOtp,
    verifyOtp
  };
};