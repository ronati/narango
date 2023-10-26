import { Module } from "@nestjs/common";

import { NarangoService } from "./narango.service";
import { ConfigurableModuleClass } from "./narango.module-definition";

@Module({
  providers: [NarangoService],
  exports: [NarangoService],
})
export class NarangoModule extends ConfigurableModuleClass {}
