import React from "react";
import { useTitle, useMenu } from "@refinedev/core";

export const CustomSider: React.FC = () => {
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();

  return (
    <>
      <div>dssd</div>
    </>
  );
};
