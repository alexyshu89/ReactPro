import { type ReactNode, type MouseEventHandler } from "react";

export interface CustomButtonProps {
  click: MouseEventHandler<HTMLButtonElement>;
  name?: string;
  children?: ReactNode;
}
