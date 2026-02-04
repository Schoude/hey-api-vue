<script setup lang="ts">
import { fromExcelMutation } from '@/client/client-portal-import/@pinia/colada.gen';
import { addFileLinkToDeliveryPointMutation } from '@/client/client-portal/@pinia/colada.gen';
import { aphiaRecordByAphiaIdQuery, aphiaRecordsByDateQuery } from '@/client/worms/@pinia/colada.gen';
import LayoutBase from '@/layouts/LayoutBase.vue';
import { useQuery, useMutation } from '@pinia/colada';
import { ref, shallowRef } from 'vue';

const { data, isLoading } = useQuery(aphiaRecordsByDateQuery, () => ({
  query: {
    startdate: '2024-01-01',
  },
}));

const { mutateAsync } = useMutation(addFileLinkToDeliveryPointMutation());
const mutation = useMutation({
  ...fromExcelMutation(),
});

async function onMutate() {
  await mutateAsync({ path: { entityId: 'abc', fileId: 'def' } });
}

async function onFilesUpload() {
  if (theFile.value == null) {
    return;
  }

  await mutation.mutateAsync({ body: { files: [theFile.value, theFile.value, theFile.value] } });
}

const theFile = ref<File | null>();

function onFileSelect(event: Event) {
  console.log(event);

  theFile.value = (event.target as HTMLInputElement).files?.item(0);
}

const selectedAphiaID = shallowRef<number>();
const { data: detailsData, isLoading: detailsLoading } = useQuery(() => ({
  ...aphiaRecordByAphiaIdQuery({
    path: {
      ID: Number(selectedAphiaID.value),
    },
  }),
  enabled: selectedAphiaID.value != null,
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

        <button @click="onMutate">MUTATE ME</button>
        <div>
          <input @change="onFileSelect" type="file" name="the-file" id="my-file" />
          <button :disabled="!theFile" @click="onFilesUpload">Upload file to dir</button>
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
