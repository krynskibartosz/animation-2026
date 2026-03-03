'use client';

import dynamic from 'next/dynamic'

const OrganicGradientShaderDynamic = dynamic(
    () => import('@/components/projects/organic-gradients-shader/OrganicGradientShader'),
    { ssr: false }
)

export default function Page() {
    return <OrganicGradientShaderDynamic />
}
