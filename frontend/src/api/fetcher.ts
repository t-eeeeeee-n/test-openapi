const customFetcher = async <T>({ url, method, data, ...rest }: any): Promise<T> => {
    const response = await fetch(`http://localhost:3001${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        ...rest,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
};

export default customFetcher;
