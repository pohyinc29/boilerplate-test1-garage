# Login and team — edge-case test script

Manual run-through for invalid login, unauthenticated access to `/team`, missing-photo placeholders, and long blurbs.

## Prerequisites
- Dev server running (`pnpm run dev` from the repo root)
- Browser with no `__session` cookie (use a private window, or sign out first)
- For invalid login: a well-formed email that is **not** a valid account, or a valid email with a wrong password
- For placeholders / long blurbs: a signed-in session so `/team` can be viewed (same as the happy-flow script)

## Edge cases (what “pass” means)

1. **Invalid login** — wrong credentials do not grant access; user stays on `/auth/signin` and sees an error.
2. **Unauthenticated `/team`** — visiting `/team` without a login redirects to the sign-in page (must not show team content).
3. **Missing-photo placeholders** — when a member has no photo, a suitable placeholder (initials avatar) is shown.
4. **Long blurbs** — long member text wraps inside the card and does not overflow or break the layout.

## Run-through (browser)

### A. Invalid login

1. Go to `http://localhost:3000/auth/signin`.
2. Confirm you see **Sign in**, **Email address**, **Password**, and the **Sign in** button.
3. Client validation:
   - Leave password empty and submit (or use an invalid email such as `not-an-email`).
   - Expect inline errors: **Password is required** and/or **Please enter a valid email address**.
   - URL stays `/auth/signin`.
4. Auth failure:
   - Enter a valid-format email and a password that is not the account’s password (e.g. `wrong@example.com` / `wrongpassword`).
   - Click **Sign in**.
   - Expect error toast **Invalid email or password**.
   - URL stays `/auth/signin` (no redirect to `/team`).
5. Confirm the team page is not shown.

### B. Redirect to team page without a login

1. Use a private window, or confirm you are signed out.
2. Go to `http://localhost:3000/team` (type the URL or open it in a new tab).
3. Expect redirect to `/auth/signin` (query may include `redirect=/team`).
4. Confirm:
   - You do **not** see **Team A**, team member cards, or the shared-contribution section.
   - You **do** see the sign-in form.

### C. Missing-photo placeholders and long blurbs

1. Sign in with a valid verified account (same steps as `flow.script.md`).
2. Confirm URL is `/team`.
3. Missing-photo placeholders:
   - Each member card shows a circular avatar.
   - When no photo is available, initials are shown (`JK`, `MA`, `JS`, `PC`) instead of a broken image.
   - Name, role, and blurb are still visible next to the placeholder.
4. Long blurbs:
   - Read each member blurb (and names) inside the cards.
   - Text wraps (`break-words`); cards stay aligned in the grid.
   - No horizontal overflow, overlapping text, or clipped content that hides the role or blurb.
5. Optional stretch: if a member blurb is later lengthened in `team/page.tsx`, re-run this section and confirm the card still contains the text without breaking the layout.

## Pass / fail

| Case | Pass if |
|------|---------|
| Invalid login (validation) | Inline field errors; stay on `/auth/signin` |
| Invalid login (credentials) | Toast **Invalid email or password**; stay on `/auth/signin` |
| No login → `/team` | Redirect to `/auth/signin`; no team content |
| Missing photo | Initials placeholder on every member without a photo |
| Long blurbs | Text wraps; layout does not overflow |
