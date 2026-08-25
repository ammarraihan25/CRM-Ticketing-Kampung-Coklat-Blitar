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

const savedUserName = useState('selfServiceUserName', () => 'Sobat Coklat')
const userName = ref(savedUserName.value)
const isMobileMenuOpen = ref(false)

const goToProfile = () => {
  router.push('/ticketing_dan_gate/self-service/profile')
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
             @click="handleMenuClick('pesan-tiket')">
             <div class="nav-icon-wrap">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M15 5v2"/><path d="M15 11v2"/><path d="M15 17v2"/><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"/></svg>
             </div>
             <span>Pesan Tiket</span>
          </a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'fasilitas' }"
             @click="handleMenuClick('fasilitas')">
             <div class="nav-icon-wrap">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
             </div>
             <span>Fasilitas</span>
          </a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'promo' }"
             @click="handleMenuClick('promo')">
             <div class="nav-icon-wrap">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
             </div>
             <span>Promo</span>
          </a>
          
          <a href="javascript:void(0)" 
             class="nav-link"
             :class="{ active: activeMenu === 'membership' }"
             @click="handleMenuClick('membership')">
             <div class="nav-icon-wrap">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
             </div>
             <span>Membership</span>
          </a>
        </div>

        <div class="nav-user">
          <button class="profile-nav-btn" @click="goToProfile">
            <div class="avatar-nav">{{ userName.charAt(0).toUpperCase() }}</div>
            <span class="username-nav">{{ userName }}</span>
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
  gap: 12px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #475569;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 30px;
  transition: all 0.3s ease;
  background: transparent;
}
.nav-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}
.nav-icon {
  width: 18px;
  height: 18px;
}
.nav-link:hover {
  background: #FEF3C7;
  color: #B45309;
}
.nav-link.active {
  background: #2C1A13;
  color: #F59E0B;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.15);
}
.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 32px;
}
.profile-nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 1px solid #E2E8F0;
  padding: 6px 16px 6px 6px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;
}
.profile-nav-btn:hover {
  background: #F8FAFC;
  border-color: #CBD5E1;
}
.avatar-nav {
  width: 32px;
  height: 32px;
  background: #FFFBEB;
  color: #D97706;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}
.username-nav {
  font-weight: 700;
  color: #1E293B;
  font-size: 14px;
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
    gap: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }
  .nav-link {
    display: flex;
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    border-radius: 14px;
    background: #F8FAFC;
    color: #475569;
  }
  .nav-link:hover {
    background: #F1F5F9;
    color: #1E293B;
  }
  .nav-link.active {
    background: linear-gradient(135deg, #2C1A13 0%, #442212 100%);
    color: #F59E0B;
    box-shadow: 0 6px 15px rgba(44, 26, 19, 0.15);
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
