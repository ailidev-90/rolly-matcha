import Image from "next/image";
import { BUSINESS_DOMAIN_SLUG } from "../../config/rolly";

export function PoweredBy() {
  return (
    <div className="mt-6 flex justify-center pb-4 text-xs text-[#6A826A]">
      <span className="inline-flex items-center gap-2">
        <Image
          alt="Rolly Logo"
          src={`https://${BUSINESS_DOMAIN_SLUG}.withrolly.com/rolly-logo.png`}
          width={30}
          height={30}
          className="inline-block align-middle"
        />
        <span>
          Powered by{" "}
          <a
            href="https://rolly.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rolly
          </a>
        </span>
      </span>
    </div>
  );
}

