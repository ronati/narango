<div align="center">
  <h1>narango</h1>
  <strong>A NestJS wrapper service for ArangoDB NodeJS driver</strong>
</div>

<hr>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
