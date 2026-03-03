import { useRouter as useNextRouter, usePathname, useSearchParams } from 'next/navigation';

export function useRouter() {
    const router = useNextRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return {
        ...router,
        pathname: pathname || '/',
        route: pathname || '/',
        asPath: pathname + (searchParams?.toString() ? '?' + searchParams.toString() : ''),
        query: Object.fromEntries(searchParams?.entries() || []),
        events: {
            on: () => { },
            off: () => { },
            emit: () => { }
        }
    };
}
