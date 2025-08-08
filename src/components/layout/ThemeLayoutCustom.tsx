import React from "react";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Header } from "@components/header";
import { ThemedSiderV2 } from "./sider";

export default async function LayoutCustom({
  children,
}: React.PropsWithChildren) {
  return (
    <ThemedLayoutV2 Sider={ThemedSiderV2} Header={Header}>
      {children}
    </ThemedLayoutV2>
  );
}
