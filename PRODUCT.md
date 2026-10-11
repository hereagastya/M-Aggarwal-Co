# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Individuals, families, shop owners and small/growing businesses in and around Jaipur who need a chartered accountant for income tax, GST, registration, audit, advisory or payroll. Most arrive on a phone (search, WhatsApp-shared link, Google Maps), often anxious about a deadline or a notice, and want to know quickly whether this firm can help and how to reach a person.

## Product Purpose

Marketing site for M. Aggarwal & Co., Chartered Accountants (demo firm). Success is a visitor either booking the free 20-minute consultation or calling/WhatsApp-ing the office. Both actions carry equal weight (confirmed by user).

## Positioning

A founder-led Jaipur practice (since 2011) that treats financial advice as a conversation, not a lecture: patient, plain-language, deadline-reliable.

## Operating Context

Visitors read on mobile in short sessions, frequently on mid-range Android phones and patchy networks. Typical moments: ITR season, GST due dates, a scrutiny notice, starting a company.

## Capabilities and Constraints

- Pages: Home, Services, About, Contact. React 19 + Vite + Tailwind v4 + react-router.
- 4-step booking flow (service → date/time → details → confirmation); client-side only, no backend.
- Six services: Tax, GST, Business Registration, Audit & Assurance, Financial Advisory, Payroll.
- Mobile is the primary viewport; desktop and tablet must also be excellent.

## Brand Commitments

- Name: M. Aggarwal & Co., Chartered Accountants. Founder M. Aggarwal, FCA. Address 204 Residency Road, Jaipur. Phone +91 72985 12186. Email hello@maggarwalco.in.
- Voice: calm, warm, plain English, no jargon or hype.
- Previous visual identity (navy/teal + gold gradients) is discarded by user request.

## Evidence on Hand

- Photos in `src/assets/images/` (founder portrait, founder at office, office interior, two team members).
- The firm is a demo. The user asked that placeholder-looking details be replaced with realistic ones (e.g. firm registration number, credentials, testimonial attribution). Stats, testimonials, team and milestones are illustrative demo content, not verified facts.

## Product Principles

1. A worried visitor finds a human (call, WhatsApp, booking) within one thumb-reach on any page.
2. Plain language over credentials-speak; credentials appear as quiet reassurance, not shouting.
3. Calm is the feature: nothing on the page should add urgency or noise.
4. Every page works fully at 360px wide first.

## Accessibility & Inclusion

Readable body sizes on small phones (min 16px for running text), strong contrast for older clients, tap targets ≥ 44px, respects reduced motion.
