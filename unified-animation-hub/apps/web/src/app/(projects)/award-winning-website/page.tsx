'use client';

import dynamic from 'next/dynamic'

const AwardWinningWebsiteDynamic = dynamic(
    () => import('@/components/projects/award-winning-website/AwardWinningWebsite'),
    { ssr: false }
)

export default function Page() {
    return <AwardWinningWebsiteDynamic />
}
