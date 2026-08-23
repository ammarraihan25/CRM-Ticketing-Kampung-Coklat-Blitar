<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const props = defineProps({
  activeMenu: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const route = useRoute()

const userName = ref('Ahmad')
const points = ref(450)
const isMobileMenuOpen = ref(false)

const logout = () => {
  router.push('/ticketing_dan_gate/self-service/login')
}

const handleMenuClick = (menu: string) => {
  isMobileMenuOpen.value = false // close menu on click
  
  const isHome = route.path === '/ticketing_dan_gate/self-service' || route.path === '/ticketing_dan_gate/self-service/'
  
  if (menu === 'pesan-tiket') {
    if (isHome) {
      document.getElementById('pesan-tiket')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/ticketing_dan_gate/self-service#pesan-tiket')
    }
  } else if (menu === 'fasilitas') {
    router.push('/ticketing_dan_gate/self-service/booking?category=Tiket+Masuk')
  } else if (menu === 'promo') {
    router.push('/ticketing_dan_gate/self-service/promo')
  } else if (menu === 'membership') {
    router.push('/ticketing_dan_gate/self-service/membership')
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <!-- White Navbar -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <img :src="logoImg" alt="Kampung Coklat" class="logo-img" @click="router.push('/ticketing_dan_gate/self-service')" style="cursor: pointer;" />
      </div>
      
      <!-- Hamburger Button (Mobile only) -->
      <button class="hamburger-btn" @click="toggleMobileMenu">
        <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="nav-content" :class="{ 'is-open': isMobileMenuOpen }">
        <div class="nav-links">
          <a href="javascript:void(0)" 
             class="nav-link" 
             :class="{ active: activeMenu === 'pesan-tiket' }"
             @click="handleMenuClick('pesan-tiket')">Pesan Tiket</a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'fasilitas' }"
             @click="handleMenuClick('fasilitas')">Fasilitas</a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'promo' }"
             @click="handleMenuClick('promo')">Promo</a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'membership' }"
             @click="handleMenuClick('membership')">Membership</a>
        </div>

        <div class="nav-user">
          <div class="user-info">
            <span class="user-greeting">Hi, Sobat Coklat</span>
            <span class="user-points">{{ points }} Poin</span>
          </div>
          <button class="profile-btn" @click="logout" title="Keluar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Navbar Base Styles from index.vue */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 12px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}
.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.logo-img {
  height: 45px;
  object-fit: contain;
}
.hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: #1e293b;
  cursor: pointer;
  padding: 8px;
}
.nav-content {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: flex-end;
}
.nav-links {
  display: flex;
  gap: 32px;
}
.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}
.nav-link:hover, .nav-link.active {
  color: #f29727;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #f29727;
  transition: width 0.3s ease;
  border-radius: 2px;
}
.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}
.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 32px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.user-greeting {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
}
.user-points {
  font-size: 11px;
  color: #f29727;
  font-weight: 700;
  background: #fffbeb;
  padding: 2px 8px;
  border-radius: 12px;
  margin-top: 2px;
}
.profile-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.profile-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* Mobile Responsive */
@media (max-width: 991px) {
  .nav-container {
    padding: 0 20px;
  }
  .hamburger-btn {
    display: block;
  }
  .nav-content {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    gap: 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-top: 1px solid #f1f5f9;
    
    /* Hidden state */
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }
  .nav-content.is-open {
    max-height: 500px;
    opacity: 1;
    visibility: visible;
    padding: 16px 20px;
  }
  .nav-links {
    flex-direction: column;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }
  .nav-link {
    display: block;
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
  }
  .nav-link::after {
    display: none;
  }
  .nav-link:hover, .nav-link.active {
    background: #f8fafc;
    padding-left: 12px;
    border-radius: 8px;
  }
  .nav-user {
    margin-left: 0;
    margin-top: 16px;
    justify-content: space-between;
  }
  .user-info {
    align-items: flex-start;
  }
}
</style>
