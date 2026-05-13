## Question 1 (Server vs Client Components)

In the sportsbook application I used the basic Next.js rule — if a component needs interactivity or client-side
behavior, it becomes a client component.
I have two pages: the lobby and the sport events page. The lobby consists entirely of server components as there is no
interactivity — it only fetches the sports list and links to the sport events page. The sport events page starts as a
server component which fetches the initial events for a given sport, then passes that data as a prop to a client
SportEvents component. SportEvents uses the server-fetched data as initialData for TanStack Query, which then takes over
and provides polling for live odds updates. I also have two feature-level client components — BetSlip and
ResponsibleGamblingBanner. Both require client-side behavior: BetSlip subscribes to the Zustand store, manages form
state, and contains complex calculations memoized with useMemo and useCallback to prevent unnecessary re-renders.
ResponsibleGamblingBanner uses useEffect to read from sessionStorage and manages a live session timer.

SEO support for pre-match pages can be implemented by combining generateStaticParams and Incremental Static
Regeneration (ISR). With generateStaticParams, Next.js pre-renders dynamic route segments at build time, and with ISR it
keeps those pages fresh by regenerating them in the background using the revalidate export.

ISR works in this order:

User visits the page after revalidate seconds have passed ->
They immediately get the old cached version — no waiting ->
Next.js triggers a background regeneration ->
The next visitor gets the freshly built version:

## Question 2 (State Management Boundaries)

TanStack Query owns all server-derived data — the sports list fetched in the lobby page, and the events with live odds
fetched in the sport events page. The sport page fetches data server-side and passes it as initialData to useQuery,
which immediately hydrates the cache without a loading flash. From there, useQuery takes over with a refetchInterval
that polls every 2 seconds, but only when at least one live event is present — avoiding unnecessary network traffic for
pages with only upcoming events.

Zustand owns pure client interaction state — the bet slip. The betSlipStore holds the selections array and exposes
addSelection, removeSelection, clearSlip, hasSelection, and updateOdds. None of this data exists on any server; it is
entirely a product of what the user has clicked during their session.

The clearest sign the boundary is correct: EventRowWrapper reads selectedIds from Zustand via useShallow and reads
event and odds data from TanStack Query's cache via props. The two stores never touch each other.

Blurring this boundary creates a concrete problem with odds synchronization. When live odds update via polling, TanStack
Query refreshes the event data. If selections in the bet slip were also stored in TanStack Query — or if the bet slip
tried to derive odds directly from the query cache — every odds tick would force a re-evaluation of the entire bet slip:
recalculating potential returns, re-validating the stake, and potentially re-rendering the form. Instead, the bet slip
holds a snapshot of odds at the time of selection. The updateOdds action exists precisely to push changes in
selectively when needed, keeping the two domains deliberately decoupled.

## Question 3 (Performance Under Load)

Above all I would start with diagnosis before any optimization. With React DevTools Profiler we can record a session
while odds are updating and monitor unnecessary re-renders. The Profiler shows render counts, render duration, and the
reason for each re-render — prop, state, or context changes.
With 50 matches and 3 markets each, updating every 1-2 seconds, the most likely issue is unnecessary re-renders. If the
entire event list re-renders on every poll, that's 150+ components updating at the same time. This is where memoization
helps — preventing re-renders for components whose props haven't changed.
EventRowWrapper wrapped in memo ensures it only re-renders when its specific event data changes. OddsButton has a custom
memo comparator that checks id, odds, suspended, and selected — so a single odds change only re-renders the affected
button, not the entire market or event.
Polling causing a cascade is another concern — TanStack Query's refetchInterval replaces the entire query result on
every poll. If the reference changes, everything subscribed re-renders. The fix is structuralSharing (enabled by default
in TanStack Query) which does a deep comparison and only updates references that actually changed.
With 50 events, markets and odds buttons the DOM becomes very large. Virtualization with @tanstack/react-virtual solves
this by rendering only the events currently visible in the viewport, keeping the DOM size small regardless of how many
events exist.
For Zustand, each component should subscribe only to the specific slice it needs rather than the entire store. Using
useShallow ensures a component only re-renders when its specific selected values change, not when unrelated parts of the
store update.

## Question 4 (Testing Strategy)

In a sportsbook application testing plays a critical role as everything changes very fast — odds, games, events. Besides
server-side transaction validation, it is very important to have well-tested frontend features. Tests prevent unexpected
bugs during intensive development and ensure feature stability. Reading test cases gives a clear insight into what
behaviour code units must have, and while writing tests you can find edge cases that are almost impossible to catch
while only writing features.
Isolated logic should be covered with unit tests — well-described inputs and outputs, what goes in and what comes out.
Unit testing is perfect for pure functions, validation schemas, store actions, and component behaviour based on props.
E2E tests own the user flow — what a real user is supposed to do while using a certain feature. E2E tests simulate a
real user clicking through the application, navigating pages, and filling forms. This is crucial when collecting
important information because besides server-side validation, which happens at the end of the flow, we should not allow
the user to collect incorrect information and only inform them about a failure at the very end — in that case users may
leave the application without hesitating. E2E tests catch integration failures that unit tests can't see.
Odds animation testing is important as in a sportsbook we display heavy UI and use animations to communicate information
to the user. With unit tests using fake timers we can verify that the correct class appears when odds change and
disappears after the expected duration.
In the bet slip specifically, unit tests cover the Zod stake schema boundary values, Zustand store actions, and
potential return calculations. E2E covers the full critical path — lobby → sport page → adding selections → entering
stake → placing bet → confirmation dialog → success toast → bet slip clears.

## Question 5 (Accessibility & Responsive Design)

Accessibility is an important aspect that gives almost every user the ability to use an application. The foundation is
semantic HTML — using the right elements for the right purpose, proper label associations, and logical focus management.
Accessibility can also positively impact SEO indexing. Using semantic HTML elements, meaningful aria labels, and proper
heading structure helps search engines better understand the content and index it correctly.

In a sportsbook the accessibility challenges are unique because the UI is dense, data-heavy, and updates in real time.
The bet slip container should have role="region" with aria-label="Bet Slip", each selection card as an article, and the
stake input properly associated with its label. The OddsButton uses aria-pressed to communicate selected state and
aria-label="Market suspended" when locked.

When implemented correctly, accessibility becomes a natural part of the development process rather than a separate
concern — benefiting all users, not just those using assistive technologies.

## Question 6 (CI/CD & Code Quality)

A proper CI/CD pipeline is about effectiveness and the ability to do repeatable, reliable deployments. The crucial role
of CI is catching bugs, inconsistencies, failing test cases, and TypeScript mismatches early.
Every PR triggers: TypeScript type check, ESLint, Prettier formatting check, Vitest unit tests, and a Next.js production
build. These run in parallel and complete fast. If any step fails the PR is blocked — fast feedback keeps the
development loop tight and manageable.
On merge to main, Playwright E2E tests run in addition to everything above. E2E tests are intentionally kept off the PR
pipeline because they are slower and would frustrate developers if they blocked every commit — this separation is the
core solution to keeping the pipeline fast without sacrificing regression coverage.
Additional speed comes from pnpm store caching between runs, parallelizing independent jobs, and keeping the E2E suite
focused — one well-written critical path test is more valuable than multiple poorly thought-out ones. During intensive
development a proper pipeline prevents junk code and potential bugs from reaching the codebase, and enforces consistency
across the project automatically.

