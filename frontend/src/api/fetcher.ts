interface FetcherParams {
    url: string;
    method: string;
    data?: unknown;
    signal?: AbortSignal;
    headers?: HeadersInit;
}

const customFetcher = async <T>({ url, method, data, ...rest }: FetcherParams): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

    let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const res = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: data ? JSON.stringify(data) : undefined,
        ...rest,
    });

    if (res.status === 401 && localStorage.getItem('refreshToken')) {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
            const { accessToken } = await refreshRes.json();
            localStorage.setItem('accessToken', accessToken);

            return customFetcher({ url, method, data, ...rest });
        }
    }

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.status === 204 ? undefined as T : res.json();
};

export default customFetcher;
