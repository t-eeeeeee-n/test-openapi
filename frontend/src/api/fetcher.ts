interface FetcherParams {
    url: string;
    method: string;
    data?: unknown;
    signal?: AbortSignal;
    headers?: HeadersInit;
}

const customFetcher = async <T>({ url, method, data, signal, headers }: FetcherParams): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

    const res = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal,
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status}`);
    }

    if (res.status === 204) return undefined as T;

    return res.json();
};

export default customFetcher;
