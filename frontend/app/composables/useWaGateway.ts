export interface BlastPayload {
  memberIds: number[];
  message: string;
}

export const useWaGateway = () => {
  // FEAT-21: state loading & error ini yang dipakai UI buat nampilin
  // tombol "Mengirim..." atau pesan error kalau gagal
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const sendBlast = async (payload: BlastPayload) => {
    isLoading.value = true;
    error.value = null;
    try {
      // TODO: POST /api/v1/wa/blast — trigger kirim pesan lewat WhatsApp Gateway
      console.log('Blast WA', payload);
      return { success: true };
    } catch {
      error.value = 'Gagal mengirim pesan. Coba lagi.';
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    sendBlast
  };
};