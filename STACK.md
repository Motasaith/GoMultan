# GoMultan: Technology Stack Proposal

**Prepared for:** CEO approval
**Date:** 13 September 2026
**Status:** Design preview ready, stack awaiting approval

---

## 1. Summary

GoMultan will be an online store for clothing, footwear and home decor from Multan, built on a modern and low-cost cloud setup.

- **Launch cost:** about **$10 a month** (≈ Rs 2,800), plus payment gateway fees on each order.
- **Launch capacity:** about **20,000–50,000 visitors a day**.
- **Growth:** every service can be upgraded without rebuilding the site.
- **Payments:** local cards, JazzCash, Easypaisa and cash on delivery.
- **Hosting:** Cloudflare's global network, so pages load fast across Pakistan and abroad.

The design preview is already built and can be deployed for review today (see section 9).

---

## 2. The Approved-For-Review Stack

| Area | Service | What it does for us | Free allowance | When we start paying |
|---|---|---|---|---|
| **Website** | Next.js 16 | The store itself: pages, cart, checkout | Free (open source) | Never |
| **Hosting** | Cloudflare Workers | Runs the site worldwide | 100,000 requests a day | **$5/month from launch** (recommended) |
| **Database** | Aiven PostgreSQL | Products, orders, stock, customers | 1 GB, but switches off when idle | **$5/month from launch** (Developer plan, up to 8 GB, always on) |
| **Customer accounts** | Clerk | Sign-up, login, Google sign-in | 50,000 users a month | $25/month (Pro), only at large scale |
| **Emails** | Resend | Order confirmations, shipping updates | 3,000 a month, 100 a day | $20/month (50,000 emails) at ~50+ orders a day |
| **Image storage** | Cloudflare R2 | Product photos, banners | 10 GB, free downloads | $0.015 per extra GB |
| **Image resizing** | Cloudflare Images | Serves smaller, faster photos to phones | 5,000 unique resizes a month | $0.50 per 1,000 |
| **Payments** | Safepay or PayFast | Cards, JazzCash, Easypaisa | No monthly fee | Per order: ~1.5–3% wallets, ~2.5–3.5% cards |
| **Cash on delivery** | Built into our checkout | Most Pakistani shoppers prefer COD | Free | Courier's COD charges |
| **Speed and protection** | Upstash Redis | Stops abuse, holds stock during checkout | 500,000 operations a month | $0.20 per 100,000 |
| **Error alerts** | Sentry | Tells us when something breaks | 5,000 errors a month | Paid plans only at scale |
| **Visitor analytics** | Cloudflare Web Analytics | Traffic, top pages, devices | Free | Never |
| **Courier** | TCS, Leopards or PostEx | Booking and tracking shipments | Business account | Per shipment |

**Total services to sign up for:** Cloudflare, Aiven, Clerk, Resend, Upstash, Sentry, one payment gateway and one courier.

---

## 3. What We Changed From the Original List, and Why

| Originally proposed | Decision | Reason |
|---|---|---|
| **Lemon Squeezy** (payments) | ❌ Replaced with **Safepay / PayFast** | Lemon Squeezy is for digital products like software and eBooks. It does not normally approve stores selling physical goods, so our store could be suspended. Local gateways also support JazzCash and Easypaisa. |
| **Cloudflare Pages** | 🔄 Changed to **Cloudflare Workers** | Cloudflare now recommends Workers for Next.js sites. Same company, same price. |
| **Backblaze B2 + UploadThing** | 🔄 Replaced with **Cloudflare R2** | Both do the same job, so we only need one. R2 is on the same Cloudflare account as our hosting, has 10 GB free and charges nothing for downloads. |
| **Aiven free database** | 🔄 Upgraded to **Aiven Developer ($5)** | The free database switches itself off when idle, which would take the store offline. |
| **Clerk, Resend** | ✅ Kept | Generous free allowances and good fit. |

---

## 4. How Many Visitors It Can Handle

These are planning estimates, not load-test results. We will load-test before launch.

| Setup | Visitors per day | People browsing at the same moment |
|---|---|---|
| Everything on free plans | ~4,000–6,000 | ~100–300 |
| **Launch setup ($10/month)** | **~20,000–50,000** | ~500–1,000 |
| Growth setup (section 5) | 100,000+ | Several thousand |

