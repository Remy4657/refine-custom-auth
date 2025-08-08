import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { RefineContext } from "./_refine_context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const lang = cookieStore.get("NEXT_LOCALE");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang={lang?.value || "en"}>
      <body>
        <Suspense>
          <RefineContext defaultMode={defaultMode}>{children}</RefineContext>
        </Suspense>
      </body>
    </html>
  );
}
