type IconName =
  | "projects"
  | "factory"
  | "globe"
  | "developers"
  | "contractor"
  | "community"
  | "shield"
  | "blueprint"
  | "settings"
  | "request"
  | "calculator"
  | "delivery"
  | "beam";

type MockupName =
  | "module"
  | "beam"
  | "truss"
  | "frame"
  | "sanitary"
  | "facade"
  | "residential"
  | "commercial"
  | "social";

function SvgFrame({
  children,
  className = "",
  viewBox = "0 0 64 64",
  strokeWidth = "1.15",
}: {
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function LineIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  switch (name) {
    case "projects":
      return (
        <SvgFrame className={className}>
          <path d="M10 50h44" />
          <path d="M15 50V24l17-10 17 10v26" />
          <path d="M24 50V37h16v13" />
          <path d="M22 28h20" />
        </SvgFrame>
      );
    case "factory":
      return (
        <SvgFrame className={className}>
          <path d="M8 50h48" />
          <path d="M14 50V22l14 8V20l14 8V14h8v36" />
          <path d="M19 50V37" />
          <path d="M28 50V41" />
          <path d="M42 50V36" />
        </SvgFrame>
      );
    case "globe":
      return (
        <SvgFrame className={className}>
          <circle cx="32" cy="32" r="22" />
          <path d="M10 32h44" />
          <path d="M32 10c7 7 10 14 10 22s-3 15-10 22" />
          <path d="M32 10c-7 7-10 14-10 22s3 15 10 22" />
        </SvgFrame>
      );
    case "developers":
      return (
        <SvgFrame className={className}>
          <circle cx="24" cy="24" r="7" />
          <circle cx="42" cy="28" r="5" />
          <path d="M12 50c1-8 7-13 14-13s13 5 14 13" />
          <path d="M39 49c1-5 5-9 10-10" />
        </SvgFrame>
      );
    case "contractor":
      return (
        <SvgFrame className={className}>
          <circle cx="22" cy="22" r="6" />
          <path d="M12 48c1-8 7-13 14-13" />
          <path d="M37 18l11 6-5 9-11-6z" />
          <path d="M32 34l8 14" />
        </SvgFrame>
      );
    case "community":
      return (
        <SvgFrame className={className}>
          <path d="M12 49h40" />
          <path d="M18 49V28l14-8 14 8v21" />
          <path d="M24 20v-6h16v6" />
          <path d="M26 49V36h12v13" />
        </SvgFrame>
      );
    case "shield":
      return (
        <SvgFrame className={className}>
          <path d="M32 10l16 7v11c0 12-6 19-16 26-10-7-16-14-16-26V17l16-7z" />
          <path d="M24 33l5 5 11-13" />
        </SvgFrame>
      );
    case "blueprint":
      return (
        <SvgFrame className={className}>
          <path d="M14 12h36v40H14z" />
          <path d="M22 20h20" />
          <path d="M22 28h14" />
          <path d="M22 36h20" />
          <path d="M22 44h10" />
          <path d="M46 16v32" />
        </SvgFrame>
      );
    case "settings":
      return (
        <SvgFrame className={className}>
          <circle cx="32" cy="32" r="7" />
          <path d="M32 13v8" />
          <path d="M32 43v8" />
          <path d="M13 32h8" />
          <path d="M43 32h8" />
          <path d="M18.5 18.5l5.6 5.6" />
          <path d="M39.9 39.9l5.6 5.6" />
          <path d="M18.5 45.5l5.6-5.6" />
          <path d="M39.9 24.1l5.6-5.6" />
        </SvgFrame>
      );
    case "request":
      return (
        <SvgFrame className={className}>
          <path d="M18 12h28v40H18z" />
          <path d="M24 20h16" />
          <path d="M24 28h16" />
          <path d="M24 36h12" />
          <path d="M24 44h8" />
        </SvgFrame>
      );
    case "calculator":
      return (
        <SvgFrame className={className}>
          <rect x="18" y="10" width="28" height="44" rx="4" />
          <path d="M24 18h16" />
          <path d="M24 29h.01" />
          <path d="M32 29h.01" />
          <path d="M40 29h.01" />
          <path d="M24 38h.01" />
          <path d="M32 38h.01" />
          <path d="M40 38h.01" />
          <path d="M24 47h.01" />
          <path d="M32 47h8" />
        </SvgFrame>
      );
    case "delivery":
      return (
        <SvgFrame className={className}>
          <path d="M10 18h24v20H10z" />
          <path d="M34 24h10l8 8v6H34z" />
          <circle cx="20" cy="42" r="4" />
          <circle cx="42" cy="42" r="4" />
        </SvgFrame>
      );
    case "beam":
      return (
        <SvgFrame className={className}>
          <path d="M12 24h40v16H12z" />
          <path d="M18 24v16" />
          <path d="M28 24v16" />
          <path d="M38 24v16" />
          <path d="M48 24v16" />
        </SvgFrame>
      );
    default:
      return null;
  }
}

function MockupShell({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "product";
}) {
  const isProduct = variant === "product";

  return (
    <div
      className={`relative overflow-hidden rounded border ${
        isProduct
          ? "border-white/8 bg-[#222427]"
          : "border-white/10 bg-[#202325]"
      } ${className}`}
    >
      {isProduct ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]" />
          <div className="absolute inset-x-4 top-4 h-px bg-white/10" />
          <div className="absolute inset-y-4 left-4 w-px bg-white/6" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.12),transparent_42%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/8" />
        </>
      )}
      <div
        className={`relative h-full w-full ${isProduct ? "text-white/88" : "text-white/75"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ProductMockup({
  name,
  className = "",
  variant = "default",
}: {
  name: MockupName;
  className?: string;
  variant?: "default" | "product";
}) {
  const shared =
    variant === "product" ? "h-full w-full text-white/90" : "h-full w-full text-white/60";
  const productStroke = variant === "product" ? "0.62" : "0.8";
  const productSoftStroke = variant === "product" ? "0.5" : "0.72";

  switch (name) {
    case "module":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productStroke}>
            <path d="M11 44V20l21-10 21 10v24" />
            <path d="M11 44h42" />
            <path d="M18 44V28h12v16" />
            <path d="M36 28h10v9H36z" />
            <path d="M20 18l12 6 12-6" />
            <path d="M32 10v14" />
            <path d="M11 20l21 11 21-11" />
            <path d="M22 31h8" />
            <path d="M36 32h10" />
          </SvgFrame>
        </MockupShell>
      );
    case "beam":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productSoftStroke}>
            <path d="M10 36h44" />
            <path d="M14 28h36" />
            <path d="M18 20h28" />
            <path d="M16 44l-4 6" />
            <path d="M48 44l4 6" />
            <path d="M18 20l8 16" />
            <path d="M46 20l-8 16" />
            <path d="M26 20l6 8 6-8" />
            <path d="M22 28l10 8 10-8" />
            <path d="M13 48h38" />
          </SvgFrame>
        </MockupShell>
      );
    case "truss":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productSoftStroke}>
            <path d="M8 44h48" />
            <path d="M10 44l22-24 22 24" />
            <path d="M10 44l8-10 8 10 6-16 6 16 8-10 8 10" />
            <path d="M20 34h24" />
            <path d="M32 22v22" />
            <path d="M15 39l5-4" />
            <path d="M49 39l-5-4" />
            <path d="M13 48h38" />
          </SvgFrame>
        </MockupShell>
      );
    case "frame":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productSoftStroke}>
            <path d="M12 46h40" />
            <path d="M16 18h32v28H16z" />
            <path d="M22 18v28" />
            <path d="M30 18v28" />
            <path d="M38 18v28" />
            <path d="M16 26h32" />
            <path d="M16 36h14" />
            <path d="M34 36h14" />
            <path d="M22 18l8 8 8-8" />
          </SvgFrame>
        </MockupShell>
      );
    case "sanitary":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productSoftStroke}>
            <rect x="12" y="16" width="40" height="28" rx="2" />
            <path d="M18 22h10v16H18z" />
            <path d="M34 22h12" />
            <path d="M34 30h12" />
            <circle cx="42" cy="39" r="2.5" />
            <path d="M20 22v-4" />
            <path d="M44 22v-4" />
            <path d="M18 46h28" />
            <path d="M16 30h12" />
            <path d="M30 44V16" />
          </SvgFrame>
        </MockupShell>
      );
    case "facade":
      return (
        <MockupShell className={className} variant={variant}>
          <SvgFrame className={shared} strokeWidth={productSoftStroke}>
            <path d="M10 46h44" />
            <path d="M16 46V18l16-8 16 8v28" />
            <path d="M16 18l16 16 16-16" />
            <path d="M24 46V28" />
            <path d="M40 46V28" />
            <path d="M32 10v36" />
            <path d="M20 30l12-12 12 12" />
          </SvgFrame>
        </MockupShell>
      );
    case "residential":
      return (
        <MockupShell className={className}>
          <SvgFrame className={shared} strokeWidth="0.78">
            <path d="M10 46h44" />
            <path d="M14 46V24l18-12 18 12v22" />
            <path d="M22 46V32h8v14" />
            <path d="M36 32h8v8h-8z" />
            <path d="M20 24h24" />
          </SvgFrame>
        </MockupShell>
      );
    case "commercial":
      return (
        <MockupShell className={className}>
          <SvgFrame className={shared} strokeWidth="0.78">
            <path d="M12 46V18h40v28" />
            <path d="M12 46h40" />
            <path d="M20 26h8" />
            <path d="M36 26h8" />
            <path d="M20 34h8" />
            <path d="M36 34h8" />
            <path d="M28 46V38h8v8" />
          </SvgFrame>
        </MockupShell>
      );
    case "social":
      return (
        <MockupShell className={className}>
          <SvgFrame className={shared} strokeWidth="0.8">
            <path d="M12 46V24l20-12 20 12v22" />
            <path d="M22 20v-6h20v6" />
            <path d="M28 46V34h8v12" />
            <path d="M40 46V34h8v12" />
          </SvgFrame>
        </MockupShell>
      );
    default:
      return null;
  }
}
