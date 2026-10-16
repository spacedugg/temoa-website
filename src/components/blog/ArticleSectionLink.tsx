"use client";

import type { ReactNode } from "react";

/** Keep in-page navigation independent of third-party link decoration. */
export function ArticleSectionLink({ id, className, children }: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const section = document.getElementById(id);
        if (!section) return;
        event.preventDefault();
        event.stopPropagation();
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(window.history.state, "", url);
        section.scrollIntoView({ block: "start" });
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
