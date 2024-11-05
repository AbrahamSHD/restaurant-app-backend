<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/orm" target="blank"><img src="https://img.icons8.com/ios7/512/FFFFFF/prisma-orm.png" width="180" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="180" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Used Stack

- NestJs 
- PrismaORM
- PostgreSQL

## Installation

1. Clone the repository

2. Dependency installation
```bash
  pnpm install
```

3. Clone the `.env.template` file and rename the copy to `.env`

4. Llenar las variables de entorno definidas en el .env

5. Levantar la base de datos

```bash
  docker compose up -d
```

## Running the app

```bash
# development
  pnpm run start

# watch mode
  pnpm run start:dev

# production mode
  pnpm run start:prod
```

## Test

```bash
# unit tests
  pnpm run test

# e2e tests
  pnpm run test:e2e

# test coverage
  pnpm run test:cov
```
