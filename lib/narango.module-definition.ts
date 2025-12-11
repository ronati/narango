import type { ConfigOptions as ArangoDBConfig } from "arangojs/configuration";
import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface NarangoModuleOptions {
  global?: boolean;
  database: ArangoDBConfig;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NarangoModuleOptions>()
    .setExtras({ global: false }, (definition, extras) => ({
      ...definition,
      global: extras.global,
    }))
    .build();
