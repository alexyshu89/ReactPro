import { type ReactNode, type MouseEventHandler } from "react";

export interface CustomButtonProps {
  click: MouseEventHandler<HTMLButtonElement>;
  name?: string;
  children?: ReactNode;
}

export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick(): void;
}
