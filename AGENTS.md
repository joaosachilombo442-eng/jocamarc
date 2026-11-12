<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All page content (news, projects, portfolio, cooperatives, partners) is read through `src/content/api.ts` query functions + `queryOptions`; pages never hard-code it. Why: the future admin panel (Lovable Cloud) replaces only those function bodies.
- Unconfirmed institutional fields are `null` in `src/config/site.ts` / `src/content/institutional.ts` and render as "A confirmar" / `PendingContent` slots. Why: the client forbids invented data.
- Sample items carry `isDemo: true` and show `DemoBadge`/`DemoNotice`. Why: keeps demo content visibly distinct from official publications.
- Brand colours live as tokens in `src/styles.css` (primary/accent/brand-blue/brand-red/brand-yellow/ink); components use only those tokens. Why: one place to keep the logo palette consistent.
- Every photograph comes from `src/content/media.ts` (CDN pointers of originals supplied by the association); demo items carry no photo and render `MediaPlaceholder`. Why: generated/stock imagery is forbidden and real photos must never illustrate invented events.
- Confirmed contacts, community links (WhatsApp group, Facebook), locations and fiscal data live only in `src/config/site.ts` and are rendered via `CommunityButtons`/`PhoneLinks`; tests pin the exact values. Why: one source for the client-supplied data, so links are never retyped or altered.
- Area-of-work cards (`ActivityCards`) may show an original photo of that kind of work; example projects/news never get a photo. Why: real photos may illustrate real work, never invented events.
