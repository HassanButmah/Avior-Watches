import type { SVGProps } from 'react';

function Icon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </Icon>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Icon>
  );
}

export function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </Icon>
  );
}

export function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5H7L3 21l1.5-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M9 10.5c.3 1.4 1.7 3.2 3.2 4.4 1.6 1.2 3.4 2 4.7 2.2" />
    </Icon>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
    </Icon>
  );
}

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </Icon>
  );
}

export function CreditCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6 14h4" />
    </Icon>
  );
}

export function TruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 8h11v8H3z" />
      <path d="M14 10h3l3 3v3h-6z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </Icon>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  );
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5v5" />
      <path d="M12 7.5h.01" />
    </Icon>
  );
}

export function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} className={`animate-spin ${props.className ?? ''}`}>
      <path d="M21 12a9 9 0 1 1-3.2-6.9" />
    </Icon>
  );
}

export function VisaBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 20" fill="none" {...props}>
      <rect width="48" height="20" rx="6" fill="#1A1F71" />
      <path d="M10 5l-3 10h3l3-10h-3Zm5 0h-3l2 10h3l2-6 2 6h3l-4-10h-3l-2.3 6.2L15 5Zm16 0c-1.5 0-2.8.8-3.3 2.1l-1.9 4.4c-.6 1.4.2 3.5 2.7 3.5h2.8l.5-1.8h-2.3c-.8 0-1.1-.7-.8-1.4l.2-.4h3.4l.6-1.7h-3.4l.5-1.2c.2-.5.8-.8 1.4-.8h2.5l.5-1.7H31Z" fill="#fff" />
    </svg>
  );
}

export function MastercardBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 20" fill="none" {...props}>
      <rect width="48" height="20" rx="6" fill="#111827" />
      <circle cx="20" cy="10" r="5" fill="#EB001B" />
      <circle cx="28" cy="10" r="5" fill="#F79E1B" />
      <path d="M24 6.2a5 5 0 0 1 0 7.6 5 5 0 0 1 0-7.6Z" fill="#FF5F00" />
      <text x="4" y="17" fontSize="4.5" fontWeight="700" fill="#fff">MC</text>
    </svg>
  );
}
