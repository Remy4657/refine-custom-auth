"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Refine, GitHubBanner } from "@refinedev/core";
import { DevtoolsProvider } from "@providers/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { useTranslate } from "@refinedev/core";
import { dataProvider } from "@providers/data-provider";
import { AppIcon } from "@components/app-icon";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { useTranslation } from "react-i18next";
import "../providers/i18n";

export const RefineContext = ({
  defaultMode,
  children,
}: Readonly<{
  defaultMode: string;
  children: React.ReactNode;
}>) => {
  const { t, i18n } = useTranslation();
  //const translate = useTranslate();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const i18nProvider = {
    translate: (key: string, params?: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("http://localhost:8080/api/v1")}
                notificationProvider={useNotificationProvider}
                authProvider={authProviderClient}
                i18nProvider={i18nProvider}
                resources={[
                  {
                    name: "products",
                    list: "/blog-posts", // http://localhost:3000/blog-posts
                    create: "/blog-posts/create", // http://localhost:3000/blog-posts/create
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    options: {
                      label: t("sider.product"), // chèn label dịch tại đây
                    },
                    // meta: {
                    //   canDelete: true,
                    //   delete: true,
                    // },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                    options: { hide: true },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "R0Biy9-1qN7Fq-aIo7Qd",
                  title: { text: "Refine Project", icon: <AppIcon /> },
                }}
              >
                {children}
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
