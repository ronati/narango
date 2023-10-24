import { Module } from "@nestjs/common";
import type { DynamicModule } from "@nestjs/common";

import { NarangoService } from "./narango.service";
import { MODULE_OPTIONS } from "./narango.config";
import type { NarangoModuleOptions } from "./narango.config";

@Module({})
export class NarangoModule {
  static register(options: NarangoModuleOptions): DynamicModule {
    return {
      module: NarangoModule,
      providers: [
        { provide: MODULE_OPTIONS, useValue: options },
        NarangoService,
      ],
      exports: [NarangoService],
    };
  }
}
