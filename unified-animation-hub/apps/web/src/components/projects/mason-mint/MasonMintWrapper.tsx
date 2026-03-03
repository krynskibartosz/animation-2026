"use client";

import React, { useState } from 'react';
import { StoreProvider } from '@mason-mint/utils/Store';
import AppLayout from '@mason-mint/app/layouts/AppLayout';
import MainPreloaderWrapper from '@mason-mint/components/MainPreloader/MainPreloaderWrapper';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Import CSS
import 'bootstrap/scss/bootstrap-grid.scss';
import '@mason-mint/app/styles/index.scss';

export default function MasonMintWrapper({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <div className="mason-mint-app">
            <QueryClientProvider client={queryClient}>
                <StoreProvider>
                    <AppLayout>
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                style: {
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    fontWeight: '400',
                                    padding: '16px 24px',
                                    border: 'initial',
                                },
                                success: {
                                    duration: 5000,
                                    iconTheme: {
                                        primary: '#21D184',
                                        secondary: '#FFF',
                                    },
                                },
                            }}
                        />
                        <div id="portal"></div>
                        <MainPreloaderWrapper />
                        {children}
                    </AppLayout>
                </StoreProvider>
            </QueryClientProvider>
        </div>
    );
}
