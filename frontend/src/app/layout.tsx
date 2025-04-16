'use client';

import './globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={{}}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </HydrationBoundary>
        </QueryClientProvider>
        </body>
        </html>
    );
}