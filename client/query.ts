import { GrpcClient } from './client';

export const query = async ({ searchQueryClient }: GrpcClient) => {
  const queries = [
    {
      query: 'avatar',
      shouldFind: [
        'avatar-2009',
      ],
    },
    {
      query: 'legend',
      shouldFind: [
        'i-am-legend-2007',
      ],
    },
    {
      query: 'space',
      shouldFind: [
        'interstellar-2014',
      ],
    },
    {
      query: 'survive',
      shouldFind: [
        'i-am-legend-2007',
        'interstellar-2014',
      ],
    },
  ];

  for (const { query, shouldFind } of queries) {
    console.log('Querying index for', `"${query}"`);

    const result = await searchQueryClient.query({ query });

    if (result.hits.every(({ id }) => shouldFind.includes(id))) {
      console.log('Query result is expected');
    } else {
      console.log('Query result is unexpected:', result.hits);
    }
  }

  console.log('Done');
};
