<div align="center">
  <h1>narango</h1>
  <strong>A NestJS wrapper service for ArangoDB NodeJS driver</strong>
</div>

<hr>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Installation

```
npm i @ronatilabs/narango
```

This package has multiple peer dependencies and expects your project to have them installed:

1. `@nestjs/common`
2. `@nestjs/core`
3. `arangojs`

Check the `package.json` to know the version range.

# Usage

## Import NarangoModule

This package exports a NestJS module for you to import in your application:

```typescript
import { Module } from "@nestjs/common";
import { NarangoModule } from "@ronatilabs/narango";

import { MyService } from "./my-service.service";

@Module({
  imports: [
    NarangoModule.register({
      database: {
        url: "http://localhost:8529",
        databaseName: "MyDatabase",
        auth: {
          username: "userDB",
          password: "secretPassword",
        },
      },
    }),
  ],
  providers: [MyService],
})
export class MyAppModule {}
```

For sake of simplicity the database credentials are passed directly to the register function in the example but in a production environment you'd want to use [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) instead.

`NarangoModule` can be registered as a global module through the `global` option:

```ts
  imports: [
    NarangoModule.register({
      global: true,
      database: {
        url: "http://localhost:8529",
        databaseName: "MyDatabase",
        auth: {
          username: "userDB",
          password: "secretPassword",
        },
      },
    }),
  ],

```

### Async registration

If you need to use providers to provide the options to Narango module, you can use `NarangoModule.registerAsync`:

```ts
import { Module } from "@nestjs/common";
import { NarangoModule } from "@ronatilabs/narango";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    NarangoModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        database: {
          url: config.get<string>("url"),
          databaseName: config.get<string>("databaseName"),
          auth: {
            username: config.get<string>("username"),
            password: config.get<string>("password"),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MyAppModule {}
```

## Inject NarangoService

Now you can access the `NarangoService` everywhere you need it in your application:

```typescript
import { Injectable } from "@nestjs/common";
import { NarangoService } from "@ronatilabs/narango";

@Injectable()
export class MyService {
  constructor(private narango: NarangoService) {}

  async myMethod() {
    const collections = await this.narango.db._collections();
    // do whatever you want
  }
}
```

# Contribute

**All contributions are welcome!**

## Local setup

There is a `.nvmrc` file at the project root which indicates the current version used to develop. It works with [`nvm`](https://github.com/nvm-sh/nvm) which is a tool to help you manage the different `node` versions you're using. If you don't already use it, we highly recommend you to give it a try.

## Commit format

This project is setup with automatic semver versioning based on your commit semantic. It uses [`commitizen`](https://commitizen.github.io/cz-cli/) to enforce the format and help contributors format their commit message. We follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/). Once you want to commit your work, you need to:

1. `git add` the changes you want to commit.
2. Run `npx cz` to start the commitizen CLI.
3. Follow along the wizard to create your commit.
4. Push your commit on the branch.
5. Create your PR.

## Notes for project's maintainers

When you merge a PR from `beta` into `main` and it successfully published a new version on the `latest` channel, **don't forget to create a PR from `main` to `beta`**. **This is mandatory** for `semantic-release` to take it into account for next `beta` version.
