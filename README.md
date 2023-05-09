# Vertical Content Publisher

## Uses

- [React](https://reactjs.org)
- [Remix](https://remix.run)
- [TypeScript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org)
- [Prisma](https://www.prisma.io/)
- [CockroachDB](https://www.cockroachlabs.com)
- [Google Cloud Storage](https://cloud.google.com/storage)
- [Google Cloud Pub / Sub](https://cloud.google.com/pubsub)
- [Google Cloud Functions](https://cloud.google.com/functions)

## Generate Prisma Client

Generate Prisma client

```
npx prisma generate
```

Migrate dev

```
npx prisma migrate --dev

```

## Deploy Remix App via Netlify CLI

### Deploy Preview

From root directory run:

```
netlify deploy --build

```

### Deploy to Production

From root directory run:

```
 netlify deploy --build --prod
```
