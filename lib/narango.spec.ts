/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, jest } from "@jest/globals";
import { Test } from "@nestjs/testing";

import { NarangoModule } from "./narango.module.js";
import { NarangoService } from "./narango.service.js";

const closeSpy = jest.fn();
jest.mock("arangojs", () => ({
  Database: class {
    public options: object;

    constructor(opt) {
      this.options = opt;
    }

    close() {
      closeSpy();
    }
  },
}));

describe("Narango module", () => {
  it("can be imported in another module with database options", async () => {
    const options = {
      url: "http://localhost:8529",
      auth: {
        username: "root",
        password: "password",
      },
      databaseName: "dbName",
    };

    const module = await Test.createTestingModule({
      imports: [
        NarangoModule.register({
          database: options,
        }),
      ],
    }).compile();

    const service = module.get<NarangoService>(NarangoService);
    expect(service).toBeDefined();
    expect(service.db).toBeDefined();
    expect((service.db as any).options).toEqual(
      expect.objectContaining(options),
    );
  });

  it("close arango connection when application shutdown", async () => {
    const options = {
      url: "http://localhost:8529",
      auth: {
        username: "root",
        password: "password",
      },
      databaseName: "dbName",
    };

    const module = await Test.createTestingModule({
      imports: [
        NarangoModule.register({
          database: options,
        }),
      ],
    }).compile();

    await module.close();

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});

/* eslint-enable @typescript-eslint/no-explicit-any */
