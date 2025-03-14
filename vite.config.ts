import { defineConfig, loadEnv } from "vite";
import { vavite } from "vavite";
import { swc } from "rollup-plugin-swc3";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import ssr from "vike/plugin";
import { join } from "node:path";

export default defineConfig(({ mode }) => {
  // 加载 .env 文件中的环境变量
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_PORT || "3000", 10);
  return {
    server: {
      port,
    },
    resolve: {
      alias: {
        "#root": __dirname,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    buildSteps: [
      {
        name: "client",
      },
      {
        name: "server",
        config: {
          build: { ssr: true },
        },
      },
    ],
    ssr: {
      external: ["reflect-metadata"],
      noExternal: [
        "react-markdown",
        "react-spinners"
      ],
    },
    esbuild: false,
    plugins: [
      {
        ...swc({
          jsc: {
            baseUrl: join(__dirname, ""),
            paths: {
              "*": ["*"],
            },
            transform: {
              decoratorMetadata: true,
              legacyDecorator: true,
            },
            target: "es2017",
          },
        }),
        enforce: "pre", // Make sure this is applied before anything else
      },
      vavite({
        handlerEntry: "/server/main.ts",
        serveClientAssetsInDev: true,
      }),
      {
        name: "warmup",
        configureServer(server) {
          server.httpServer?.once("listening", () => {
            console.log("✅ Vite 开发服务已启动");
            // 在此执行预热逻辑
            if (mode === "development") {
              const port = server.config.server.port;
              const baseURL = `http://localhost:${port}`;
              const apiPrefix = env.VITE_API_PREFIX;
              const warmupURL = `${baseURL}${apiPrefix}/`;
              fetch(warmupURL)
                .then(res => {
                  if (res.ok) {
                    console.log("✅ 开发环境预热请求成功");
                  } else {
                    console.error("⚠️ 预热接口返回非 200 状态:", res.status);
                  }
                })
                .catch(err => {
                  console.error("❌ 预热请求失败:", err.message);
                });
            }
          });
        }
      },
      react(),
      ssr({ disableAutoFullBuild: true }),
      dynamicImport(),
    ],
  };
});
