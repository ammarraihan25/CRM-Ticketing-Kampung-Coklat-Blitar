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

const {
  isLoading,
  error,
  sendBlast
} = useWaGateway()

const message = ref(
  'Halo {name}! 👋\n\nAda promo spesial dari Kampung Coklat untuk Anda. Jangan lewatkan kesempatan menarik ini ya! 🍫'
)

const selectedMembers = computed(() =>
  props.members.filter(member =>
    props.targetIds.includes(member.id)
  )
)

const recipientCount = computed(() =>
  selectedMembers.value.length
)

const characterCount = computed(() =>
  message.value.length
)

const canSend = computed(() =>
  recipientCount.value > 0 &&
  message.value.trim().length > 0 &&
  !isLoading.value
)

async function handleConfirm() {
  if (!canSend.value) return

  const res = await sendBlast({
    memberIds: props.targetIds,
    message: message.value
  })

  if (res.success) {
    emit('sent')
  }
}

function getInitial(name?: string) {
  if (!name) return '?'

  return name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatWhatsApp(value?: string) {
  if (!value) return '-'

  return value.startsWith('62')
    ? `+${value}`
    : value
}

function closeModal() {
  if (isLoading.value) return

  emit('close')
}
</script>

<template>

  <Teleport to="body">

    <div
      v-if="show"
      class="modal-overlay"
      @click.self="closeModal"
    >

      <div class="modal-card">

        <!-- HEADER -->

        <div class="modal-header">

          <div class="header-icon">
            📣
          </div>

          <div class="header-text">

            <span>
              WHATSAPP CAMPAIGN
            </span>

            <h2>
              Kirim Broadcast Promo
            </h2>

            <p>
              Kirim pesan WhatsApp ke member terpilih.
            </p>

          </div>

          <button
            class="close-button"
            :disabled="isLoading"
            @click="closeModal"
          >
            ×
          </button>

        </div>

        <!-- BODY -->

        <div class="modal-body">

          <!-- TARGET -->

          <section class="section">

            <div class="section-label">
              TARGET SUMMARY
            </div>

            <div class="target-card">

              <div class="target-row">

                <div class="target-left">
                  <span class="target-icon">
                    🎯
                  </span>

                  <div>
                    <strong>
                      Target Member
                    </strong>

                    <small>
                      Member yang akan menerima pesan
                    </small>
                  </div>
                </div>

                <div class="recipient-number">
                  {{ recipientCount }}
                  <span>
                    members
                  </span>
                </div>

              </div>

            </div>

          </section>

          <!-- RECIPIENTS -->

          <section class="section">

            <div class="section-heading">

              <div>
                <div class="section-label">
                  RECIPIENTS
                </div>

                <strong>
                  Member terpilih
                </strong>
              </div>

              <span class="count-pill">
                {{ recipientCount }}
              </span>

            </div>

            <div class="recipient-list">

              <div
                v-for="member in selectedMembers"
                :key="member.id"
                class="recipient"
              >

                <div class="avatar">
                  {{ getInitial(member.nama) }}
                </div>

                <div class="recipient-info">

                  <strong>
                    {{ member.nama }}
                  </strong>

                  <span>
                    {{ formatWhatsApp(member.whatsapp) }}
                  </span>

                </div>

                <span class="check">
                  ✓
                </span>

              </div>

            </div>

          </section>

          <!-- MESSAGE -->

          <section class="section">

            <div class="message-heading">

              <div class="section-label">
                MESSAGE CONTENT
              </div>

              <div class="variables">
                <span>
                  {name}
                </span>

                <span>
                  {points}
                </span>
              </div>

            </div>

            <div class="textarea-wrapper">

              <textarea
                v-model="message"
                rows="6"
                maxlength="1000"
                placeholder="Tulis pesan WhatsApp..."
              />

              <div class="character-count">
                {{ characterCount }} / 1000
              </div>

            </div>

            <div class="message-hint">
              💡 Gunakan
              <strong>{name}</strong>
              untuk otomatis memasukkan nama member.
            </div>

          </section>

          <!-- WARNING -->

          <div
            v-if="error"
            class="error-box"
          >
            <span>!</span>

            <div>
              <strong>
                Pengiriman gagal
              </strong>

              <p>
                {{ error }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="warning-box"
          >
            <span>ⓘ</span>

            <div>
              <strong>
                Pastikan pesan sudah benar
              </strong>

              <p>
                Pesan akan dikirim ke
                <strong>
                  {{ recipientCount }} member
                </strong>
                melalui WhatsApp.
              </p>
            </div>

          </div>

        </div>

        <!-- FOOTER -->

        <div class="modal-footer">

          <button
            class="cancel-button"
            :disabled="isLoading"
            @click="closeModal"
          >
            Batal
          </button>

          <button
            class="send-button"
            :disabled="!canSend"
            @click="handleConfirm"
          >

            <span v-if="isLoading">
              Mengirim...
            </span>

            <template v-else>
              Konfirmasi & Kirim
              <span>
                →
              </span>
            </template>

          </button>

        </div>

      </div>

    </div>

  </Teleport>

</template>

<style scoped>

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  background:
    rgba(38, 27, 21, 0.58);

  backdrop-filter:
    blur(7px);
}

.modal-card {
  width: 620px;
  max-width: 100%;
  max-height: 92vh;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border-radius: 20px;

  background: #ffffff;

  box-shadow:
    0 30px 90px
    rgba(40, 26, 18, 0.30);

  animation:
    modalIn 0.2s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* HEADER */

.modal-header {
  display: grid;
  grid-template-columns: 48px 1fr 36px;
  gap: 13px;
  align-items: center;

  padding: 21px 23px;

  border-bottom:
    1px solid #eee7e1;
}

.header-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: #fff0d8;

  font-size: 22px;
}

.header-text span {
  color: #b18b6e;

  font-size: 9px;
  font-weight: 800;

  letter-spacing: 1.3px;
}

.header-text h2 {
  margin: 4px 0 0;

  color: #332016;

  font-size: 20px;
  font-weight: 800;
}

.header-text p {
  margin: 3px 0 0;

  color: #968980;

  font-size: 11px;
}

.close-button {
  width: 34px;
  height: 34px;

  border: 1px solid #e5ddd7;
  border-radius: 9px;

  background: white;

  color: #76665c;

  font-size: 21px;

  cursor: pointer;
}

.close-button:hover {
  background: #f8f3ef;
}

.close-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* BODY */

.modal-body {
  overflow-y: auto;

  padding: 21px 23px;
}

.section {
  margin-bottom: 21px;
}

.section-label {
  color: #a1948a;

  font-size: 9px;
  font-weight: 800;

  letter-spacing: 1px;
}

.target-card {
  margin-top: 9px;

  padding: 14px;

  border:
    1px solid #ebe3dc;

  border-radius: 12px;

  background:
    #fcfaf8;
}

.target-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.target-left {
  display: flex;
  align-items: center;
  gap: 11px;
}

.target-icon {
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #f0e3d7;

  font-size: 16px;
}

.target-left div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.target-left strong {
  color: #493126;
  font-size: 12px;
}

.target-left small {
  color: #9a8e86;
  font-size: 9px;
}

.recipient-number {
  color: #3a2419;

  font-size: 19px;
  font-weight: 800;
}

.recipient-number span {
  color: #998d85;

  font-size: 9px;
  font-weight: 500;
}

/* RECIPIENTS */

.section-heading,
.message-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-heading > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section-heading strong {
  color: #493126;
  font-size: 12px;
}

.count-pill {
  min-width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #f1e4d9;

  color: #68442e;

  font-size: 10px;
  font-weight: 800;
}

.recipient-list {
  max-height: 125px;

  overflow-y: auto;

  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 7px;
}

.recipient {
  display: flex;
  align-items: center;

  gap: 9px;

  padding: 9px;

  border:
    1px solid #eee8e2;

  border-radius: 10px;

  background: #fff;
}

.avatar {
  width: 31px;
  height: 31px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 9px;

  background: #eee3da;

  color: #65432f;

  font-size: 9px;
  font-weight: 800;
}

.recipient-info {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
}

.recipient-info strong {
  overflow: hidden;

  color: #453127;

  font-size: 10px;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipient-info span {
  color: #9b9088;

  font-size: 8px;
}

.check {
  margin-left: auto;

  color: #1ca357;

  font-size: 11px;
  font-weight: 800;
}

/* MESSAGE */

.variables {
  display: flex;
  gap: 5px;
}

.variables span {
  padding: 4px 7px;

  border-radius: 5px;

  background: #f7eee7;

  color: #7c5d48;

  font-size: 8px;
  font-weight: 700;
}

.textarea-wrapper {
  position: relative;

  margin-top: 9px;
}

.textarea-wrapper textarea {
  width: 100%;
  min-height: 135px;

  box-sizing: border-box;

  padding: 13px;

  resize: vertical;

  border:
    1px solid #ddd5cf;

  border-radius: 11px;

  outline: none;

  background: #fff;

  color: #433026;

  font-family: inherit;

  font-size: 11px;

  line-height: 1.65;
}

.textarea-wrapper textarea:focus {
  border-color: #9a6b4c;

  box-shadow:
    0 0 0 3px
    rgba(154,107,76,0.08);
}

.character-count {
  position: absolute;

  right: 10px;
  bottom: 9px;

  color: #aaa099;

  font-size: 8px;
}

.message-hint {
  margin-top: 6px;

  color: #a1968f;

  font-size: 9px;
}

.message-hint strong {
  color: #77543d;
}

/* WARNING */

.warning-box,
.error-box {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  padding: 12px;

  border-radius: 10px;
}

.warning-box {
  background: #fff6e8;

  color: #9c5b22;
}

.error-box {
  background: #fff0ef;

  color: #b34e48;
}

.warning-box > span,
.error-box > span {
  font-size: 14px;
}

.warning-box strong,
.error-box strong {
  font-size: 10px;
}

.warning-box p,
.error-box p {
  margin: 3px 0 0;

  font-size: 9px;
  line-height: 1.5;
}

/* FOOTER */

.modal-footer {
  display: flex;
  justify-content: flex-end;

  gap: 8px;

  padding: 15px 23px;

  border-top:
    1px solid #eee7e1;
}

.cancel-button,
.send-button {
  min-height: 39px;

  padding: 0 15px;

  border-radius: 9px;

  font-family: inherit;

  font-size: 10px;
  font-weight: 700;

  cursor: pointer;
}

.cancel-button {
  border:
    1px solid #ded6cf;

  background: white;

  color: #66574e;
}

.send-button {
  display: flex;
  align-items: center;
  gap: 9px;

  border: 0;

  background: #5b3826;

  color: white;
}

.send-button:hover:not(:disabled) {
  background: #472a1e;
}

.send-button:disabled,
.cancel-button:disabled {
  opacity: 0.45;

  cursor: not-allowed;
}

.send-button span {
  font-size: 15px;
}

@media (max-width: 600px) {

  .modal-overlay {
    padding: 10px;
  }

  .modal-card {
    max-height: 95vh;
  }

  .modal-body {
    padding: 18px;
  }

  .recipient-list {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    padding: 13px 18px;
  }

  .cancel-button,
  .send-button {
    flex: 1;
  }

}
</style>