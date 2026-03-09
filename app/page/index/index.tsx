import "@rescui/typography/lib/font-jb-sans-auto.css";
import "highlight.js/styles/github.css";

import { ThemeProvider } from "@rescui/ui-contexts";
import { HeaderSection } from "./header-section";
import { LatestFromKotlinSection } from "./latest-from-kotlin-section";
import { WhyKotlinSection } from "./why-kotlin-section";
import { UsageSection } from "./usage-section";
import { StartSection } from "./start-section";

import "./index.css";
import "../../../static/grid.css";

function OverviewPageContent() {
  return (
    <div className="overview-page">
      <HeaderSection />
      <LatestFromKotlinSection />
      <WhyKotlinSection />
      <UsageSection />
      <StartSection />
    </div>
  );
}

export const OverviewPage = () => (
  <ThemeProvider theme="dark">
    <OverviewPageContent />
  </ThemeProvider>
);
