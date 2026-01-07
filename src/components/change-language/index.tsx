"use client";

import { useTranslation } from "@refinedev/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const LanguageSwitcher = () => {
  const { changeLocale, getLocale } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  // Load saved locale from cookies on mount
  useEffect(() => {
    const cookieLocale = Cookies.get("NEXT_LOCALE");
    const detectedLocale = cookieLocale || getLocale() || "en";
    setCurrentLocale(detectedLocale);
  }, [getLocale]);

  const handleChangeLanguage = (value: string) => {
    changeLocale(value);
    Cookies.set("NEXT_LOCALE", value, { expires: 365 });
    setCurrentLocale(value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120, color: "#fff" }}>
      <Select
        labelId="language-select-label"
        value={currentLocale}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        sx={{ color: "#fff", border: "1px solid #fff", fontSize: "14px" }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="vi">Tiếng Việt</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
