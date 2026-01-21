<script setup lang="ts">
import { PiniaColadaDevtools } from '@pinia/colada-devtools';
</script>

<template>
  <RouterView />

  <PiniaColadaDevtools />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-block-start: 0;
}
</style>
