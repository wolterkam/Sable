# Sidebar Redesign Review

## Bugs (will break)

1. **`@media` nested inside `selectors` is invalid in vanilla-extract** — `SidebarAvatar.css.ts:13-20`
   The `prefers-reduced-motion` media query inside the `'button&:hover'` selector is silently ignored. Vanilla-extract doesn't support `@media` nested inside `selectors`. The hover scale runs even with reduced motion enabled.
   **Fix:** Move to a top-level `@media` block or use a separate style with the media query.

2. **`livePointerTracker.ts` — unconditional global listener + SSR-unsafe** — lines 15-16
   `window.addEventListener('pointermove', ...)` runs at import time, fires on every mouse move even with zero subscribers, and crashes in SSR/Node. Should lazily attach when first subscriber registers and detach when last unsubscribes.

## Fragile (will break on refactor)

3. **`ActiveIndicator.tsx:17-18` — DOM query by partial class name**
   `querySelectorAll('[class*="Scroll"], [class*="SidebarScrollArea"]')` matches vanilla-extract hashed class names by substring. Will break silently if the class name or hash strategy changes. Use a `data-*` attribute or pass a ref instead.

4. **`General.css.ts:31-32, 42-45` — `:not()` with hashed class fragments**
   `:not(div[class*='SidebarItem_SidebarItem'])` relies on vanilla-extract's naming convention which isn't guaranteed stable. Same fix: use a `data-sidebar-item` attribute and `:not([data-sidebar-item])`.

## Should fix

5. **`SidebarNav.tsx:41-48` — heavy inline style overrides**
   The `SidebarStack` at the scrollable slot gets 6 inline style overrides (`flex`, `minHeight`, `padding`, `justifyContent`, `alignItems`, `overflow`). This suggests the component's variant API doesn't cover this layout case yet. Extract a `scrollable` variant or a dedicated `SidebarScrollableStack`.

6. **`SidebarAvatar.css.ts:42-46` — dead `outlined` variant**
   All consumers were migrated to `fill`/`ghost`/`active` but the `outlined` variant definition is still present. Remove it.

7. **`sidebar-reduced-motion-checklist.md` — dev artifact in tree**
   This looks like personal WIP notes. Shouldn't be committed to the branch. Remove before PR.

8. **`.changeset/work-in-progress.md` — non-standard format**
   Changesets expects a one-liner summary, not a detailed changelog. This may confuse the release tooling.

## Nits

9. `SidebarNav.tsx:30-35, 63-70` — unnecessary `<>...</>` fragments wrapping single children.
10. `CreateTab.tsx` — trailing whitespace on empty line between props (line with just spaces).
