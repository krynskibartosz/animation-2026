import React from 'react';

export default function ModernWebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <link
                href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
                rel="stylesheet"
            />
            {children}
        </section>
    );
}
