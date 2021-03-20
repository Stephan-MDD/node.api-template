# Node API Template

## Database

### TypeORM

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
