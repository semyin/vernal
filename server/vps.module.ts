import { DynamicModule, Inject, Module, OnModuleInit } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import type { NextFunction, Request, Response } from "express";
import { fileURLToPath } from "node:url";
import { renderPage } from "vike/server";
import { ServeStaticModule } from "@nestjs/serve-static";
import devServer from "vavite/http-dev-server";

import { MetaModule } from './meta/meta.module';
import { SiteModule } from "./site/site.module";
import { SiteService } from "./site/site.service";
import { MetaService } from "./meta/meta.service";

const OPTIONS = Symbol.for("vike.options");

interface ViteSsrOptions {
  root?: string;
}

@Module({
  imports: [
    MetaModule,
    SiteModule
  ]
})
export class VpsModule implements OnModuleInit {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(OPTIONS)
    private readonly viteSsrOptions: ViteSsrOptions,
    private readonly siteService: SiteService,
    private readonly metaService: MetaService
  ) { }

  static forRoot(options?: ViteSsrOptions): DynamicModule {
    options ??= {
      root: fileURLToPath(new URL("../client", import.meta.url)),
    };

    const imports: DynamicModule[] = [];
    if (!devServer) {
      imports.push(
        ServeStaticModule.forRoot({
          rootPath: options.root,
          serveRoot: "/",
        }),
      );
    }

    return {
      module: VpsModule,
      imports,
      providers: [{ provide: OPTIONS, useValue: options }],
    };
  }

  async onModuleInit() {
    if (!this.httpAdapterHost) {
      throw new Error(
        "httpAdapterHost is undefined, no decorator metadata available",
      );
    }
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    if (!httpAdapter) {
      return;
    }
    const app = httpAdapter.getInstance();

    app.get("*", async (req: Request, res: Response, next: NextFunction) => {
      const urlOriginal = req.originalUrl;
      const headersOriginal = req.headers;
      const site = this.siteService.getSite()
      const metas = this.metaService.getBaseMeta()
      const pageContext = await renderPage({ urlOriginal, headersOriginal, site, metas });
      const { httpResponse } = pageContext;
      httpResponse.pipe(res)
      // if not use html streaming
      // if (!httpResponse) {
      // 	next();
      // 	return;
      // }
      // const { body, statusCode, headers } = httpResponse;
      // headers.forEach(([name, value]) => res.header(name, value));
      // res.status(statusCode);
      // res.send(body);
    });
  }
}
