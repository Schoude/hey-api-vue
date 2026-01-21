<script setup lang="ts">
import { apiCatsQuery } from '@/client/cataas/@pinia/colada.gen';
import LayoutBase from '@/layouts/LayoutBase.vue';
import { useQuery } from '@pinia/colada';
import { shallowRef } from 'vue';
const limit = shallowRef(20);
const { data, isLoading } = useQuery(apiCatsQuery, () => ({
  query: {
    tags: 'fat',
    limit: limit.value,
  },
}));
</script>

<template>
  <LayoutBase>
    <h1>Cats</h1>
    <input type="number" name="limit" id="limit" v-model="limit" />
    <div v-if="isLoading">Loading...</div>
    <ul v-else>
      <li v-for="cat in data" :key="cat.id">
        <p>Tags: {{ cat.tags.join(', ') }}</p>
      </li>
    </ul>
  </LayoutBase>
</template>
