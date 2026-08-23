<template>
  <footer id="membership" class="kc-footer">
    <div class="footer-bottom">
      <div class="fb-left">
        <h4 class="fb-brand">Kampung Coklat</h4>
        <p class="fb-desc">Destinasi wisata edukasi dan pengalaman cokelat di Blitar.</p>
      </div>
      <div class="fb-right">
        <p>&copy; 2026 Kampung Coklat. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.kc-footer {
  margin-top: 80px;
}
.footer-bottom {
  background-color: #251814;
  padding: 32px 5%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
}
.fb-left h4 {
  color: #fff;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
}
.fb-left p, .fb-right p {
  color: #a8a29e;
  margin: 0;
  font-size: 14px;
}
@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
