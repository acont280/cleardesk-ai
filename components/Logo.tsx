import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ClearDesk AI — Home"
      className={`group inline-flex items-center ${className}`}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={160}
        height={87}
        className="h-14 w-auto"
        priority
      />
      <span className="-ml-7 font-display text-lg font-semibold tracking-tight text-white">
        ClearDesk <span className="text-brand-500">AI</span>
      </span>
    </Link>
  );
}
