import React from "react";
import { Header } from "@jetbrains/kotlin-web-site-ui/out/components/header/header.js";
import "@jetbrains/kotlin-web-site-ui/out/components/header/index.css";

const HeaderComp = (): React.ReactElement => {
  return (
    <Header
      productWebUrl="https://github.com/JetBrains/kotlin/releases/tag/v1.6.20"
      hasSearch={false}
      dropdownTheme="dark"
      currentUrl="/"
    />
  );
};

export default HeaderComp;
