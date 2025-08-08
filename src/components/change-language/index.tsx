"use client";
import { useSetLocale, useTranslation } from "@refinedev/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const { changeLocale, getLocale } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<string>("en"); // Giá trị mặc định

  // Đồng bộ giá trị ngôn ngữ khi component mount trên client
  useEffect(() => {
    const cookieLocale = Cookies.get("NEXT_LOCALE");
    const detectedLocale = cookieLocale || getLocale() || "en";
    setCurrentLocale(detectedLocale);
  }, [getLocale]);

  const handleChangeLanguage = (value: string) => {
    changeLocale(value);
    Cookies.set("NEXT_LOCALE", value, { expires: 365 });
    setCurrentLocale(value); // Cập nhật state ngay lập tức
  };

  return (
    <div>
      <span>Languages</span>
      <button
        disabled={currentLocale === "en"}
        onClick={() => handleChangeLanguage("en")}
      >
        English
      </button>
      <button
        disabled={currentLocale === "vi"}
        onClick={() => handleChangeLanguage("vi")}
      >
        Vie
      </button>
    </div>
  );
};

export default LanguageSwitcher;
