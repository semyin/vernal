import { defineConfig, loadEnv } from "vite";
import { vavite } from "vavite";
import { swc } from "rollup-plugin-swc3";
import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { join } from "node:path";

export default defineConfig(({ mode }) => {
	// 加载 .env 文件中的环境变量
	const env = loadEnv(mode, process.cwd());
	const port = parseInt(env.VITE_PORT || "3000", 10)
	return {
		server: {
			port
		},
    resolve: {
      alias: {
        "#root": __dirname,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
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
      noExternal: ["react-markdown", "react-syntax-highlighter"]
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
			react(),
			ssr({ disableAutoFullBuild: true }),
		],
	}
});
