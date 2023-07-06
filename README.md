# verticalshorts.app

Single source of truth for posting vertical video content and publishing to all social media channels.

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
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Build](https://cloud.google.com/build)
- [Google Cloud Video Intelligence](https://cloud.google.com/video-intelligence)
- [Stripe Subscriptions](https://stripe.com/docs/api/subscriptions)

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
