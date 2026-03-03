'use client';

import dynamic from 'next/dynamic'

const BrandbeetDesignDynamic = dynamic(
    () => import('@/components/projects/brandbeet-design/BrandbeetDesign'),
    { ssr: false }
)

export default function Page() {
    return <BrandbeetDesignDynamic />
}
