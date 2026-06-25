# Codex Prompt: Create Kodu Architecture Docs with Mailgun as Current Email Provider

You are working inside the confirmed Kodu repository:

```txt
C:\Users\Trader\Desktop\Kodu Test Build\kodu-record
```

## Goal

Create the first three Kodu architecture documents correctly and completely:

```txt
docs/architecture/EMAIL_ARCHITECTURE.md
docs/architecture/EVENT_SYSTEM.md
docs/architecture/KODU_ARCHITECTURE.md
```

Also create this Mailgun-specific integration document:

```txt
docs/architecture/MAILGUN_INTEGRATION.md
```

## Important correction

Kodu no longer uses Postmark as the supported email provider.

The current provider is **Mailgun**.

Do not describe Postmark as supported, current, preferred, or planned.

You may mention that the provider abstraction allows future providers, but do not list Postmark.

## Required source documents to read first

Before writing anything, read:

```txt
KODU_PROJECT_CHARTER.md
AGENTS.md
README.md
docs/standards/MIGRATION_DISCIPLINE.md
docs/standards/SCHEMA_CONTRACT.md
```

Also inspect existing notification/email-related files before documenting:

```txt
lib/notifications/
lib/email/
app/api/email/
app/api/notifications/
supabase/migrations/
```

Do not invent architecture that conflicts with the repository.

If the docs describe a target architecture that is not fully implemented yet, clearly label it as:

```txt
Target architecture
```

If the docs describe current repo behavior, clearly label it as:

```txt
Current implementation
```

## Kodu product rules

All docs must stay aligned with Kodu:

* Kodu is a private homeowner property record platform.
* Kodu is not public records.
* Kodu is not generic cloud storage.
* Kodu is not a contractor CRM.
* Kodu is not a marketplace.
* Kodu email is a trust system, not a marketing system.
* The product model is:

  * Blueprint organizes the property
  * Vault stores the evidence
  * Timeline tells the story
  * Guidance explains what matters

## Document 1: EMAIL_ARCHITECTURE.md

Must cover:

1. Purpose
2. Current implementation
3. Target architecture
4. Notification event model
5. Email lanes/classes:

   * Required transactional
   * Property activity
   * Guidance
   * Marketing
6. Outbox pattern
7. Template system
8. Provider abstraction
9. Mailgun as current provider
10. Audit logging
11. Notification preferences
12. Sensitive data rules
13. Retry and failure handling
14. Provider webhook handling
15. What must not happen

Required provider language:

```txt
Kodu currently uses Mailgun for transactional email delivery.
Application code must not call Mailgun directly except inside the Mailgun provider adapter.
All business logic must route through Kodu's notification/event/outbox layer.
```

Forbidden:

* Do not call Postmark a supported provider.
* Do not include marketing content inside transactional email architecture.
* Do not document direct provider sends as the future pattern.
* Do not imply emails are optional when they are required account/security/billing notices.

## Document 2: EVENT_SYSTEM.md

Must cover:

1. Purpose
2. Current implementation
3. Target architecture
4. Event principles
5. Property events
6. Account events
7. Access events
8. Billing events
9. Transfer events
10. Notification events
11. Future AI event hooks
12. Event consumers:

    * Timeline
    * Email
    * Guidance
    * Audit
    * Home health rating later
    * Insurability profile later
13. Idempotency
14. Event naming conventions
15. What must not happen

Important:

Events should represent meaningful property/account/billing/access changes.

Do not create noisy events for tiny UI edits or background state changes.

## Document 3: KODU_ARCHITECTURE.md

Must cover:

1. Purpose
2. Product model
3. Overall application architecture
4. Folder conventions
5. Root `app/` versus `src/app/` note if both exist
6. Server/client boundaries
7. Supabase integration
8. Stripe integration
9. Mailgun/email integration
10. Cloudflare deployment
11. Privacy and access model
12. Documentation hierarchy
13. Architecture decision rules
14. What must not happen

Important:

Cloudflare should be described as deployment/DNS/edge infrastructure.

Do not move business logic into Cloudflare unless explicitly approved later.

## Document 4: MAILGUN_INTEGRATION.md

Must cover:

1. Purpose
2. Current role of Mailgun
3. Sending domain expectations
4. Required environment variables, names only, no values
5. Mailgun provider adapter responsibilities
6. Webhook responsibilities
7. Delivery, bounce, complaint, failure event handling
8. Suppression list handling
9. DNS/authentication expectations:

   * SPF
   * DKIM
   * DMARC
10. What application code is allowed to know about Mailgun
11. What application code must not do
12. Testing strategy
13. Future provider replacement strategy

Do not print secrets.

Do not call Mailgun APIs.

Do not modify `.env.local`.

## Files allowed to create or modify

Allowed:

```txt
docs/architecture/EMAIL_ARCHITECTURE.md
docs/architecture/EVENT_SYSTEM.md
docs/architecture/KODU_ARCHITECTURE.md
docs/architecture/MAILGUN_INTEGRATION.md
README.md
AGENTS.md
```

Only update `README.md` and `AGENTS.md` if needed to link the new architecture docs.

Not allowed:

* application code
* migrations
* package files
* environment files
* Supabase files
* Stripe files
* Cloudflare config
* existing unrelated docs unless needed for links

## Quality bar

The docs should be:

* specific to Kodu
* accurate to the current repo
* clear about current vs target state
* useful to future developers and AI agents
* calm and professional
* not generic SaaS documentation
* not marketing copy
* not overpromising features that are not built

## Required final report

After changes, report:

1. Files created
2. Files modified
3. Whether Postmark appears anywhere in the new docs
4. Whether Mailgun is documented as the current provider
5. Any current implementation gaps discovered
6. Any README or AGENTS links added
7. Confirmation that no application code, migrations, package files, or env files were changed

Do not proceed beyond documentation without approval.
