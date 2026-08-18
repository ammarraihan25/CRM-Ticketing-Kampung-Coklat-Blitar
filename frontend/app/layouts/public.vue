<template>
  <div class="public-layout">
    <header class="navbar dark-theme">
      <div class="nav-container">
        <div class="brand">
          <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Kampung Coklat Logo" class="brand-logo" />
        </div>
        <nav class="nav-links">
          <NuxtLink to="/">HOME</NuxtLink>
          <NuxtLink to="/ticketing_dan_gate/self-service">TICKETING</NuxtLink>
          <NuxtLink to="/ticketing_dan_gate/self-service">MEMBERSHIP</NuxtLink>
          <NuxtLink to="/ticketing_dan_gate/self-service">PARTY</NuxtLink>
          <NuxtLink to="/ticketing_dan_gate/self-service">SCHOOL FIELD TRIP</NuxtLink>
        </nav>
        <div class="nav-actions">
          <button class="btn-secondary">★ Be Our Member</button>
          <button class="btn-primary icon-btn">☰</button>
        </div>
      </div>
    </header>
    <main class="content">
      <slot />
    </main>
    <footer class="footer dark-footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Customer Care</h3>
          <p>🕒 Business Hours : 09:00 - 17:00</p>
          <p>✉️ cs@kampungcoklat.id</p>
        </div>
        <div class="footer-section">
          <h3>Payment Methods</h3>
          <div class="payment-logos">
            <span class="payment-badge">BCA</span>
            <span class="payment-badge">Mandiri</span>
            <span class="payment-badge">QRIS</span>
            <span class="payment-badge">OVO</span>
            <span class="payment-badge">GoPay</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 PT. Kampung Coklat Indonesia. All Rights Reserved.</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-surface);
}

.navbar.dark-theme {
  background-color: #1a100b; /* Very dark brown, almost black */
  background-image: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(26,16,11,0.9) 100%);
  color: var(--color-neutral);
  padding: 12px var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  height: 50px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
}

.nav-links a {
  color: var(--color-neutral);
  text-decoration: none;
  font-size: var(--text-nav-link);
  font-weight: 500;
  transition: color 0.2s ease;
  letter-spacing: 0.5px;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-secondary); /* Gold/Amber color */
}

.nav-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.icon-btn {
  padding: 8px 12px;
  font-size: 18px;
}

.content {
  flex: 1;
}

.footer.dark-footer {
  background-color: #2c1a13; /* Cocoa brown */
  border-top: 5px solid var(--color-secondary);
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-md);
  color: rgba(255, 255, 255, 0.7);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.footer-section h3 {
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-size: var(--text-label-lg);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-section p {
  margin: var(--spacing-xs) 0;
  font-size: var(--text-body-sm);
}

.payment-logos {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.payment-badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--rounded-sm);
  padding: 8px 16px;
  font-weight: bold;
  font-size: var(--text-label-sm);
  color: var(--color-neutral);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  font-size: var(--text-body-sm);
  color: rgba(255, 255, 255, 0.5);
}
</style>
