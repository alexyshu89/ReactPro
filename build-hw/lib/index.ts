import React from "react";
import { sum } from "./math";
import { capitalizeText } from "./string";

interface LibraryBannerProps {
  title: string;
  version?: string;
}

export const LibraryBanner: React.FC<LibraryBannerProps> = ({
  title,
  version = "1.0.0",
}) => {
  const result = sum(2, 2);
  const formattedTitle = capitalizeText(title);

  return React.createElement(
    "div",
    { className: "lib-banner" },
    React.createElement("h1", null, formattedTitle),
    React.createElement("p", null, `Версия: ${version}`),
    React.createElement("span", null, `Тест математики (2 + 2): ${result}`),
  );
};

export * from "./math";
export * from "./string";
