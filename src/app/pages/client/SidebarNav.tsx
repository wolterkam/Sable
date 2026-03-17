import { useRef } from 'react';
import { color, Scroll } from 'folds';

import { Sidebar, SidebarContent, SidebarStackSeparator, SidebarStack, ActiveIndicator, ActiveIndicatorProvider } from '$components/sidebar';
import { BackgroundGlow } from '$components/BackgroundGlow';
import {
  DirectTab,
  DirectDMsList,
  HomeTab,
  SpaceTabs,
  InboxTab,
  ExploreTab,
  UnverifiedTab,
  SearchTab,
  AccountSwitcherTab,
} from './sidebar';
import { CreateTab } from './sidebar/CreateTab';

export function SidebarNav() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ActiveIndicatorProvider>
    <Sidebar>
      <BackgroundGlow color={color.Surface.Container} style={{ position: 'absolute', inset: 0 }} />
      <ActiveIndicator />
      <SidebarContent
        topSticky={
          <>
            <SidebarStack shield>
              <HomeTab />
              <DirectTab />
            </SidebarStack>
          </>
        }
        scrollable={
          <Scroll ref={scrollRef} variant="Background" size="0" style={{ display: 'flex', flexDirection: 'column' }}>
            <SidebarStack shield fill="Background" style={{ flex: 1, justifyContent: 'flex-start' }}>
              <DirectDMsList />
              <SpaceTabs scrollRef={scrollRef} />
              <div style={{ flexGrow: 1 }} />
              <SidebarStackSeparator />
              <ExploreTab />
              <CreateTab />
            </SidebarStack>
          </Scroll>
        }
        bottomSticky={
          <>
            <SidebarStack shield>
              <SearchTab />
              <UnverifiedTab />
              <InboxTab />
              <AccountSwitcherTab />
            </SidebarStack>
          </>
        }
      />
    </Sidebar>
    </ActiveIndicatorProvider>
  );
}
