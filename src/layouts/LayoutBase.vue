<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <ul class="nav-links">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/cats">Cats</RouterLink>
        </li>
        <li>
          <RouterLink to="/worms">Marine Species</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <slot />
  </main>
</template>

<style scoped>
header {
  background-color: #42b983;
  padding: 0.75rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
}

main {
  padding: 1rem;
}
</style>
