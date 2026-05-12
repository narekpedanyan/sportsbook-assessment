## Question 1

In the sportsbook application I used the basic Next.js rule — if a component needs interactivity or client-side
behaviour, it becomes a client component.
I have two pages: the lobby and the sport events page. The lobby consists entirely of server components as there is no
interactivity — it only fetches the sports list and links to the sport events page. The sport events page starts as a
server component which fetches the initial events for a given sport, then passes that data as a prop to a client
SportEvents component. SportEvents uses the server-fetched data as initialData for TanStack Query, which then takes over
and provides polling for live odds updates. I also have two feature-level client components — BetSlip and
ResponsibleGamblingBanner. Both require client-side behaviour: BetSlip subscribes to the Zustand store, manages form
state, and contains complex calculations memoised with useMemo and useCallback to prevent unnecessary re-renders.
ResponsibleGamblingBanner uses useEffect to read from sessionStorage and manages a live session timer.

SEO support for pre-match pages can be implemented by combining generateStaticParams and Incremental Static
Regeneration (ISR). With generateStaticParams, Next.js pre-renders dynamic route segments at build time, and with ISR it
keeps those pages fresh by regenerating them in the background using the revalidate export.

ISR works in this order:

User visits the page after revalidate seconds have passed ->
They immediately get the old cached version — no waiting ->
Next.js triggers a background regeneration ->
The next visitor gets the freshly built version: