import FluidApp from '@/components/projects/fluid-simulation/FluidApp';

export const metadata = {
    title: 'Fluid Simulation',
    description: 'Real-time particle fluid simulation using the FLIP method on a 2D canvas.',
};

export default function FluidSimulationPage() {
    return <FluidApp />;
}
