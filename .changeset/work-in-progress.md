---
default: patch
---

# Changes

- Comprehensive redesign of the sidebar to give Sable a more distinct visual identity apart from Cinny.

# New

- Add a `shield` variant to `SidebarStack` to delineate sections with a pill-shaped background.
- Add a `livePointerTracker` utility that directly executes subscriber callbacks with cursor position data on every frame, to be used for states-independent animations.
- Add a `BackgroundGlow` component for animated background glows driven by `livePointerTracker`.
- Add a `ghost` variant to `SidebarAvatar` that makes the background transparent by default but shows it on hover (used for Explore and Create buttons).
- Add an `ActiveIndicator` component that renders a glowing bar on the left edge of the sidebar, smoothly tracking the active `SidebarItem` via a React context-based pub/sub pattern. Transient items (Search, Create, AccountSwitcher) opt out via `noIndicator`.

# Fixes

- Hide empty SidebarStack elements to prevent them from shifting the layout.
- Refactor the sidebar component structure to improve separation of concerns and ownership.
