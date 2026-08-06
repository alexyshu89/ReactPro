import esbuild from "esbuild";
import path from "path";

const args = process.argv.slice(2);
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const isProd = modeArg ? modeArg.split("=")[1] === "prod" : true;

console.log(
  `📦 [LIB] Запуск сборки в режиме: ${isProd ? "PRODUCTION" : "DEVELOPMENT"}`,
);

const entryPoints = [
  path.resolve(process.cwd(), "lib", "index.ts"),
  path.resolve(process.cwd(), "lib", "math.ts"),
  path.resolve(process.cwd(), "lib", "string.ts"),
];

const sharedLibConfig: esbuild.BuildOptions = {
  entryPoints,
  bundle: true,
  jsx: "automatic",
  logLevel: "info",
  external: ["react", "react-dom", "react-router", "lodash", "lodash/*"],
  entryNames: "[name]",

  minify: isProd,
  sourcemap: isProd,
  treeShaking: isProd ? true : undefined,
};

async function startLibBuild() {
  try {
    if (isProd) {
      await esbuild.build({
        ...sharedLibConfig,
        format: "esm",
        splitting: true,
        chunkNames: "chunks/[name]-[hash]",
        outdir: path.resolve(process.cwd(), "dist", "esm"),
        outExtension: { ".js": ".js" },
      });

      await esbuild.build({
        ...sharedLibConfig,
        format: "cjs",
        splitting: false,
        outdir: path.resolve(process.cwd(), "dist", "cjs"),
        outExtension: { ".js": ".cjs" },
      });

      console.log("✨ [LIB] Production сборка (ESM & CJS) успешно завершена!");
    } else {
      const devLibContext = await esbuild.context({
        ...sharedLibConfig,
        minify: false,
        sourcemap: false,
        format: "esm",
        splitting: true,
        chunkNames: "chunks/[name]-[hash]",
        outdir: path.resolve(process.cwd(), "dist", "esm"),
      });

      await devLibContext.watch();
      console.log(
        "👀 [LIB] Наблюдение за изменениями файлов библиотеки запущено...",
      );
    }
  } catch (error) {
    console.error("❌ [LIB] Ошибка сборки:", error);
    process.exit(1);
  }
}

startLibBuild();
