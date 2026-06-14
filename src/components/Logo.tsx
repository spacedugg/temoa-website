import Image from "next/image";
import clsx from "clsx";

/** Echtes TEMOA-Logo. variant="white" für dunkle Hintergründe. */
export function Logo({
  className,
  variant = "default",
  priority = false,
}: {
  className?: string;
  variant?: "default" | "white";
  priority?: boolean;
}) {
  const src = variant === "white" ? "/logo/logo-full-white.svg" : "/logo/logo-full.svg";
  return (
    <Image
      src={src}
      alt="TEMOA"
      width={140}
      height={35}
      priority={priority}
      className={clsx("h-8 w-auto", className)}
    />
  );
}

/** Nur das Icon (4 Formen) – z.B. als kompaktes Badge. */
export function LogoIcon({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <Image src="/logo/logo-icon.svg" alt="TEMOA" width={size} height={size} className={className} />
  );
}
