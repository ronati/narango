/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, jest } from "@jest/globals";
import { Test } from "@nestjs/testing";

import { NarangoModule } from "./narango.module";
import { NarangoService } from "./narango.service";
import { Global, Injectable, Module } from "@nestjs/common";

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
  const options = {
    url: "http://localhost:8529",
    auth: {
      username: "root",
      password: "password",
    },
    databaseName: "dbName",
  };

  it("can be imported in another module with database options", async () => {
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

  it("can be registered globally", async () => {
    @Injectable()
    class TestService {
      constructor(private narango: NarangoService) {}
    }

    @Module({ providers: [TestService] })
    class ChildModule {}

    // NestJS would throw if the NarangoService is not available in the child module
    const rootModule = await Test.createTestingModule({
      imports: [
        NarangoModule.register({
          global: true,
          database: options,
        }),
        ChildModule,
      ],
    }).compile();

    const serviceFromRoot = rootModule.get<NarangoService>(NarangoService);
    expect(serviceFromRoot).toBeDefined();
    expect((serviceFromRoot.db as any).options).toEqual(options);
  });

  it("can be registered async", async () => {
    @Injectable()
    class TestService {
      public options = { url: "http://overridden.url" };
      constructor() {}
    }

    @Global()
    @Module({ providers: [TestService], exports: [TestService] })
    class ChildModule {}

    const rootModule = await Test.createTestingModule({
      imports: [
        ChildModule,
        NarangoModule.registerAsync({
          useFactory: (testService: TestService) => {
            return {
              database: {
                ...options,
                url: testService.options.url,
              },
            };
          },
          inject: [TestService],
        }),
      ],
    }).compile();

    const serviceFromRoot = rootModule.get<NarangoService>(NarangoService);
    expect(serviceFromRoot).toBeDefined();
    expect((serviceFromRoot.db as any).options).toEqual({
      ...options,
      url: "http://overridden.url",
    });
  });
});

/* eslint-enable @typescript-eslint/no-explicit-any */
