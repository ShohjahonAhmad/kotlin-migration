import React from "react";
import { Footer } from "@jetbrains/kotlin-web-site-ui/out/components/footer/footer.js";
import "@jetbrains/kotlin-web-site-ui/out/components/footer/index.css";
import { ThemeProvider } from "@rescui/ui-contexts";

const FooterComp = (
  props: React.ComponentProps<typeof Footer>
): React.ReactElement => {
  return (
    <ThemeProvider theme="dark">
      <Footer {...props} />
    </ThemeProvider>
  );
};

export default FooterComp;
