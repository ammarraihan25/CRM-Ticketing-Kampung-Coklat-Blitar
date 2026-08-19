<script setup lang="ts">
import type { Member } from '~/composables/useCrmApi'

const props = defineProps<{
  show: boolean
  targetIds: number[]
  members: Member[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'sent'): void
}>()

const { isLoading, error, sendBlast } = useWaGateway()

const message = ref('')

const selectedMembers = computed(() =>
  props.members.filter(member =>
    props.targetIds.includes(member.id)
  )
)

async function handleConfirm() {
  if (!message.value.trim()) return

  const res = await sendBlast({
    memberIds: props.targetIds,
    message: message.value
  })

  if (res.success) {
    message.value = ''
    emit('sent')
  }
}

function getInitial(name: string) {
  return name?.charAt(0)?.toUpperCase() || '?'
}
</script>

<template>
  <div
    v-if="show"
    class="modal-overlay"
    @click.self="emit('close')"
  >
    <div class="modal-card">

      <!-- HEADER -->

      <div class="modal-header">

        <div>
          <span class="modal-label">KOMUNIKASI MEMBER</span>
          <h2>Blast WhatsApp</h2>
        </div>

        <button
          class="close-button"
          @click="emit('close')"
        >
          ×
        </button>

      </div>

      <!-- BODY -->

      <div class="modal-body">

        <div class="recipient-box">

          <div class="recipient-icon">
            ◉
          </div>

          <div>
            <strong>
              {{ targetIds.length }} Member Terpilih
            </strong>

            <span>
              Pesan akan dikirim melalui WhatsApp.
            </span>
          </div>

        </div>

        <!-- RECIPIENTS -->

        <div
          v-if="selectedMembers.length"
          class="recipient-list"
        >

          <div
            v-for="member in selectedMembers"
            :key="member.id"
            class="recipient"
          >
            <div class="small-avatar">
              {{ getInitial(member.nama) }}
            </div>

            <div>
              <strong>{{ member.nama }}</strong>
              <span>{{ member.whatsapp }}</span>
            </div>
          </div>

        </div>

        <!-- MESSAGE -->

        <div class="form-group">

          <label>Pesan WhatsApp</label>

          <textarea
            v-model="message"
            rows="5"
            class="message-input"
            placeholder="Contoh: Halo Kak Caca, ada promo menarik dari Kampung Coklat..."
          ></textarea>

          <span class="character-count">
            {{ message.length }} karakter
          </span>

        </div>

        <div
          v-if="error"
          class="error-box"
        >
          {{ error }}
        </div>

      </div>

      <!-- FOOTER -->

      <div class="modal-footer">

        <button
          class="cancel-button"
          :disabled="isLoading"
          @click="emit('close')"
        >
          Batal
        </button>

        <button
          class="send-button"
          :disabled="isLoading || !message.trim()"
          @click="handleConfirm"
        >
          <span v-if="isLoading">
            Mengirim...
          </span>

          <span v-else>
            Kirim Pesan →
          </span>
        </button>

      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(53, 36, 26, 0.48);
  backdrop-filter: blur(4px);
}

.modal-card {
  width: 520px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(47, 30, 20, 0.22);
}

/* HEADER */

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 23px 24px;
  background: #5b3826;
  color: white;
}

.modal-label {
  color: #dfc39e;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.modal-header h2 {
  margin: 5px 0 0;
  color: white;
  font-size: 21px;
}

.close-button {
  width: 31px;
  height: 31px;
  border: 0;
  border-radius: 8px;
  background: rgba(255,255,255,0.12);
  color: white;
  font-size: 21px;
  cursor: pointer;
}

/* BODY */

.modal-body {
  padding: 22px 24px;
}

.recipient-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  border-radius: 12px;
  background: #f7f0e9;
}

.recipient-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #e9d8c8;
  color: #5b3826;
}

.recipient-box > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.recipient-box strong {
  color: #5b3826;
  font-size: 13px;
}

.recipient-box span {
  color: #978c82;
  font-size: 11px;
}

/* RECIPIENT */

.recipient-list {
  max-height: 135px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 13px;
}

.recipient {
  display: flex;
  align-items: center;
  gap: 9px;
}

.small-avatar {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eadbcf;
  color: #5b3826;
  font-size: 11px;
  font-weight: 700;
}

.recipient > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.recipient strong {
  color: #5b3826;
  font-size: 12px;
}

.recipient span {
  color: #a0968d;
  font-size: 10px;
}

/* MESSAGE */

.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 18px;
}

.form-group label {
  color: #5d5047;
  font-size: 12px;
  font-weight: 600;
}

.message-input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #e4dbd3;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  color: #4b2e20;
  background: #fcfaf8;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.6;
}

.message-input:focus {
  border-color: #9b6b4b;
  background: white;
  box-shadow: 0 0 0 3px rgba(155, 107, 75, 0.08);
}

.character-count {
  align-self: flex-end;
  color: #aaa097;
  font-size: 10px;
}

.error-box {
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  background: #fff0ef;
  color: #b94a43;
  font-size: 11px;
}

/* FOOTER */

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  padding: 17px 24px;
  border-top: 1px solid #eee8e2;
}

.cancel-button,
.send-button {
  min-height: 40px;
  padding: 0 16px;
  border-radius: 9px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid #e3dad2;
  background: white;
  color: #75695f;
}

.send-button {
  border: 0;
  background: #5b3826;
  color: white;
}

.send-button:hover:not(:disabled) {
  background: #4b2e20;
}

.send-button:disabled,
.cancel-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .modal-body,
  .modal-header,
  .modal-footer {
    padding-left: 17px;
    padding-right: 17px;
  }
}
</style>
