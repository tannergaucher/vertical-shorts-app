# Service Stripe

## Testing Stripe Webhooks Locally

### 1. Run Server

```bash
npm start

```

### 2. Listen for Webhooks Locally

```bash
stripe listen --forward-to localhost:8000/webhook

```

### 3. Trigger a Webhook Locally

```bash
stripe trigger checkout.session.completed

```

---

## Deploy locally from source code

```
gcloud run deploy service-stripe --source .

```
