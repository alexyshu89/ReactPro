import {
  ClickTimer,
  PreviousInput,
  FocusTracker,
  DebouncedLogger,
  WebSocketLogger,
} from "features/refExamples";

export const UseRefPage = () => (
  <div>
    <ClickTimer />
    <PreviousInput />
    <FocusTracker />
    <DebouncedLogger />
    <WebSocketLogger />
  </div>
);
