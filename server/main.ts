import { NestFactory, Reflector } from "@nestjs/core";
import type { Express } from "express";
import { IncomingMessage, ServerResponse } from "node:http";
import { AppModule } from "./app.module";
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

bootstrap();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
  const { API_PREFIX = "/api" } = process.env
  const globalPrefix = API_PREFIX ? API_PREFIX.replace('/', '') : 'api'
	app.setGlobalPrefix(globalPrefix); // 设置全局前缀 没有读取到设置为 api
	const reflector = app.get(Reflector); // 获取 Reflector 实例
	app.useGlobalInterceptors(new TransformInterceptor(reflector)); // 全局注册拦截器
	app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册异常过滤器
	await app.init();
	resolveHandler(await app.getHttpAdapter().getInstance());
}

let resolveHandler: (value: Express) => void;
let expressHandler: Express | Promise<Express> = new Promise((resolve) => {
	resolveHandler = resolve;
});

export default async function handler(
	request: IncomingMessage,
	reply: ServerResponse,
) {
	if (expressHandler instanceof Promise) {
		expressHandler = await expressHandler;
	}

	expressHandler(request, reply);
}
