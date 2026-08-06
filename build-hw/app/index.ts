import { usedFunction } from "./utils.ts";

alert(usedFunction());

async function loadLazyModule() {
  const { dynamicLog } = await import("./dynamic.ts");
  dynamicLog();
}

loadLazyModule();
