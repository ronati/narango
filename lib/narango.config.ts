import type { Config } from "arangojs/connection";

export const MODULE_OPTIONS = Symbol("NARANGO_CONFIG");
export interface NarangoModuleOptions {
  global?: boolean;
  database: Config;
}
