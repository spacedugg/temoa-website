import Image from "next/image";

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-[#ff8a00]" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function ListingMock({
  image,
  title,
  price,
  reviews,
  className = "",
}: {
  image: string;
  title: string;
  price: string;
  reviews: string;
  className?: string;
}) {
  return (
    <div
      className={`w-[260px] rounded-2xl bg-white p-4 ring-1 ring-[#e3e9ee] sm:w-[300px] ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f5f7f9]">
        <Image src={image} alt={`Amazon-Listing ${title}`} fill sizes="300px" className="object-cover" />
        <span className="absolute left-2 top-2 rounded-md bg-[#023047] px-2 py-0.5 text-[10px] font-bold text-white">
          Bestseller
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-snug text-[#023047]">{title}</p>
      <div className="mt-1.5 flex items-center gap-1.5">
        <Stars />
        <span className="text-[11px] text-[#41586a]">{reviews}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-lg font-bold text-[#023047]">{price}</span>
        <span className="text-[11px] text-[#41586a]">inkl. MwSt.</span>
      </div>
      <div className="mt-3 rounded-full bg-[#ff8a00] py-2 text-center text-[12px] font-bold text-white">
        In den Einkaufswagen
      </div>
    </div>
  );
}
