<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2>CRM & Ticketing</h2>
      <nav>
        <ul>
          <li><NuxtLink to="/">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/pos">POS Kasir</NuxtLink></li>
          <li><NuxtLink to="/gate">Gate Scanner</NuxtLink></li>
          <li><NuxtLink to="/guestbook">Guest Book</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}
.sidebar nav ul {
  list-style: none;
  padding: 0;
}
.sidebar nav ul li {
  margin-bottom: 0.5rem;
}
.sidebar nav ul li a {
  color: white;
  text-decoration: none;
}
.sidebar nav ul li a:hover {
  text-decoration: underline;
}
.content {
  flex: 1;
  padding: 1rem;
  background-color: #f8f9fa;
}
</style>
