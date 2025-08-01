"use client";
import React from "react";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Header } from "@components/header";
import { CustomSider } from "@components/sider";

export default async function LayoutCustom({
  children,
}: React.PropsWithChildren) {
  return <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>;
}
