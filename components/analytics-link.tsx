"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type AnalyticsLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
};

export function AnalyticsLink({
  eventName,
  eventParams,
  onClick,
  children,
  ...props
}: AnalyticsLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackAnalyticsEvent(eventName, eventParams);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
