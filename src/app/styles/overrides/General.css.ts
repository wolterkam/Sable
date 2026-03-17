import { globalStyle } from '@vanilla-extract/css';

globalStyle(
  `
    button, 
    [role="button"], 
    [class*="Button"], 
    [class*="Chip"], 
    [class*="MenuItem"]
`,
  {
    transition: 'transform 0.1s ease-in-out, background-color 0.15s ease !important',
  }
);

globalStyle(
  `
    button:active, 
    [role="button"]:active, 
    [class*="Button"]:active, 
    [class*="Chip"]:active, 
    [class*="MenuItem"]:active
`,
  {
    transform: 'scale(0.96) !important',
  }
);

globalStyle(
  `
    button:hover:not(div[class*='SidebarItem_SidebarItem'] button), 
    [role="button"]:hover:not(div[class*='SidebarItem_SidebarItem'] [role="button"])
`,
  {
    transform: 'translateY(-1px)',
  }
);

// :not here is a temporary way to sidestep this global imitation without affecting everything else.
globalStyle(
  `
    button[class*="_1684mq51"]:has(img):hover:not(div[class*='SidebarItem_SidebarItem'] button),
    [data-index] [class*="_1r9nvaso"]:hover:not(div[class*='SidebarItem_SidebarItem'] [class*="_1r9nvaso"]),
    [data-index] [class*="_1r9nvaso"] *:hover:not(div[class*='SidebarItem_SidebarItem'] [class*="_1r9nvaso"] *),
    [data-index] button:has(p):hover:not(div[class*='SidebarItem_SidebarItem'] button)
`,
  {
    transform: 'none !important',
  }
);
