export default {
    api: {
        input: '../backend/src/swagger.json',
        output: {
            mode: 'tags-split',
            target: './src/api',
            schemas: './src/api/model',
            client: 'react-query',
            override: {
                mutator: {
                    path: './src/api/fetcher.ts',
                    name: 'customFetcher',
                    default: true,
                    requestOptions: true
                }
            }
        }
    }
};
