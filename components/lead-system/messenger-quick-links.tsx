"use client";

type MessengerChannel = "telegram" | "viber";

type MessengerLink = {
  channel: MessengerChannel;
  label: string;
  href: string;
};

type MessengerQuickLinksProps = {
  sourceCtaPrefix?: string;
  layout?: "compact" | "mobile";
  className?: string;
};

const messengerLinks: MessengerLink[] = [
  {
    channel: "telegram",
    label: "Telegram",
    href: "https://t.me/TimberXAssistantBot?start=header_telegram",
  },
  {
    channel: "viber",
    label: "Viber",
    href: "viber://chat?number=%2B380674121310",
  },
];

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.4 4.4a1 1 0 0 0-1-.1L3.3 11.2a1 1 0 0 0 .1 1.9l4.3 1.4 1.6 4.8a1 1 0 0 0 1.8.3l2.4-3.1 4.2 3.1a1 1 0 0 0 1.6-.6l2.4-13.6a1 1 0 0 0-.3-1zM9.6 14.1l7.8-6.1-6.5 7.4-.3 1.9-1-3.2z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 4 4.1 4 8.8v4.5c0 2.2 1.3 3.8 3.6 4.3v2.6a1 1 0 0 0 1.6.8l3.2-2.4H12c5.5 0 8-2.1 8-6.8V8.8C20 4.1 17.5 2 12 2zm4.4 9.7a.8.8 0 0 1-1.1.3l-1.1-.6c-.4-.2-.9-.2-1.2.2l-.5.5c-.4.4-1.1.5-1.6.2-1-.6-2-1.6-2.6-2.7-.3-.5-.2-1.2.2-1.6l.5-.5c.3-.3.4-.8.2-1.2l-.6-1.1a.8.8 0 0 1 .3-1.1l.5-.3c.4-.2.8-.2 1.1.1l.7.7c.3.3.4.8.3 1.2l-.1.5c0 .2 0 .3.1.5.4.7 1 1.3 1.7 1.7.1.1.3.1.5.1l.5-.1c.4-.1.9 0 1.2.3l.7.7c.3.3.4.7.1 1.1l-.3.5z" />
    </svg>
  );
}

function trackMessengerClick(link: MessengerLink, sourceCtaPrefix: string) {
  const payload = {
    eventType: "messenger_click",
    channel: link.channel,
    sourcePage: window.location.pathname,
    sourceCta: `${sourceCtaPrefix}_${link.channel}`,
    referrer: document.referrer || null,
    landingPage: window.location.href,
    metadata: {
      label: link.label,
      placement: sourceCtaPrefix,
    },
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/lead-events",
      new Blob([body], { type: "application/json" }),
    );
    return;
  }

  fetch("/api/lead-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Messenger navigation must remain available even if tracking fails.
  });
}

export function MessengerQuickLinks({
  sourceCtaPrefix = "header",
  layout = "compact",
  className = "",
}: MessengerQuickLinksProps) {
  const isMobile = layout === "mobile";

  return (
    <div
      className={`items-center ${isMobile ? "grid grid-cols-2 gap-3" : "gap-2"} ${className}`}
      aria-label="Швидкий зв'язок у месенджерах"
    >
      {messengerLinks.map((link) => (
        <a
          key={link.channel}
          href={link.href}
          target={link.channel === "telegram" ? "_blank" : undefined}
          rel={link.channel === "telegram" ? "noreferrer" : undefined}
          aria-label={`Написати в ${link.label}`}
          title={link.label}
          onClick={() => trackMessengerClick(link, sourceCtaPrefix)}
          className={
            isMobile
              ? "inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] px-4 text-sm font-semibold text-[#f4dfcf] transition hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-[#1B1D1F]"
              : "inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] text-[#f4dfcf] shadow-[0_16px_32px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-[#1B1D1F]"
          }
        >
          {link.channel === "telegram" ? <TelegramIcon /> : <ViberIcon />}
          {isMobile ? <span>{link.label}</span> : null}
        </a>
      ))}
    </div>
  );
}
