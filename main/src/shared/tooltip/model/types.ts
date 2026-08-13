import type { ReactNode } from "react";

import type { TooltipPosition } from "../ui/TooltipPosition";

export interface TooltipProps {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  content: ReactNode;
  position?: TooltipPosition;
}

export interface Coords {
  top: number;
  left: number;
}
