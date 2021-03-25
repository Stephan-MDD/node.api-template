# Node API Template

## Authentication

`Bearer Header`

`authenticate` - validates JWT

### Usage

**Without authentication middleware**

```typescript
// typescript
app.get('', async (req: Request, res: Response) => {
	// handle request here...
});
```

**With authenticate middleware**

```typescript
// typescript
import { authenticate } from './AuthController';
app.get('', authenticate(), async (req: Request, res: Response) => {
	// handle request here...
});
```

**With authenticate to role middleware**

```typescript
// typescript
import { authenticate } from './AuthController';
import { UserRoles } from '../Enums';

app.get('', authenticate(UserRoles.Default), async (req: Request, res: Response) => {
	// handle request here...
});
```

## Database

### TypeORM

https://typeorm.io/#/

### PostgreSQL

## Deployment

### Docker

### Kubernetes

## Test

### Jest

## Source Architecture

```bash
Index.ts        # application entry
Controllers/    # route handler's
    Index.ts        # route bundler
DTOs/           # data transfer objects
    Index.ts        # dto bundler
Enums/          # just enums
    Index.ts        # enum bundler
Models/         # entities for db
    Index.ts        # model bundler
Services/       # db requests handler's
    Index.ts        # service bundler
Test/           # for service testing
```

## Environment Variables

**Server Configurations**

-   `SERVER_PORT`

**Json Web Token Configurations**

-   `JWT_SECRET`

**Bcrypt Configurations**

-   `BCRYPT_SALT`

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
