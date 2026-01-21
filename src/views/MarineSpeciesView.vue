<script setup lang="ts">
import { aphiaRecordByAphiaIdQuery, aphiaRecordsByDateQuery } from '@/client/worms/@pinia/colada.gen';
import LayoutBase from '@/layouts/LayoutBase.vue';
import { useQuery } from '@pinia/colada';
import { shallowRef } from 'vue';

const selectedAphiaID = shallowRef<number>();
const { data, isLoading } = useQuery(aphiaRecordsByDateQuery, () => ({
  query: {
    startdate: '2024-01-01',
  },
}));

const { data: detailsData, isLoading: detailsLoading } = useQuery(aphiaRecordByAphiaIdQuery, () => ({
  path: {
    ID: selectedAphiaID.value || 0,
  },
}));
</script>

<template>
  <LayoutBase>
    <h1>MarineSpecies</h1>
    <div v-if="isLoading">Loading...</div>
    <section v-else class="list-details">
      <div class="scroll-container">
        <ul class="list">
          <li v-for="record in data" :key="record.AphiaID">
            <button @click="selectedAphiaID = record.AphiaID">
              <p>{{ record.scientificname }} ({{ record.AphiaID }})</p>
            </button>
          </li>
        </ul>
      </div>
      <div class="details">
        <p v-if="!selectedAphiaID">Select a record to see details</p>
        <div v-else-if="detailsLoading">Loading details...</div>
        <div v-else>
          <h2>Details for AphiaID: {{ selectedAphiaID }}</h2>
          <dl>
            <dt>Name</dt>
            <dd>{{ detailsData?.valid_name }}</dd>
            <dt>Scientific Name</dt>
            <dd>{{ detailsData?.scientificname }}</dd>
            <dt>URL</dt>
            <dd>
              <a :href="detailsData?.url" target="_blank">{{ detailsData?.url }}</a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  </LayoutBase>
</template>

<style scoped>
.scroll-container,
.details {
  max-height: inherit;
  overflow: auto;
}

ul {
  list-style: none;
  background-color: burlywood;
  padding: 1rem;

  li:not(:last-child) {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
}

.list-details {
  max-height: 80dvh;
  overflow: clip;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;
}
</style>
