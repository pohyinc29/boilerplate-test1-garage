# Login and team — edge-case results

Script: `frontend/tests/unit/scripts/edge.script.md`  
Outcome: **pass** — all required confirmations met.

## Prerequisites

| Check | Result |
|-------|--------|
| Dev server running (`pnpm run dev`) | Confirmed |
| Browser with no `__session` cookie (private window or signed out) | Confirmed |
| Invalid-login credentials available (wrong account or wrong password) | Confirmed |
| Signed-in session available for `/team` placeholder and blurb checks | Confirmed |

## Edge cases

| Case | Result |
|------|--------|
| Invalid login — stay on `/auth/signin` with an error | Passed |
| Unauthenticated `/team` — redirect to sign-in; no team content | Passed |
| Missing-photo placeholders — initials avatar when no photo | Passed |
| Long blurbs — text wraps; layout does not overflow | Passed |

## Run-through confirmations

### A. Invalid login

| Check | Result | Notes |
|-------|--------|--------|
| Open `/auth/signin` | Passed | `http://localhost:3000/auth/signin` |
| Sign-in page shows **Sign in**, **Email address**, **Password**, and the **Sign in** button | Passed | |
| Empty password / invalid email shows inline errors | Passed | **Password is required** and/or **Please enter a valid email address** |
| URL stays `/auth/signin` after validation errors | Passed | |
| Wrong credentials show toast **Invalid email or password** | Passed | |
| URL stays `/auth/signin` after auth failure (no redirect to `/team`) | Passed | Team page not shown |

### B. Redirect to team page without a login

| Check | Result | Notes |
|-------|--------|--------|
| Visit `/team` while signed out | Passed | Private window or signed out |
| Redirect to `/auth/signin` | Passed | Query may include `redirect=/team` |
| Team content is not shown | Passed | No **Team A**, member cards, or shared-contribution section |
| Sign-in form is shown | Passed | |

### C. Missing-photo placeholders and long blurbs

| Check | Result | Notes |
|-------|--------|--------|
| Sign in with a valid verified account | Passed | Same as `flow.script.md` |
| URL is `/team` | Passed | |
| Circular avatar on each member card | Passed | |
| Initials shown when no photo is available | Passed | `JK`, `MA`, `JS`, `PC`; no broken image |
| Name, role, and blurb visible next to placeholder | Passed | |
| Blurbs and names wrap inside cards | Passed | `break-words`; grid stays aligned |
| No overflow, overlap, or clipped role/blurb | Passed | |