**How we got these numbers:** a typical visitor views about 5 pages, which is roughly 15–25 requests to the server. Product pages are pre-built and cached, so browsing barely touches the database. The database is the first thing to slow down during very busy checkout periods, such as an Eid sale.

---

## 5. Monthly Cost as We Grow

| Stage | Traffic | Monthly cost | What changes |
|---|---|---|---|
| **Launch** | Up to ~50,000 visitors a day | **~$10** (≈ Rs 2,800) | Workers $5 + database $5 |
| **Growing** | ~50,000 visitors a day, hundreds of orders | **~$35–60** (≈ Rs 10,000–17,000) | Add Resend Pro ($20), some extra usage |
| **Large** | 100,000+ visitors a day, thousands of orders | **~$150–400** (≈ Rs 42,000–112,000) | Clerk Pro, a bigger database with a standby copy, higher email plan |

**One-time and yearly costs:** domain name about $10–15 a year.

**Biggest cost is payment fees, not hosting.** Example: Rs 5,00,000 a month in card sales at about 2.5% is around Rs 12,500 in fees. Cash-on-delivery orders avoid gateway fees but carry courier COD charges.

*Rupee amounts use an approximate rate of Rs 280 per US dollar. Prices checked September 2026 and may change.*

---

## 6. Risks and How We Handle Them

| Risk | Impact | Plan |
|---|---|---|
| Payment gateway approval takes time | Can't take card payments at launch | Launch with cash on delivery first, add cards when the merchant account is approved |
| Free email limit (100 a day) | Order emails stop on busy days | Upgrade to Resend Pro ($20) once we pass ~50 orders a day |
| Traffic spike during a sale | Slower checkout | Pre-built pages, stock holds in Redis, database upgrade ready in minutes |
| A service raises prices | Higher monthly bill | Each service can be swapped without redesigning the store |
| Build tools on Windows | Occasional local build problems | Deploy automatically from GitHub, which builds on Linux |

---

## 7. Rollout Plan

| Phase | What gets built | Outcome |
|---|---|---|
| **1. Design approval** (now) | Storefront design, deployed as a preview link | CEO signs off on the look |
| **2. Core store** | Database, product admin, customer accounts, cart, COD checkout, order emails | Store can take real orders |
| **3. Payments and delivery** | Card and wallet payments, courier booking and tracking | Full online payments |
| **4. Launch prep** | Real photos, SEO, analytics, error alerts, load testing | Public launch |

---

## 8. Decisions Needed From the CEO

1. **Approve the design** shown in the preview link.
2. **Approve the stack** in section 2 and the launch budget of about **$10 a month**.
3. **Choose the payment gateway:** Safepay or PayFast. Both need company documents for a merchant account.
4. **Choose the courier partner:** TCS, Leopards or PostEx.
5. **Confirm the domain name**, e.g. gomultan.pk or gomultan.com.

---

## 9. Viewing the Design Preview (for the tech team)

The project is already configured for Cloudflare Workers.

```bash
npm install
npx wrangler login          # one time: log in to the company Cloudflare account
npm run deploy              # builds and publishes the site
```

After deploying, the site is live at `https://gomultan.<your-account>.workers.dev`.

Other commands:

| Command | Purpose |
|---|---|
| `npm run dev -- -p 3100` | Local development at http://localhost:3100 |
| `npm run preview` | Test the Cloudflare version locally before deploying |

**Note:** product photos in the preview are placeholders. They will be replaced with real product photography before launch.

---

## Sources

- Lemon Squeezy prohibited products: https://docs.lemonsqueezy.com/help/getting-started/prohibited-products
- Next.js on Cloudflare Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- OpenNext Cloudflare adapter: https://opennext.js.org/cloudflare
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Images pricing: https://developers.cloudflare.com/images/pricing
- Cloudflare R2 free tier: https://freetier.co/directory/products/cloudflare-r2
- Clerk pricing: https://clerk.com/articles/clerk-pricing-explained
- Resend pricing: https://flexprice.io/blog/detailed-resend-pricing-guide
- Aiven free tier: https://aiven.io/docs/products/postgresql/concepts/pg-free-tier
- Aiven Developer tier: https://aiven.io/blog/new-developer-tier-for-aiven-for-postgres
- Upstash Redis pricing: https://upstash.com/pricing/redis
- Sentry free plan: https://costbench.com/software/developer-tools/sentry/free-plan/
- Pakistan payment gateways: https://rapidgateway.pk/resources/best-payment-gateway-pakistan
