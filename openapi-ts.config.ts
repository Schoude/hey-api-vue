import { defineConfig } from '@hey-api/openapi-ts';

const baseConfig = {
  plugins: [
    {
      name: '@pinia/colada',
      queryOptions: true,
      queryKeys: {
        tags: true,
      },
      mutationOptions: true,
    },
    'zod',
  ],
};

export default defineConfig([
  {
    input: {
      path: 'https://cataas.com/doc.json',
    },
    output: 'src/client/cataas',
    ...baseConfig,
  },
  {
    input: {
      path: './openapi/WoRMS.yaml',
    },
    output: 'src/client/worms',
    ...baseConfig,
  },
]);
