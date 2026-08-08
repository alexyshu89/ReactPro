import esbuild from "esbuild";
import path from "path";

const args = process.argv.slice(2);
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const isProd = modeArg ? modeArg.split("=")[1] === "prod" : true;

console.log(
  `📱 [APP] Запуск сборки в режиме: ${isProd ? "PRODUCTION" : "DEVELOPMENT"}`,
);

const appConfig: esbuild.BuildOptions = {
  entryPoints: {
    app: path.resolve(process.cwd(), "app", "index.ts"),
  },
  bundle: true,
  jsx: "automatic",
  logLevel: "info",

  minify: isProd,
  sourcemap: isProd,
  treeShaking: isProd ? true : undefined,

  format: "esm",
  splitting: true,

  outdir: path.resolve(process.cwd(), "dist", "app"),
  entryNames: "[name]",
  chunkNames: "chunks/[name]-[hash]",
};

async function startAppBuild() {
  try {
    if (isProd) {
      await esbuild.build(appConfig);
      console.log("✨ [APP] Production сборка завершена!");
    } else {
      const appConfigDev = { ...appConfig, minify: false, sourcemap: false };

      const devContext = await esbuild.context(appConfigDev);

      await devContext.watch();
      console.log("👀 [APP] Наблюдение за изменениями (watch) запущено...");

      const serveResult = await devContext.serve({
        servedir: path.resolve(process.cwd(), "dist", "app"),
        port: 3000,
      });

      const host = serveResult.hosts[0] || "localhost";
      console.log(
        `🔗 [APP] Сервер запущен на http://${host}:${serveResult.port}`,
      );
    }
  } catch (error) {
    console.error("❌ [APP] Ошибка сборки:", error);
    process.exit(1);
  }
}

startAppBuild();
