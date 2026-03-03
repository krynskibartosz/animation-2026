import CallToAction from "@/components/projects/the-line/components/Server/CallToAction";
import ClosingLogoBlock from "./ClosingLogoBlock";
import { cn } from "@/components/projects/the-line/utils/cn";

export default function ContactMobile({ className }: { className?: string }) {
  return (
    <div className={cn("bg-off-white", className)}>
      <CallToAction />
      <ClosingLogoBlock />
    </div>
  );
}
