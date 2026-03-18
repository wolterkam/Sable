# Sidebar Reduced Motion Checklist

Goal: make sidebar motion respect `prefers-reduced-motion` in small, reviewable steps.

## Checklist

- [ ] Active indicator transition
  - File: `src/app/components/sidebar/SidebarItem/ActiveIndicator.css.ts`
  - Current behavior: animates `top` and `opacity`
  - Plan: disable transition when reduced motion is enabled

- [ ] Active indicator JS behavior
  - File: `src/app/components/sidebar/SidebarItem/ActiveIndicator.tsx`
  - Current behavior: updates on active change, scroll, resize, visibility
  - Plan: confirm reduced-motion mode does not reintroduce delayed movement

- [ ] Sidebar avatar hover scale
  - File: `src/app/components/sidebar/SidebarItem/SidebarAvatar.css.ts`
  - Current behavior: hover scales buttons up
  - Plan: remove hover transform when reduced motion is enabled

- [ ] Global button motion affecting sidebar
  - File: `src/app/styles/overrides/General.css.ts`
  - Current behavior: global button transition, active scale, hover lift
  - Plan: verify sidebar controls are either excluded or reduced-motion safe

## Notes

- Keep changes isolated and test one item at a time.
- Prefer CSS `@media (prefers-reduced-motion: reduce)` handling where possible.
- Avoid changing unrelated sidebar layout while doing this pass.
