import { Inject, Injectable } from "@nestjs/common";
import type { OnApplicationShutdown } from "@nestjs/common";
import { Database } from "arangojs";

import {
  MODULE_OPTIONS_TOKEN,
  NarangoModuleOptions,
} from "./narango.module-definition";

@Injectable()
export class NarangoService implements OnApplicationShutdown {
  public db: Database;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: NarangoModuleOptions,
  ) {
    this.db = new Database(options.database);
  }

  onApplicationShutdown() {
    this.db.close();
  }
}
