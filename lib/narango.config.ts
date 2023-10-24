import type { Config } from "arangojs/connection.js";

export const MODULE_OPTIONS = Symbol("NARANGO_CONFIG");
export interface NarangoModuleOptions {
  database: Config;
}
