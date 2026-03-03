import React from 'react';

export default function Head({ children }: { children: React.ReactNode }) {
    // In Next.js App Router, modifying the document head from deep within Client Components 
    // is ignored or discouraged. We stub it out to prevent crashes.
    return <>{children}</>;
}
