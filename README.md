# Frontend Production Readiness Validation (Sandbox)

This repository implements a production-style frontend sandbox for:
- Environment-based API configuration
- Dashboard analytics integration
- Authentication-related flows (verification + password reset)
- Resilient UI states (loading / empty / error)
- Clean Git workflow (feature branch + PR)

---

##  Environment Configuration

### Required variables
Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
----------------------------------------------------------------
Written Questions

1. How do these flows behave differently in Development / Staging / Production?

Development:
Local APIs or mocked endpoints, fast iteration, verbose logging.

Staging:
Real backend, production-like configuration, used for QA and validation.

Production:
Secure cookies, HTTPS, monitoring, optimized builds, no debug logging.
-----------------------------------------------------------------------
2. What frontend mistakes commonly break CI/CD pipelines?

Missing or misconfigured environment variables

TypeScript or ESLint errors

Import path case-sensitivity issues

Relying on .env.local during build

Unhandled promise rejections or runtime errors
---------------------------------------------------------------------------
3. How do you protect frontend code from backend API changes?

Use typed API layers or shared contracts

Validate and guard API responses

Avoid assuming response structure

Version APIs when possible

Use feature flags and fallback UI states
---------------------------------------------------------------------------------
4. How should tokens be handled safely in frontend authentication flows?

Never log tokens

Prefer httpOnly cookies in production

Avoid storing tokens in localStorage

Use short-lived tokens

Clear tokens from memory after use

Always use HTTPS