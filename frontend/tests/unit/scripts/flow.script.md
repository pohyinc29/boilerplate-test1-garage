# Login happy-flow — test script

Manual run-through for a valid login, redirect to `/team`, and required team content.

## Prerequisites
- Valid and verified account (Click create account if no aaccount is owned)

## Happy-flow (what “pass” means)

1. Open `/auth/signin`.
2. Enter a valid email and password.
3. Submit **Sign in**.
4. Auth succeeds (no error toast).
5. App redirects to `/team`.
6. Team page shows required content (heading, four members + roles, shared-contribution section).

## Run-through (browser)

1. From the repo root: `pnpm run dev`.
2. Go to `http://localhost:3000/auth/signin`.
3. Confirm you see **Sign in**, **Email address**, **Password**, and the **Sign in** button.
4. Enter a verified Firebase user’s email and password.
5. Click **Sign in**.
6. Expect success toast **Signed in successfully**.
7. URL becomes `/team`.
8. Confirm:
   - The team page must display the team name.
   - The team page must display each team members photo, name, role, and a short blurb.  
   - The team page must have a suitable placeholder when a team member's photo is unavailable. 
   - Successful login must continue to lead the user to the team page. 
   - The login page may be visually styled to match the overall design 