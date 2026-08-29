export type GuestBookVisitType =
  | 'pengajian'
  | 'hall'
  | 'b2b'

export interface GuestBookPayload {

  nama: string

  whatsapp: string

  domisili: string

  tipeKunjungan: GuestBookVisitType

  namaAcara: string

  tanggalKunjungan: string

}

export interface GuestBookRecord extends GuestBookPayload {

  id: string

  createdAt: string

  status: 'terdaftar' | 'terverifikasi'

}

export const useGuestBookApi = () => {

  // =====================================================
  // REQUEST OTP
  // =====================================================

  const requestOtp = async (
    payload: GuestBookPayload
  ) => {

    console.log(
      'Request Guest Book:',
      payload
    )

    /*
     * TODO BACKEND
     *
     * POST /api/v1/guestbook/register
     *
     * payload:
     * {
     *   nama,
     *   whatsapp,
     *   domisili,
     *   tipeKunjungan,
     *   namaAcara,
     *   tanggalKunjungan
     * }
     */

    return {
      success: true
    }

  }


  // =====================================================
  // VERIFY OTP
  // =====================================================

  const verifyOtp = async (
    whatsapp: string,
    code: string
  ) => {

    console.log(
      'Verify OTP:',
      whatsapp,
      code
    )

    /*
     * TODO BACKEND
     *
     * POST /api/v1/guestbook/verify-otp
     */

    return {
      success: true
    }

  }


  // =====================================================
  // GET GUEST BOOK DATA
  // =====================================================

  const getGuestBookData = async (): Promise<GuestBookRecord[]> => {

    /*
     * TODO BACKEND
     *
     * GET /api/v1/guestbook
     */

    return []

  }


  return {

    requestOtp,

    verifyOtp,

    getGuestBookData

  }

}