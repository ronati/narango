import { Inject, Injectable } from "@nestjs/common";
import type { OnApplicationShutdown } from "@nestjs/common";
import { Database } from "arangojs";

import { MODULE_OPTIONS } from "./narango.config.js";
import type { NarangoModuleOptions } from "./narango.config.js";

@Injectable()
export class NarangoService implements OnApplicationShutdown {
  public db: Database;

  constructor(@Inject(MODULE_OPTIONS) private options: NarangoModuleOptions) {
    this.db = new Database(options.database);
  }

  onApplicationShutdown() {
    this.db.close();
  }
}
