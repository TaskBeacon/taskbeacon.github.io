import type { Metadata } from "next";
import { ResourceAccordion } from "@/components/resource-accordion";
import { publicResourceLinks, tutorialResources } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tutorial",
  description: "Tutorial entry points for PsyFlow, CLI, QA, localization, and Chinese onboarding."
};

export default function TutorialPage() {
  return (
    <div className="lg:pt-6">
      <section aria-label="Tutorial guide list">
        <ResourceAccordion resources={publicResourceLinks(tutorialResources)} />
      </section>
    </div>
  );
}
