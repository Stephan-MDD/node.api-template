# Node API Template

-   Setup test DB env
-   Expose GraphQL endpoint

_Make Enums & Errors globally available (namespaces)_

## Environment Variables

**Server Configurations**

-   `SERVER_PORT = 4000`

**Json Web Token Configurations**

-   `JWT_SECRET` `NotPublic`

**Bcrypt Configurations**

-   `BCRYPT_SALT` `NotPublic`

**TypeORM PostgreSQL Configurations**

-   `TYPEORM_CONNECTION = postgres`
-   `TYPEORM_HOST = localhost`
-   `TYPEORM_USERNAME` `NotPublic`
-   `TYPEORM_PASSWORD` `NotPublic`
-   `TYPEORM_DATABASE` `NotPublic`
-   `TYPEORM_PORT = 5432`
-   `TYPEORM_SYNCHRONIZE = true`
-   `TYPEORM_LOGGING = true` logs generated sql queries
-   `TYPEORM_ENTITIES = Src/Entities/*.ts`
